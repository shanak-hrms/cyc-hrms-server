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

export interface IOverview {
    open: any;
    menu: any;
    handleSidebarMemu: any;
    handleLogout: () => void;
    handleClick: any;
    handleResponsiveMenu?: any
}
const Overview = ({ open, menu, handleSidebarMemu, handleLogout, handleClick, handleResponsiveMenu }: IOverview) => {
    const [attendanceData, setAttendanceData] = useState<any>()

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

    const handleClockIn = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserStr)
        const { token } = loginedUser;
        try {
            const desiredDate = new Date();
            const formattedDate = desiredDate.toISOString().slice(0, -5) + 'Z';
            console.log(formattedDate);

            const response = await axios.post(
                'https://hrms-server-ygpa.onrender.com/api/v1/attendance/checkIn',
                { date: formattedDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.status === 201) {
                await fetchData();
                toast.success(("Clock in successfully"))
                // await setPhotoModal(false);
            }

        } catch (error) {
            console.error('Error occurred:', error);
        }

    };
    const handleClockOut = async (idx: any) => {
        const loginedUserStr: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserStr)
        const { token } = loginedUser;
        if (attendanceData && attendanceData.length > 0) {
            const matchId: any = attendanceData.filter((item: any) => item._id === idx);
            const checkOut = matchId[0].date;
            try {
                const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/checkOut/${idx}`,
                    { date: checkOut },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if (response.status === 200) {
                    await fetchData();
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("attendanceData is undefined or empty");
        }
    };
    useEffect(() => {

        fetchData();

    }, []);
    return (
        <Grid className={styles.overviewContainer}>
            <Grid container className={styles.overview}>
                <Grid className={styles.overviewSidebar}>
                    <Sidebar
                        menuData={menuData}
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
                    <RoutesPage handleClockIn={handleClockIn} handleClockOut={handleClockOut} />
                </Grid>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default Overview;