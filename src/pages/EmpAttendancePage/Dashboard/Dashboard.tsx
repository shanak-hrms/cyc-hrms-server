import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Grid } from '@mui/material'
import axios from 'axios';
import Dashboard from '../../../components/dashboard/Dashboard';
import { PiNoteBold, } from "react-icons/pi";

export interface IDashboardPage {
  handleClockIn: any;
  handleClockOut: any;
  attendanceData?: any
}
const DashboardPage = ({ handleClockIn, handleClockOut, attendanceData }: IDashboardPage) => {
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

  const getData = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/user/get`);
      console.log(response,"response")

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <Grid className={styles.dashboardContainer}>
      <Dashboard data={data} handleClockIn={handleClockIn} attendanceData={attendanceData} handleClockOut={handleClockOut} />
    </Grid>
  )
}

export default DashboardPage;