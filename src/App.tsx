import React, { Fragment, useState, useEffect } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'
import EmpAttendancePage from './pages/EmpAttendancePage/EmpAttendancePage';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgreedToAgreement from './components/AgreedToAgreement/AgreedToAgreement';

const App = () => {
  const navigation = useNavigate()
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleResponsiveMenu = () => setMenu(false);
  const handleClickUSer = () => { setOpen(!open) };
  const handleSidebarMemu = () => { setMenu(!menu) };
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('userToken') || '');
  const [user, setUser] = useState<any>(localStorage.getItem('userRole') || '');
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState<any>();
  const [agreeAgreement, setAgreeAgreement] = useState<any>(true)
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const getData = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/user/get`)
      const data = response.data.userData;
      setUserData(data);
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleLogin = async () => {
    const adminEmail = "admin@gmail.com";
    const adminPass = "admin@123";
    if (adminEmail === inputData.email && adminPass === inputData.password) {
      console.log("Found Admin");
      await localStorage.setItem("userToken", ("admin@token"));
      await localStorage.setItem("userRole", ("ADMIN"));
      await localStorage.setItem("userName", ("Admin"));
      setIsLogin('admin@token');
      setUser("ADMIN");
    } else {
      try {
        const response = await axios.post('https://hrms-server-ygpa.onrender.com/api/v1/user/login', inputData);
        console.log(response, "response")
        const loginedUser = response?.data;
        const newToken = response?.data?.token;
        const newRole = response?.data?.role;
        const newEmail = response?.data?.email;

        if (response.status === 200) {
          toast.success("Logined successfully")
          const newData = userData.filter((item: any) => item.email === response?.data?.email)
          console.log(newData, "newData")
          const newName = newData[0].name;
          const newEmpId = newData[0].emp_id;
          const agreement = newData[0].agreedToAgreement;
          setAgreeAgreement(agreement)

          setIsLogin(newToken);
          setUser(newRole);
          localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
          localStorage.setItem('userToken', newToken);
          localStorage.setItem('userToken', newToken);
          localStorage.setItem('userRole', newRole);
          localStorage.setItem('email', newEmail);
          localStorage.setItem('userName', newName);
          localStorage.setItem('empId', newEmpId);
        }
      }
      catch (error: any) {
        console.error("An error occurred:", error.response.data.msg);
        toast.error(error.response.data.msg)
      }
    }

  };
  const handleClickAgreement = async () => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const { token } = loginedUser;
    console.log(agreeAgreement, "agreeAgreement")
    try {
      const response = await axios.patch('https://hrms-server-ygpa.onrender.com/api/v1/user/accept/user-agreement', {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        });
      console.log(response, "response...")
      if (response.status === 200) {
        window.location.reload();
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  console.log(agreeAgreement, "agreeAgreement")

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigation('/')
    setIsLogin('');
  };
  useEffect(() => {
    getData();

  }, [])

  return (
    <Fragment>
      {IsLogin ?
        <>
          {(user === "ADMIN" || user === "DIRECTOR" || user === "MANAGER" || user === "HR")
            &&
            <Overview
              open={open}
              handleLogout={handleLogout}
              handleClick={handleClickUSer}
              menu={menu}
              handleSidebarMemu={handleSidebarMemu}
              handleResponsiveMenu={handleResponsiveMenu} />}

          {user === "EMPLOYEE" &&
            <>
              {agreeAgreement === true ? <EmpAttendancePage
                handleLogout={handleLogout}
                open={open}
                handleClickLogout={handleClickUSer}
                menu={menu}
                handleSidebarMemu={handleSidebarMemu}
                handleResponsiveMenu={handleResponsiveMenu}
              /> :
                <AgreedToAgreement handleClick={handleClickAgreement} />
              }
            </>
          }
        </>
        :
        <>
          <Login
            inputData={inputData}
            handleChange={handleChange}
            handleLogin={handleLogin}
          />
        </>
      }
      <ToastContainer />

    </Fragment>
  )
}

export default App