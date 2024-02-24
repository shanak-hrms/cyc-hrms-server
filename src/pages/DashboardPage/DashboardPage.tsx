import React, { Fragment, useEffect, useState } from 'react'
import styles from './DashboardPage.module.scss'
import Dashboard from '../../components/dashboard/Dashboard'
import CustomLoader from '../../components/CustomLoader/CustomLoader'
import axios from 'axios'
import { Grid } from '@mui/material'
import { PiNoteBold, } from "react-icons/pi";


const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [openLead, setOpenLead] = useState()
    const [closeLead, setCloseLead] = useState()
    const [hotLead, sethotLead] = useState()
    const [coldLead, setColdLead] = useState()
    const [warmLead, setWarmLead] = useState()
    const [lostLead, setLostLead] = useState()
    const [leaveData, setleaveData] = useState()
    const [attenData, setAttenData] = useState()
    const [claimData, setClaimData] = useState()
    const [userRole, setUserRole] = useState()

    const dataOne = [
        {
            "id": 1,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Leave Request",
            "number": leaveData,
            "color": "#3EC9D6"
        },
        {
            "id": 2,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Attendance Request",
            "number": attenData,
            "color": "#5F9EA0"
        },
        {
            "id": 3,
            "icon": <PiNoteBold fontSize={25} />,
            "heading": "Claim Request",
            "number": claimData,
            "color": "#FF5733"
        },
    ]
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

    };
    const getLeaveData = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/pending/request/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.pendingLeave
            const dataLength = data.length;
            setleaveData(dataLength)
        }
        catch (err) {
            console.log(err)
        }

    }
    const getPendingAttenData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserSting);
        const { email } = loginedUser;

        try {
            setLoading(true);
            const result = await axios.get("https://hrms-server-ygpa.onrender.com/api/v1/attendance/get");
            const data = result.data.attendanceData;
            const filterData = data.filter((item: any) => item.regularizationRequest?.status === "Pending");
            const dataLength = filterData.length;
            setAttenData(dataLength);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        } finally {
            setLoading(false);
        }
    };
    const getCliamData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/claim/all/pending/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.claimData;
            const dataLength = data.length;
            setClaimData(dataLength);
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        const role: any = localStorage.getItem("userRole")
        setUserRole(role)
        getLeadData();
        getLeaveData();
        getPendingAttenData();
        getCliamData();

    }, [])
    return (
        <Grid className={styles.dashboard}>
            {loading ?
                <CustomLoader />
                :
                <>{userRole === "HR" || "MANAGER" ?
                    <Dashboard data={dataOne} />
                    :
                    <Dashboard data={data} />}</>
            }
        </Grid>
    )
}

export default DashboardPage