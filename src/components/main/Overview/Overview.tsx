import React, { useEffect, useState } from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import RoutesPage from '../RoutesPage/RoutesPage'
import Sidebar from '../../sidebar/Sidebar'
import { menuData } from '../../sidebar/menuData'
import NewHeading from '../../NewHeading/NewHeading'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbCalendarTime } from "react-icons/tb";
import { MdOutlineManageHistory, MdOutlineEventNote } from "react-icons/md";
import { PiNote, PiNotePencilFill } from "react-icons/pi";

export interface IOverview {
    open: any;
    menu: any;
    handleSidebarMemu: any;
    handleLogout: () => void;
    handleClick: any;
    handleResponsiveMenu?: any
}
const Overview = ({ open, menu, handleSidebarMemu, handleLogout, handleClick, handleResponsiveMenu }: IOverview) => {
    const [attendanceData, setAttendanceData] = useState<any>();
    const [userRole, seUserRole] = useState()
    console.log(userRole, "userRole//")
    const menuData2 = [
        {
            "id": 1,
            "icon": <AiOutlineHome />,
            "title": "Dashboard",
            "link": "/"
        },
        {
            "id": 2,
            "icon": <AiOutlineTeam />,
            "title": "Staff",
            "link": "/staff"
        },
        {
            "id": 4,
            "icon": <TbCalendarTime />,
            "title": "Attandance",
            "link": "/attandance",
        },
        {
            "id": 5,
            "icon": <PiNote />,
            "title": "Manage Leave",
            "link": "/manage-leave",
        },
        {
            "id": 6,
            "icon": <PiNotePencilFill />,
            "title": "Request",
            "link": "/request",
        },
        {
            "id": 7,
            "icon": <MdOutlineManageHistory />,
            "title": "Lead Management",
            "link": "/lead-management",
        },
        {
            "id": 8,
            "icon": <MdOutlineEventNote />,
            "title": userRole === "HR" ? "Payroll Management" : "Pay Slip",
            "link": userRole === "HR" ? "/pay-slip" : "/manager-pay-slip",
        }
    ]
    const fetchData = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserStr)
        const { email } = loginedUser

        try {
            const result = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/attendance/get');
            const data = result.data.attendanceData;
            const filterData = data?.filter((item: any) => item.employeeId?.email === email)
            setAttendanceData(filterData);
        } catch (error) {
            console.error("Error during GET request:", error);
        }
    };
    const getUserData = async () => {
        try {
            const loginedUserStr: any = localStorage.getItem("loginedUser")
            const loginedUser = JSON.parse(loginedUserStr)
            const { role } = loginedUser;
            seUserRole(role)
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getUserData();
        fetchData();

    }, []);
    return (
        <Grid className={styles.overviewContainer}>
            <Grid container className={styles.overview}>
                <Grid className={styles.overviewSidebar}>
                    <Sidebar
                        menuData={menuData2}
                        handleLogout={handleLogout}
                    />
                </Grid>
                <Grid className={styles.overviewRoutesPage}>
                    <NewHeading
                        open={open}
                        handleClickLogout={handleClick}
                        handleLogout={handleLogout}
                        menu={menu}
                        menuData={menuData}
                        handleSidebarMemu={handleSidebarMemu}
                        handleResponsiveMenu={handleResponsiveMenu} />
                    <RoutesPage />
                </Grid>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default Overview;