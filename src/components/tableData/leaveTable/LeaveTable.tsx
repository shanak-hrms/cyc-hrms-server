import React, { useState, useEffect } from 'react'
import styles from './LeaveTable.module.scss'
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton'
import { MdEdit, MdDelete } from "react-icons/md";
import CustomLoader from '../../CustomLoader/CustomLoader';

export interface ILeaveTable {
    loading: boolean;
    data: any;
    handleEdit: (idx: string) => void;
    handleDelete: (idx: string) => void;
}

const LeaveTable = ({ loading, data, handleEdit, handleDelete }: ILeaveTable) => {
    const [name, setName] = useState()
    const [empId, setEmpId] = useState()

    const formateStart = (date: any) => {

        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleString(undefined, options);
        return formattedDate;
    }
    const formateEnd = (date: any) => {

        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleString(undefined, options);
        return formattedDate;
    }
    const getTotalDays = (startDate: any, endDate: any) => {
        const start: any = new Date(startDate);
        const end: any = new Date(endDate);
        const datesArray: any = [];
        let isSaturdayPresent = false;

        if (start <= end) {
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                datesArray.push(new Date(date));

                if (date.getDay() === 6 || date.getDay() === 0) {
                    isSaturdayPresent = true;
                }
            }

            if (isSaturdayPresent) {
                console.log('Saturday is present in the generated dates.');
            } else {
                console.log('Saturday is not present in the generated dates.');
            }
        } else {
            console.error('End date must be greater than or equal to start date');
        }

        const timeDifference = end - start + 1;
        const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Calculating days
        return totalDays;
    };

    useEffect(() => {
        const name: any = localStorage.getItem('userName');
        const emp_id: any = localStorage.getItem('empId');
        setName(name)
        setEmpId(emp_id)
    }, [])
    return (
        <>
            <TableContainer className={styles.leaveTableContainer}>
                <Table>
                    <TableHead style={{ backgroundColor: "#383A3C" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>EMP ID</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>TOTAL DAYS</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer className={styles.leaveTableContainer}>
                {loading ? <CustomLoader /> : <Table>
                    <TableBody>
                        {data && data.filter((leave: any) => leave.emp_id === empId).map((item: any, idx: number) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <CommonButton name={empId} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_type}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateStart(item.start_date)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateEnd(item.end_date)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{getTotalDays(item.start_date, item.end_date)}</TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }} className={styles.tableAction}>
                                        <MdEdit fontSize={30} onClick={(() => handleEdit(item._id))} />
                                        <MdDelete fontSize={30} onClick={(() => handleDelete(item._id))} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>}
            </TableContainer>
        </>
    )
}

export default LeaveTable