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
  const [anouncementData, setAnouncementData] = useState<any>()

  const data = [
    {
      "id": 1,
      "icon": <AiOutlineTeam fontSize={25} />,
      "heading": "Leave",
      "number": 20,
      "color": "#58024B"
    },
    {
      "id": 2,
      "icon": <TbTicket fontSize={25} />,
      "heading": "Privilege",
      "number": 12,
      "color": "#3EC9D6"
    },
    {
      "id": 3,
      "icon": <MdAccountBalanceWallet fontSize={25} />,
      "heading": "LWP",
      "number": 8,
      "color": "#6FD943"
    }
  ]
  const getData = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/anouncement`)
      const data = response.data.anouncementData;
      setAnouncementData(data)
      console.log(data, "data...")
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