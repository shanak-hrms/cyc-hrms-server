import React, { Fragment, useState, useEffect } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'
import EmpAttendancePage from './pages/EmpAttendancePage/EmpAttendancePage';
import { EmployeeDataContextProvider } from './ContextAPI/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigation = useNavigate()
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('userToken') || '');
  const [user, setUser] = useState<any>(localStorage.getItem('userRole') || '');
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const handleLogin = async () => {
    const adminEmail = "admin@gmail.com";
    const adminPass = "admin@123";
    const managerEmail = "manager@gmail.com";
    const managerPass = "manager@123";
    if (adminEmail === inputData.email && adminPass === inputData.password) {
      console.log("Found Admin");
      await localStorage.setItem("userToken", ("admin@token"));
      await localStorage.setItem("userRole", ("ADMIN"));
      await localStorage.setItem("userName", ("Admin"));
      setIsLogin('admin@token');
      setUser("ADMIN");
    } else if (managerEmail === inputData.email && managerPass === inputData.password) {
      console.log("Found Manager");
      await localStorage.setItem("userToken", ("manager@token"));
      await localStorage.setItem("userRole", ("MANAGER"));
      await localStorage.setItem("userName", ("Manager"));
      setIsLogin('manager@token');
      setUser("MANAGER");
    }
    else {
      console.log("Found Employee");
      const response = await axios.post('https://hrms-server-ygpa.onrender.com/user/login', inputData);
      const loginedUser = response.data;
      const newToken = response.data.token;
      const newRole = response.data.role;
      const newEmail = response.data.email;
      const newName = response.data.username;

      setIsLogin(newToken);
      setUser(newRole);
      localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
      localStorage.setItem('userToken', newToken);
      localStorage.setItem('userToken', newToken);
      localStorage.setItem('userRole', newRole);
      localStorage.setItem('email', newEmail);
      localStorage.setItem('userName', newName);
      console.log(response, 'response..');
    }
    try {
      console.log("Found Employee");
      // const response = await axios.post('https://hrms-server-ygpa.onrender.com/employee/login', inputData);
      // const loginedUser = response.data;
      // console.log(loginedUser.name, "loginedUser..")
      // const newToken = response.data.token;
      // const newRole = response.data.role;
      // const newEmail = response.data.email;
      // const newName = loginedUser.name;

      // setIsLogin(newToken);
      // setUser(newRole);
      // localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
      // localStorage.setItem('userToken', newToken);
      // localStorage.setItem('userToken', newToken);
      // localStorage.setItem('userRole', newRole);
      // localStorage.setItem('email', newEmail);
      // localStorage.setItem('userName', newName);
      // console.log(response, 'response..');

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // window.addEventListener('beforeunload', () => {
  //   localStorage.removeItem('userToken');
  // });

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigation('/')
    setIsLogin('');
  };

  return (
    <Fragment>
      <EmployeeDataContextProvider>
        {IsLogin ?
          <>
            {(user === "ADMIN" || user === "MANAGER" || user === "HR") && <Overview handleLogout={handleLogout} />}

            {user === "EMPLOYEE" && <EmpAttendancePage handleLogout={handleLogout} />}
          </>
          :
          <Login inputData={inputData} handleChange={handleChange} handleLogin={handleLogin} />
        }
      </EmployeeDataContextProvider>
      <ToastContainer />
    </Fragment>
  )
}

export default App