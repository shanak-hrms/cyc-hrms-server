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

    const data = [
        {
            "id": 2,
            "icon": <TbTicket fontSize={25} />,
            "heading": "Open Lead",
            "number": 12,
            "color": "#3EC9D6"
        },
        {
            "id": 3,
            "icon": <MdAccountBalanceWallet fontSize={25} />,
            "heading": "Close Lead",
            "number": 8,
            "color": "#6FD943"
        },
        {
            "id": 2,
            "icon": <TbTicket fontSize={25} />,
            "heading": "Hot Lead",
            "number": 12,
            "color": "#3EC9D6"
        },
        {
            "id": 3,
            "icon": <MdAccountBalanceWallet fontSize={25} />,
            "heading": "Cold Lead",
            "number": 8,
            "color": "#6FD943"
        }
    ]
    const getLeadData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/lead/all/leads`)
            console.log(response.data.leadData, "response")

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