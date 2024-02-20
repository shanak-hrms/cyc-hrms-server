import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material'
import Calender from './calender/Calender';
import ServiceCard from './ServiceCard/ServiceCard';
import CommonButton from '../common/CommonButton/CommonButton';
import axios from 'axios';

export interface IDashboard {
    data: any;
    dashAtten?: any;
    handleClockIn: any;
    handleClockOut: any;
    attendanceData?: any;
}
const Dashboard = ({ data, dashAtten, handleClockIn, handleClockOut, attendanceData }: IDashboard) => {
    const [holiday, setHolidays] = useState<any>()
    const formateDate = (idx: any) => {
        const date = new Date(idx)
        return date.toLocaleDateString()
    }
    const formateTime = (idx: any) => {
        const date = new Date(idx)
        return date.toLocaleTimeString()
    }
    const getMonthlyHolidays = async () => {
        const date = new Date();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/holiday/get/all-holidays-of-the-month?year=${getYear}&month=${getMonth}`);
            console.log(response, "response")
            setHolidays(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const getYearlyHolidays = async () => {
        const date = new Date();
        const getYear = date.getFullYear();
        try {
            const response = await axios.get(`https:/hrms-server-ygpa.onrender.com/api/v1/holiday/get/all-holidays-of-the-year?year=${getYear}`);
            setHolidays(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Grid className={styles.dashboardContainer}>
            <Grid container spacing={1} className={styles.dashboard}>
                {data && data.map((item: any) => {
                    return (
                        <Grid item sm={4}>
                            <ServiceCard
                                heading={item.heading}
                                subHeading={item.number}
                                icon={item.icon}
                                color={item.color}
                                bgColor={item.color}
                            />
                        </Grid>
                    )
                })}</Grid>
            <Grid container className={styles.dashboardBody}>
                <Grid item sm={6} >
                    <Box>
                        <CommonButton name={"Clock In"} onClick={handleClockIn} />
                    </Box>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#00ADB2" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Date</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock In</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock Out</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendanceData && attendanceData.slice(-2).map((item: any) => {
                                        return (
                                            <TableRow key={item._id}>
                                                <TableCell>{item.employeeId?.name}</TableCell>
                                                <TableCell>{formateDate(item?.date)}</TableCell>
                                                <TableCell>{formateTime(item?.clockIn)}</TableCell>
                                                <TableCell>
                                                    {item.clockOut === null
                                                        ?
                                                        <CommonButton name={"Clock Out"} onClick={() => handleClockOut(item._id)} />
                                                        :
                                                        <>{formateTime(item?.clockOut)}</>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Box>
                    <Box>
                        <Typography variant='h5' fontSize={16} fontWeight={500}>Manager Name: </Typography>
                        <Typography variant='h5' fontSize={16} fontWeight={500}>Sherry Lin </Typography>
                    </Box>
                    <Box>
                        <CommonButton name={"Monthly Holidays"} onClick={getMonthlyHolidays} />
                        <CommonButton name={"Yearly Holidays"} onClick={getYearlyHolidays} />
                    </Box>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#00ADB2" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Date</TableCell>
                                        {/* <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Month</TableCell> */}
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Year</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    {holiday && holiday.map((item: any) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{formateDate(item.date)}</TableCell>
                                                {/* <TableCell>{item.month}</TableCell> */}
                                                <TableCell>{item.year}</TableCell>
                                                <TableCell>{item.description}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Box>

                </Grid>
                <Grid item sm={6} >
                    <Calender />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard;