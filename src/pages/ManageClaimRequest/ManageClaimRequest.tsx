import React, { Fragment, useEffect, useState } from 'react'
import styles from './ManageClaimRequest.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import ClaimActionModal from '../../components/modal/ClaimActionModal/ClaimActionModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeadingText from '../../components/HeadingText/HeadingText'
import ConformActionModal from '../../components/modal/ConformActionModal/ConformActionModal'

const ManageClaimRequest = () => {
    const [actionModal, setActionModal] = useState(false);
    const [claimModal, setClaimModal] = useState(false);
    const [leaveModal, setLeaveModal] = useState(false);
    const [attenModal, setAttenModal] = useState(false);
    const handleClose = () => { setActionModal(false); setClaimModal(false); setLeaveModal(false); setAttenModal(false) };
    const [attenRequestData, setAttenRequestData] = useState<any>();
    const [claimRequestData, setClaimRequestData] = useState<any>();
    const [pendingData, setPendingData] = useState<any>();
    const [compOffData, setCompOffData] = useState<any>();
    const [claimMessage, setClaimMessage] = useState();
    const [actionId, setActionId] = useState()
    const [claimId, setClaimId] = useState();
    const [leaveId, setLeaveId] = useState();
    const [attenId, setAttenId] = useState()



    const handleAction = (idx: any) => {
        setActionModal((presState: any) => ({ ...presState, [idx]: !presState[idx] }))
        setActionId(idx)
    };
    const handleActionClaim = (idx: any) => {
        setClaimModal((presState: any) => ({ ...presState, [idx]: !presState[idx] }))
        setClaimId(idx)
    };
    const handleActionLeave = (idx: any) => {
        setLeaveModal((presState: any) => ({ ...presState, [idx]: !presState[idx] }))
        setLeaveId(idx)
    };
    const handleActionAtten = (idx: any) => {
        setAttenModal((presState: any) => ({ ...presState, [idx]: !presState[idx] }))
        setAttenId(idx)
    };

    const formateTime = (idx: any) => {

    }

    const getAttenData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/pendinding/request/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.pendingRegularizationRequests;
            setAttenRequestData(data);
            console.log(response, "responseAtt..")
        }
        catch (err) {
            console.log(err)
        }
    }
    const getLeaveData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/pending/request/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.pendingLeave;
            setPendingData(data);
            console.log(data, "data=getLeaveData..")
        }
        catch (err) {
            console.log(err)
        }
    }
    const getClaimData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1//claim/all/pending/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.claimData;
            setClaimRequestData(data);
            console.log(response.data.claimData, "claimData////..")
        }
        catch (err) {
            console.log(err)
        }
    }
    const getCompData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser;
        const date = new Date();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/compoff/get/list?month=2&year=${getYear}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.compOffCount;
            setCompOffData(data);
            console.log(response, "getCompData..")
        }
        catch (err) {
            console.log(err)
        }
    }
    const formateDate = (dateString: any) => {
        const date = new Date(dateString)
        console.log(dateString, "dateString")
        return date.toLocaleDateString()
    };
    const formatedMessage = (message: any) => {
        if (message !== undefined && message !== null) {
            const messageString = String(message);
            const cleanedMessage = messageString.replace(/<\/?p>/g, '');
            return cleanedMessage;
        } else {
            return '';
        }
    };
    const handleApprove = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/compoff/approve/request/${actionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("CompOff approved successfully")
                setActionModal(false)
                await getCompData();
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleApproveClaim = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/claim/approve/request/${claimId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("Claim approved successfully")
                setClaimModal(false)
                await getClaimData();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleRejectClaim = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1//claim/reject/request/${claimId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("Claim rejected successfully")
                setClaimModal(false)
                await getClaimData();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleApproveLeave = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/approve/request/${leaveId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("Claim approved successfully")
                setLeaveModal(false)
                await getLeaveData();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleRejectLeave = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/reject/request/${leaveId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("Claim approved successfully")
                setLeaveModal(false)
                await getLeaveData();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleApproveAtten = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/approve/attendance-request/${attenId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("Attendance approved successfully")
                setAttenModal(false)
                await getAttenData();
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAttenData();
        getLeaveData();
        getClaimData();
        getCompData();

    }, [])
    return (
        <Fragment>
            <Grid className={styles.claimRequestContainer}>
                <TableContainer className={styles.tableContainer}>
                    <Grid className={styles.claimHeader}>
                        <HeadingText
                            heading={'Attendance Request'}
                            IsAction={false}
                        />
                        <Box>
                            {/* <CommonButton name={"Attendance Request"} onClick={handleAtenModal} />
                        <CommonButton name={"Leave Request"} onClick={handleLeaveModal} />
                        <CommonButton name={"Claim Request"} onClick={handleClickModal} />
                        <CommonButton name={"Claim CompOff"} onClick={handleCompOffModal} /> */}

                        </Box>
                    </Grid>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>NAME</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>DATE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>CLOCK IN</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>CLOCK OUT</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>ACTION</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attenRequestData && attenRequestData.length > 0 && attenRequestData.filter((item: any) => item.regularizationRequest?.status === "Pending").map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.date)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.regularizationRequest?.status}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.clockIn === null ? "00:00:00" : <>{formateTime(item.clockIn)}</>}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.clockIn === null ? "00:00:00" : <>{formateTime(item.clockOut)}</>}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <CommonButton name="Action" onClick={(() => handleActionAtten(item._id))} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer className={styles.tableContainer}>
                    <Grid className={styles.claimHeader}>
                        <HeadingText
                            heading={'Leave Request'}
                            IsAction={false}
                        />
                        {/* <Box>
                    <CommonButton name={"Attendance Request"} onClick={handleClickModal} />
                    <CommonButton name={"Leave Request"} onClick={handleClickModal} />
                    <CommonButton name={"Claim Request"} onClick={handleClickModal} />
                </Box> */}
                    </Grid>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>NAME</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>START DATE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>END DATE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>TYPE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingData && pendingData.map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formatedMessage(item.leaveType)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formatedMessage(item.status)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <CommonButton name="Action" onClick={(() => handleActionLeave(item._id))} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer className={styles.tableContainer}>
                    <Grid className={styles.claimHeader}>
                        <HeadingText
                            heading={'Claim Request'}
                            IsAction={false}
                        />
                        {/* <Box>
                    <CommonButton name={"Attendance Request"} onClick={handleClickModal} />
                    <CommonButton name={"Leave Request"} onClick={handleClickModal} />
                    <CommonButton name={"Claim Request"} onClick={handleClickModal} />
                </Box> */}
                    </Grid>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>CLAIM NAME</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>CLAIM AMOUNT</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>DATE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>MESSAGE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {claimRequestData && claimRequestData.length > 0 && claimRequestData.map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>{item.claimName}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.claimAmount}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.date)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formatedMessage(item.message)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <CommonButton name="Action" onClick={(() => handleActionClaim(item._id))} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer className={styles.tableContainer}>
                    <Grid className={styles.claimHeader}>
                        <HeadingText
                            heading={'Comp Off Request'}
                            IsAction={false}
                        />
                        {/* <Box>
                    <CommonButton name={"Attendance Request"} onClick={handleClickModal} />
                    <CommonButton name={"Leave Request"} onClick={handleClickModal} />
                    <CommonButton name={"Claim Request"} onClick={handleClickModal} />
                </Box> */}
                    </Grid>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>NAME</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>EMAIL</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>DATE</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {compOffData && compOffData.length > 0 && compOffData.map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.email}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.dateOfRequest)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.approved === false ? "Pending" : "Approved"}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <CommonButton name="Action" onClick={(() => handleAction(item._id))} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <ToastContainer />
            </Grid>
            <ConformActionModal
                open={attenModal}
                handleClose={handleClose}
                handleReject={handleClose}
                handleApprove={handleApproveAtten}
            />
            <ConformActionModal
                open={leaveModal}
                handleClose={handleClose}
                handleReject={handleRejectLeave}
                handleApprove={handleApproveLeave}
            />
            <ConformActionModal
                open={claimModal}
                handleClose={handleClose}
                handleReject={handleRejectClaim}
                handleApprove={handleApproveClaim}
            />
            <ConformActionModal
                open={actionModal}
                handleClose={handleClose}
                handleReject={handleClose}
                handleApprove={handleApprove}
            />
        </Fragment>
    )
}

export default ManageClaimRequest