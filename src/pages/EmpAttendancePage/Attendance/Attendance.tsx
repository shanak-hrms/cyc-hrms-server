import React, { useEffect, useState } from 'react'
import styles from './Attendance.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingText from '../../../components/HeadingText/HeadingText';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

export interface IAttendance {
    loading: boolean;
    attendanceData: any;

}
const Attendance = ({ loading, attendanceData }: IAttendance) => {
    const [email, setEmail] = useState<any>('')
    console.log(attendanceData, "attendanceData..")

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
                <CommonButton name={"Clock In"} />
            </Grid>

            <Grid container className={styles.attendance}>
                <TableContainer className={styles.tableContainer}>
                    <Table sx={{ overflowX: 'auto' }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#383A3C" }}>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>EMP ID</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>DATE</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>CHECK IN</TableCell>
                                <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>CHECK OUT</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <TableContainer>
                    {loading ? <CustomLoader /> : <Table>
                        {/* <TableBody>
                            {
                                attendanceData?.filter((emp: {
                                    [x: string]: any; employee: any;
                                }) => emp.email === email).map((item: any, idx: number) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                <CommonButton name={item.emp_id} />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.date}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>Present</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.clock_in}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.clock_out}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody> */}
                        <TableBody>
                            {
                                attendanceData && attendanceData.map((item: any, idx: any) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                <CommonButton name={item.emp_id} />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.date}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>Present</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.clockIn}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.clock_out}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>}
                </TableContainer>
            </Grid>
        </Grid>
    )

}

export default Attendance;