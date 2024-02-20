import React, { useEffect, useState } from 'react'
import styles from './EmpPaySlip.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import HeadingText from '../../../components/HeadingText/HeadingText'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { FaCloudDownloadAlt } from "react-icons/fa";
import CreatePayrollModal from '../../../components/modal/CreatePayrollModal/CreatePayrollModal'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EmpPaySlip = () => {
    const [open, setOpen] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false)
    const handleClose = () => { setOpen(false); setDownloadModal(false) }
    const [payrollVal, setPayrollVal] = useState({ employeeId: "", month: "", year: "" });
    const [userId, setUserId] = useState("");
    const [payrollData, setPayrollData] = useState()

    const handleRequest = () => {
        setOpen(!open)
        setPayrollVal({ ...payrollVal, employeeId: userId })
    };
    const handleDownload = () => {
        setDownloadModal(!open)
        setPayrollVal({ ...payrollVal, employeeId: userId })
    }
    const getPayrollData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser;
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/payroll/get/pending/payroll-download-request`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.pendingRequests;
            setPayrollData(data);
            console.log(response, "payroll data..")
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(payrollData, "payrollData")
    const handleChangePayroll = (e: any) => {
        const { name, value } = e.target;
        setPayrollVal({ ...payrollVal, [name]: value });
    };
    const handleRequestPayroll = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const { token } = loginedUser;
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/payroll/request/to-download-payroll?month=February&year=2024`, payrollVal,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success(response.data.message)
                setOpen(false)
            }
        }

        catch (err: any) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }
    const handleDownloadPayroll = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const { token } = loginedUser;
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1//payroll/download/monthly-payroll-by-user?month=${payrollVal.month}&year=${payrollVal.year}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success(response.data.message)
                setDownloadModal(false)
            }
        }

        catch (err: any) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }


    useEffect(() => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const { userId } = loginedUser;
        setUserId(userId);
        getPayrollData();

    }, [])
    return (
        <Grid className={styles.empPaySlipContainer}>
            <HeadingText heading={'Pay Slip List'} IsAction={true} name='Pay Slip Request' handleClick={handleRequest} />
            <TableContainer className={styles.tableContainer}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#01ACAC" }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Month</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Month</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {/* <CommonButton name={"Download"} onClick={handleDownload} /> */}
                                <FaCloudDownloadAlt fontSize={25} cursor={"pointer"} onClick={handleDownload} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <CreatePayrollModal
                open={open}
                heading={'Request for payroll'}
                name='Submit'
                payrollVal={payrollVal}
                handleCreate={handleRequestPayroll}
                handleClose={handleClose}
                handleChange={handleChangePayroll}
            />
            <CreatePayrollModal
                open={downloadModal}
                heading={'Download payroll'}
                name='Submit'
                payrollVal={payrollVal}
                handleCreate={handleDownloadPayroll}
                handleClose={handleClose}
                handleChange={handleChangePayroll}
            />
            <ToastContainer />
        </Grid>
    )
}

export default EmpPaySlip