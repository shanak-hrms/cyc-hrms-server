import React, { useEffect, useState } from 'react'
import styles from './Attendance.module.scss'
import { Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingText from '../../../components/HeadingText/HeadingText';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

export interface IAttendance {
    loading: boolean;
    attendanceData: any;
    handleCheckIn: any;
    handleClockOut: any;
    handleRequest: any;

}
const Attendance = ({ loading, attendanceData, handleCheckIn, handleClockOut, handleRequest }: IAttendance) => {

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    function formatTime(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    }

    useEffect(() => {
        // const empDataString: any = localStorage.getItem("loginedUser")
        // const empData = JSON.parse(empDataString);
        // const empEmail = empData.email;
        // setEmail(empEmail)
    }, []);

    return (
        <Grid className={styles.attendanceContainer}>
            <Grid className={styles.attendanceHeading}>
                <HeadingText
                    heading={'Attendance List'}
                />
                <Grid>
                    <CommonButton name={"Requet Approval"} onClick={handleRequest} />
                    <CommonButton name={"Clock In"} onClick={handleCheckIn} />
                </Grid>
            </Grid>
            <Grid container className={styles.attendance}>
                <TableContainer className={styles.tableContainer} >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#383A3C" }}>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>DATE</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>CHECK IN</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>CHECK OUT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                attendanceData && attendanceData.map((item: any, idx: any) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell sx={{ textAlign: "center" }}>{item.employeeId.name}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{formatDate(item.date)}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.regularizationRequest.status}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{formatTime(item.clockIn)}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                {item.clockOut === "" ?
                                                    <>{formatTime(item.clockOut)}</>

                                                    :
                                                    <CommonButton name={"Clock Out"} onClick={() => handleClockOut(item._id)} />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )

}

export default Attendance;