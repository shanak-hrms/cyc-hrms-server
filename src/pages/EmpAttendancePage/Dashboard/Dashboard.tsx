import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonCard from '../../../components/common/CommonCard/CommonCard'
import { MdAccountBalanceWallet } from "react-icons/md";
import { AiOutlineTeam } from 'react-icons/ai';
import { RiHotspotLine } from 'react-icons/ri';
import { TbTicket } from 'react-icons/tb';
import axios from 'axios';
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import MeetingScheduleTable from '../../../components/tableData/meetingScheduleTable/MeetingScheduleTable';
import tabelData from '../../../data/mettingSchedule.json'
import Calender from '../../../components/dashboard/calender/Calender';
import MeetingSchedule from '../../../components/dashboard/meetingSchedule/MeetingSchedule';
import ServiceCard from '../../../components/dashboard/ServiceCard/ServiceCard';

const Dashboard = () => {
  const [openLead, setOpenLead] = useState()
  const [closeLead, setCloseLead] = useState()
  const [hotLead, sethotLead] = useState()
  const [coldLead, setColdLead] = useState()

  const data = [
    {
      "id": 2,
      "icon": <TbTicket fontSize={25} />,
      "heading": "Open Lead",
      "number": openLead,
      "color": "#3EC9D6"
    },
    {
      "id": 3,
      "icon": <MdAccountBalanceWallet fontSize={25} />,
      "heading": "Close Lead",
      "number": closeLead,
      "color": "#6FD943"
    },
    {
      "id": 2,
      "icon": <TbTicket fontSize={25} />,
      "heading": "Hot Lead",
      "number": hotLead,
      "color": "#3EC9D6"
    },
    {
      "id": 3,
      "icon": <MdAccountBalanceWallet fontSize={25} />,
      "heading": "Cold Lead",
      "number": coldLead,
      "color": "#6FD943"
    }
  ]
  const getData = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/lead/all/leads`)
      console.log(response.data.leadData, "response")
      const data = response.data.leadData;
      const openLeadData = data.filter((item: any) => item.leadStatus === "Open")
      const openLeadNo = openLeadData.length;
      setOpenLead(openLeadNo)
      const closeLeadData = data.filter((item: any) => item.leadStatus === "Close")
      const closeLeadNo = closeLeadData.length;
      setCloseLead(closeLeadNo)
      const hotLeadData = data.filter((item: any) => item.leadStatus === "Hot")
      const hotLeadNo = hotLeadData.length;
      sethotLead(hotLeadNo)
      const coldLeadData = data.filter((item: any) => item.leadStatus === "Cold")
      const coldLeadNo = coldLeadData.length;
      setColdLead(coldLeadNo)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <Grid className={styles.dashboardContainer}>
      <Grid className={styles.cardContainer}>
        {data.map((item) => {
          return (
            <Grid key={item.id} className={styles.card}>
              <ServiceCard heading={item.heading} subHeading={item.number} icon={item.icon} />
            </Grid>
          )
        })}
      </Grid>
      <Grid container className={styles.dashboard}>
        <Grid item sm={6}>
        </Grid>
        <Grid item sm={6}>
          <Calender />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dashboard;