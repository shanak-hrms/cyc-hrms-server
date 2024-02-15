import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Grid } from '@mui/material'
import axios from 'axios';
import Dashboard from '../../../components/dashboard/Dashboard';
import { PiNoteBold, } from "react-icons/pi";

export interface IDashboardPage {
  handleClockIn: any;
  handleClockOut: any;
}
const DashboardPage = ({ handleClockIn, handleClockOut }: IDashboardPage) => {
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
      // const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/leave/get`)
      // console.log(response.data.leadData, "response")
      // const data = response.data.leadData;
      // const openLeadData = data.filter((item: any) => item.leadStatus === "Open")
      // const openLeadNo = openLeadData.length;
      // setOpenLead(openLeadNo)
      // const closeLeadData = data.filter((item: any) => item.leadStatus === "Close")
      // const closeLeadNo = closeLeadData.length;
      // setCloseLead(closeLeadNo)
      // const hotLeadData = data.filter((item: any) => item.leadStatus === "Hot")
      // const hotLeadNo = hotLeadData.length;
      // sethotLead(hotLeadNo)
      // const coldLeadData = data.filter((item: any) => item.leadStatus === "Cold")
      // const coldLeadNo = coldLeadData.length;
      // setColdLead(coldLeadNo)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <Grid className={styles.dashboardContainer}>
      <Dashboard data={data} handleClockIn={handleClockIn} handleClockOut={handleClockOut} />
    </Grid>
  )
}

export default DashboardPage;