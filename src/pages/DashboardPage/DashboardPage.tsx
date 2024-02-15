import React, { Fragment, useEffect, useState } from 'react'
import styles from './DashboardPage.module.scss'
import Dashboard from '../../components/dashboard/Dashboard'
import CustomLoader from '../../components/CustomLoader/CustomLoader'
import axios from 'axios'
import { Grid } from '@mui/material'
import { PiNoteBold, } from "react-icons/pi";

export interface IDashboardPage {
    handleClockIn: any;
    handleClockOut: any;
}
const DashboardPage = ({ handleClockIn, handleClockOut }: IDashboardPage) => {
    const [loading, setLoading] = useState(false)
    const [openLead, setOpenLead] = useState()
    const [closeLead, setCloseLead] = useState()
    const [hotLead, sethotLead] = useState()
    const [coldLead, setColdLead] = useState()
    const [warmLead, setWarmLead] = useState()
    const [lostLead, setLostLead] = useState()
    const data = [
        {
            "id": 1,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Open Lead",
            "number": openLead,
            "color": "#3EC9D6"
        },
        {
            "id": 2,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Closed Lead",
            "number": closeLead,
            "color": "#5F9EA0"
        },
        {
            "id": 3,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Hot Lead",
            "number": hotLead,
            "color": "#FF5733"
        },
        {
            "id": 4,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Cold Lead",
            "number": coldLead,
            "color": "#6FD943"
        },
        {
            "id": 5,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Warm Lead",
            "number": warmLead,
            "color": "#DFFF00"
        },
        {
            "id": 6,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Lost Lead",
            "number": lostLead,
            "color": "#AFE1AF"
        }
    ]
    const getLeadData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/lead/all/leads`)

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
            const warmLeadData = data.filter((item: any) => item.leadStatus === "Warm")
            const warmLeadNo = warmLeadData.length;
            setWarmLead(warmLeadNo)
            const lostLeadData = data.filter((item: any) => item.leadStatus === "Lost")
            const lostLeadNo = lostLeadData.length;
            setLostLead(lostLeadNo)
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getLeadData()

    }, [])
    return (
        <Grid className={styles.dashboard}>
            {loading ?
                <CustomLoader />
                :
                <Dashboard data={data} handleClockIn={handleClockIn} handleClockOut={handleClockOut} />
            }
        </Grid>
    )
}

export default DashboardPage