import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import CommonCard from '../common/CommonCard/CommonCard'
import { AiOutlineTeam } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import MeetingSchedule from './meetingSchedule/MeetingSchedule';
import Calender from './calender/Calender';
import AnnouncementModal from '../modal/AnnouncementModal/AnnouncementModal';
import ServiceCard from './ServiceCard/ServiceCard';
import axios from 'axios';
import { PiNoteBold,PiNoteDuotone, PiNoteFill,PiNote   } from "react-icons/pi";



export interface IDashboard {
    handleCreate: any;
    handleEdit: any;
    announcementData: any;
    inputData: any;
    handleChange: any;
    handleEditModal: any;
    handleClose: any;
    editModal: boolean;
    handleModal: any;
    open: boolean;
    handleDelete: any;
}
const Dashboard = () => {
    const [openLead, setOpenLead] = useState()
    const [closeLead, setCloseLead] = useState()
    const [hotLead, sethotLead] = useState()
    const [coldLead, setColdLead] = useState()

    const data = [
        {
            "id": 2,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Open Lead",
            "number": openLead,
            "color": "#3EC9D6"
        },
        {
            "id": 3,
            "icon": <PiNoteDuotone  fontSize={25} />,
            "heading": "Close Lead",
            "number": closeLead,
            "color": "#6FD943"
        },
        {
            "id": 2,
            "icon": <PiNoteFill fontSize={25} />,
            "heading": "Hot Lead",
            "number": hotLead,
            "color": "#3EC9D6"
        },
        {
            "id": 3,
            "icon": <PiNote  fontSize={25} />,
            "heading": "Cold Lead",
            "number": coldLead,
            "color": "#6FD943"
        }
    ]
    const getLeadData = async () => {
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
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getLeadData()

    }, [])
    return (
        <Grid className={styles.dashboardContainer}>
            <Grid className={styles.dashboard}>
                {data && data.map((item: any) => {
                    return (
                        <Grid item sm={3}>
                            <ServiceCard heading={item.heading} subHeading={item.number} icon={item.icon} />
                        </Grid>
                    )
                })}</Grid>
            <Grid container>
                <Grid item sm={6} >

                </Grid>
                <Grid item sm={6} >
                    <Calender />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard;