import React, { useEffect, useState } from 'react'
import styles from './RequestApproval.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import HeadingText from '../../components/HeadingText/HeadingText'
import SearchBox from '../../components/common/searchBox/SearchBox'
import axios from 'axios'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import ApproveReqModal from '../../components/modal/ApproveReqModal/ApproveReqModal'

export const RequestApproval = () => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const [query, setQuery] = useState('')
    const [reqData, setReqData] = useState<any>();
    const [userToken, setUserToken] = useState()
    const [reqId, setReqId] = useState()

    const getData = async () => {
        const userDataString: any = localStorage.getItem('loginedUser')
        const userData = JSON.parse(userDataString)
        const { token } = userData;

        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/pendinding/request/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            await setReqData(response.data.pendingRegularizationRequests)
        }
        catch (err) {
            console.log(err)
        }
    };
    const formateDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    const formateTime = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    };

    const handleApproveModal = async (idx: any) => {
        const userDataString: any = localStorage.getItem('loginedUser')
        const userData = JSON.parse(userDataString)
        const { token } = userData;
        try {
            setOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
            await setReqId(idx)
            await setUserToken(token)
        }
        catch (err) {
            console.log(err)
        }
    };

    const handleApprove = async () => {
        try {
            const response = await axios.patch(
                `https://hrms-server-ygpa.onrender.com/api/v1/attendance/approve/attendance-request/${reqId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            if (response.status === 200) {
                await getData();
                setOpen(false)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Grid className={styles.requestApprovalContainer}>
            <Grid className={styles.heading}>
                <HeadingText heading={'Request Approval List'} />
                <SearchBox setQuery={setQuery} />
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#00ACAD" }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>EMAIL</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>DATE</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>STATUS</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reqData && reqData.filter((item: any) => {
                            const employeeName = item.employeeId?.name || "";
                            return (
                                query === "" ||
                                employeeName.toLowerCase().includes(query.toLowerCase())
                            );
                        }).map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }}>{item.employeeId.name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.employeeId.email}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.date)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.regularizationRequest.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <CommonButton
                                            name={"Approve"}
                                            onClick={() => handleApproveModal(item._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <ApproveReqModal
                open={open}
                handleClose={handleClose}
                handleApprove={handleApprove} />
        </Grid>
    )
}
