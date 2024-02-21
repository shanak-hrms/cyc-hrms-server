import React, { useEffect } from 'react'
import styles from './Attendance.module.scss'
import { Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingText from '../../../components/HeadingText/HeadingText';
import ReqAttenModal from '../../../components/modal/ReqAttenModal/ReqAttenModal';
import { devNull } from 'os';

export interface IAttendance {
    open: boolean
    loading: boolean;
    attendanceData: any;
    handleCheckIn: any;
    handleClockOut: any;
    handleReqAppModal: any;
    handleReqAttModal: any;
    reqAttenVal: any;
    handleChange: any;
    handleClose: any
    handleAttendance: any
}

const Attendance = ({ open, loading, attendanceData, handleCheckIn, handleClockOut, handleReqAppModal, handleReqAttModal, reqAttenVal, handleChange, handleClose, handleAttendance }: IAttendance) => {

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    function formatTime(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    }

    return (
        <Grid className={styles.attendanceContainer}>
            <Grid className={styles.attendanceHeading}>
                <HeadingText
                    heading={'Attendance'}
                />
                <Grid>
                    {/* <CommonButton name={"Requet Approval"} onClick={handleReqAppModal} /> */}
                    <CommonButton name={"Clock In"} onClick={handleCheckIn} />
                </Grid>
            </Grid>
            <Grid container className={styles.attendance}>
                <TableContainer className={styles.tableContainer} >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#02ABB5" }}>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>NAME</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>DATE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>CHECK IN</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>CHECK OUT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                attendanceData && attendanceData.map((item: any, idx: any) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{formatDate(item.date)}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.regularizationRequest?.status}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                {item.clockIn === null
                                                    ?
                                                    <CommonButton name={"Clock In"} onClick={() => handleReqAttModal(item._id)} />
                                                    :
                                                    <>{formatTime(item.clockIn)}</>
                                                }
                                            </TableCell>

                                            <TableCell sx={{ textAlign: "center" }}>
                                                {item.clockOut === null ?
                                                    <CommonButton name={"Clock Out"} onClick={() => handleClockOut(item._id)} />
                                                    :
                                                    <>{formatTime(item.clockOut)}</>

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
            <ReqAttenModal
                open={open}
                reqAttenVal={reqAttenVal}
                handleChange={handleChange}
                handleClose={handleClose}
                handleAttendance={handleAttendance}
            />
        </Grid>
    )

}

export default Attendance;