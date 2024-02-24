import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Grid } from '@mui/material'
import axios from 'axios';
import Dashboard from '../../../components/dashboard/Dashboard';
import { PiNoteBold, } from "react-icons/pi";

const DashboardPage = () => {
  const [medicalLeave, setMedicalLeave] = useState()
  const [privilageLeave, setPrivilegeLeave] = useState()
  const [lwpLeave, setLwpLeave] = useState()

  const data = [
    {
      "id": 1,
      "icon": <PiNoteBold fontSize={25} />,
      "heading": "Medical Leave",
      "number": medicalLeave,
      "color": "#3EC9D6"
    },
    {
      "id": 2,
      "icon": <PiNoteBold fontSize={25} />,
      "heading": "Privilage Leave",
      "number": privilageLeave,
      "color": "#5F9EA0"
    },
    {
      "id": 3,
      "icon": <PiNoteBold fontSize={25} />,
      "heading": "LWP Leave",
      "number": lwpLeave,
      "color": "#FF5733"
    },
  ]

  const getUserData = async () => {
    const loginedUserString: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserString);
    const { email } = loginedUser;
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/user/get`)
      console.log(response.data.userData, "response..")
      const data = response.data.userData;
      const filterData = data.filter((item: any) => item.email === email);
      setMedicalLeave(filterData[0]?.medicalLeaveBalance);
      setPrivilegeLeave(filterData[0]?.privilegeLeaveBalance);
      setLwpLeave(filterData[0]?.totalLeaveAccrued)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getUserData();
  }, [])

  return (
    <Grid className={styles.dashboardContainer}>
      <Dashboard data={data} />
    </Grid>
  )
}

export default DashboardPage;