import React, { Fragment, useState, useEffect } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'
import EmpAttendancePage from './pages/EmpAttendancePage/EmpAttendancePage';
import { EmployeeDataContextProvider } from './ContextAPI/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Typography } from '@mui/material';
import AgreedToAgreement from './components/AgreedToAgreement/AgreedToAgreement';

const App = () => {
  const navigation = useNavigate()
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [agreeModal, setAgreeModal] = useState(false)
  const handleResponsiveMenu = () => setMenu(false);
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('userToken') || '');
  const [user, setUser] = useState<any>(localStorage.getItem('userRole') || '');
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState<any>();
  const [agreeAgreement, setAgreeAgreement] = useState(false)
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const getData = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/user/get`)
      const data = response.data.userData;
      setUserData(data);
      console.log(data, "data")

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
        const loginedUser = response.data;
        const newToken = response.data.token;
        const newRole = response.data.role;
        const newEmail = response.data.email;
        const agreedToAgreement = response.data.agreedToAgreement
        // setAgreeAgreement(agreedToAgreement)

        const newData = userData.filter((item: any) => item.email === response.data.email)
        console.log(newData, "newData")
        const newName = newData[0].name;
        const newEmpId = newData[0].emp_id;

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
      catch (error) {
        console.error("An error occurred:", error);
      }
    }

  };
  // const handleClickAgreement = async () => {
  //   try {

  //     const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/userAgreement/update`);
  //     console.log(response, "response...")
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }

  // }
  // window.addEventListener('beforeunload', () => {
  //   localStorage.removeItem('userToken');
  // });
  const handleClickUSer = () => {
    setOpen(!open)
  }
  const handleSidebarMemu = () => {
    setMenu(!menu)
  }

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
      <EmployeeDataContextProvider>
        {IsLogin ?
          <>
            {(user === "ADMIN" || user === "DIRECTOR" || user === "LINE MANAGER" || user === "HR")
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
                <EmpAttendancePage
                  handleLogout={handleLogout}
                  open={open}
                  handleClickLogout={handleClickUSer}
                  menu={menu}
                  handleSidebarMemu={handleSidebarMemu}
                  handleResponsiveMenu={handleResponsiveMenu}
                />
                {/* {agreeAgreement === true ? <EmpAttendancePage
                  handleLogout={handleLogout}
                  open={open}
                  handleClickLogout={handleClickUSer}
                  menu={menu}
                  handleSidebarMemu={handleSidebarMemu}
                  handleResponsiveMenu={handleResponsiveMenu}
                /> :
                  <AgreedToAgreement handleClick={handleClickAgreement} />
                } */}
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
      </EmployeeDataContextProvider>
      <ToastContainer />

    </Fragment>
  )
}

export default App