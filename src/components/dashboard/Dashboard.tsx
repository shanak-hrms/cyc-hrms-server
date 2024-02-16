import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material'
import Calender from './calender/Calender';
import ServiceCard from './ServiceCard/ServiceCard';
import CommonButton from '../common/CommonButton/CommonButton';

export interface IDashboard {
    data: any;
    handleClockIn: any;
    handleClockOut: any;
    IsCheckId?: any;
    attendanceData?: any;
}
const Dashboard = ({ data, handleClockIn, handleClockOut, IsCheckId, attendanceData }: IDashboard) => {
    const formateDate = (idx: any) => {
        const date = new Date(idx)
        return date.toLocaleDateString()
    }
    const formateTime = (idx: any) => {
        const date = new Date(idx)
        return date.toLocaleTimeString()
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
                        {IsCheckId ? <><CommonButton name={"Clock In"} onClick={handleClockIn} />
                            <CommonButton name={"Clock Out"} onClick={handleClockOut} /></>
                            :
                            <><CommonButton name={"Clocked In"} />
                            </>}
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
                                    {attendanceData && attendanceData.map((item: any) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.employeeId?.name}</TableCell>
                                                <TableCell>{formateDate(item?.date)}</TableCell>
                                                <TableCell>{formateTime(item?.clockIn)}</TableCell>
                                                <TableCell>{formateTime(item?.clockOut)}</TableCell>
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
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#00ADB2" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Holiday Name</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Holiday Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Holiday Name</TableCell>
                                        <TableCell>Holiday Date</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Holiday Name</TableCell>
                                        <TableCell>Holiday Date</TableCell>
                                    </TableRow>
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