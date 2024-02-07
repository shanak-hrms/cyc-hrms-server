import React, { useState, useEffect } from 'react'
import styles from './LeaveTable.module.scss'
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton'
import { MdEdit, MdDelete } from "react-icons/md";
import CustomLoader from '../../CustomLoader/CustomLoader';

export interface ILeaveTable {
    loading: boolean;
    pendingData: any;
    handleEdit: (idx: string) => void;
    handleDelete: (idx: string) => void;
}

const LeaveTable = ({ loading, pendingData, handleEdit, handleDelete }: ILeaveTable) => {

    const formateDate = (date: any) => {
        const dateString = new Date(date)
        const formattedDate = dateString.toLocaleDateString();
        return formattedDate;
    }

    return (
        <>
            <TableContainer className={styles.leaveTableContainer}>
                <Table>
                    <TableHead style={{ backgroundColor: "#383A3C" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>MONTH</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingData && pendingData.map((item: any, idx: number) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.month}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leaveType}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.leaveTableContainer}>
                <Typography variant='h5' fontSize={22} fontWeight={500} paddingInlineStart={2.5}>Pending Leave</Typography>
                <Table>
                    <TableHead style={{ backgroundColor: "#383A3C" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>MONTH</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingData && pendingData.map((item: any, idx: number) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.month}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leaveType}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.leaveTableContainer}>
                <Typography variant='h5' fontSize={22} fontWeight={500} paddingInlineStart={2.5}>Rejected Leave</Typography>
                <Table>
                    <TableHead style={{ backgroundColor: "#383A3C" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>MONTH</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingData && pendingData.map((item: any, idx: number) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.month}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leaveType}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default LeaveTable