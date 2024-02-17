import React, { useEffect, useState } from 'react'
import styles from './ClaimsRequest.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import HeadingText from '../../components/HeadingText/HeadingText'
import ClaimsRequestModal from '../../components/modal/ClaimsRequestModal/ClaimsRequestModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonButton from '../../components/common/CommonButton/CommonButton'
import RequestModal from '../../components/modal/RequestModal/RequestModal'
import LeaveModal from '../../components/modal/LeaveModal/LeaveModal'
import CompOffModal from '../../components/modal/CompOffModal/CompOffModal'

const ClaimsRequest = () => {
    const [open, setOpen] = useState(false);
    const [reqModal, setReqModal] = useState(false)
    const [leaveModal, setLeaveModal] = useState(false);
    const [compModal, setCompModal] = useState(false)
    const handleClose = () => { setOpen(false); setReqModal(false); setLeaveModal(false); setCompModal(false) };
    const handleAtenModal = () => setReqModal(!reqModal);
    const handleLeaveModal = () => setLeaveModal(!leaveModal);
    const handleCompOffModal = () => setCompModal(!compModal);
    const [leaveVal, setLeaveVal] = useState<any>({
        startDate: '', endDate: '', leaveType: '', month: "", leaveReason: ''
    });
    const [inputData, setInputData] = useState({ claimName: "", claimAmount: "", message: "" });
    const [requestVal, setRequestVal] = useState({ date: "" })
    const [compVal, setCompVal] = useState({ dateOfRequest: "" })
    const [attenRequestData, setAttenRequestData] = useState<any>();
    const [claimRequestData, setClaimRequestData] = useState<any>();
    const [pendingData, setPendingData] = useState<any>();
    const [rejectData, setRejectData] = useState<any>();
    const [claimMessage, setClaimMessage] = useState();
    const [compOffData, setCompOffData] = useState<any>();


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };
    const handleChangeReqaAtten = (e: any) => {
        const { name, value } = e.target;
        setRequestVal({ ...requestVal, [name]: value })
    };
    const handleChangeCompOff = (e: any) => {
        const { name, value } = e.target;
        setCompVal({ ...compVal, [name]: value })
    };
    console.log(compVal, "compVal..")
    const handleChangeLeaveReq = (e: any) => {
        const { name, value } = e.target;
        setLeaveVal({ ...leaveVal, [name]: value })
    }
    const handleChengeMessage = (des: any) => {
        setClaimMessage(des)
        setInputData((preState: any) => ({ ...preState, message: claimMessage }))
    };
    const handleClickModal = (idx: any) => {
        setOpen(!open);
    };
    const getAttendaceData = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserStr)
        const { email } = loginedUser
        try {
            const result = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/attendance/get');
            const data = result.data.attendanceData;
            const filterData = data?.filter((item: any) => item.employeeId?.email === email)
            setAttenRequestData(filterData);
        } catch (error) {
            console.error("Error during GET request:", error);
        }
    };
    const getPendingLeave = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/empLeave/pending/request/foruser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data.approvedLeave;
            setPendingData(data)

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const getRejectedLeave = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/empLeave/rejected/request/list/foruser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data.rejectedLeave;
            setRejectData(data)

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const getClaimRequest = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/claim/all/request/list/ofuser`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(response.data, "responseClaim")
            const data = response.data;
            setClaimRequestData(data);
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
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleCreateClaimRequest = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser

        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/claim/apply/request`, inputData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(response, "response....");
            if (response.status === 200) {
                toast.success("Claim request created successfully!")
                setOpen(false)
            }
            await getClaimRequest();
        }
        catch (err) {
            console.log(err)
        }
    }
    const formatedMessage = (message: any) => {
        if (message !== undefined && message !== null) {
            const messageString = String(message);

            const cleanedMessage = messageString.replace(/<\/?p>/g, '');

            return cleanedMessage;
        } else {
            return '';
        }
    }
    const formateDate = (dateString: any) => {
        const date = new Date(dateString)
        return date.toLocaleDateString();
    }
    const formateTime = (dateString: any) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString();
    }
    const handleRequestAtt = async () => {
        const liginedUserString: any = localStorage.getItem("loginedUser")
        const liginedUser = JSON.parse(liginedUserString);
        const { token } = liginedUser;
        const { date } = requestVal;
        const desiredDate = new Date(date);
        const formattedDate = desiredDate.toISOString();

        const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/request/approval`, {
            date: formattedDate
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        if (response.status === 201) {
            await getAttendaceData();
            setReqModal(false);
        }
    };
    const handleClickLeave = async () => {
        try {
            const userTokenString: any = localStorage.getItem("loginedUser")
            const userToken = JSON.parse(userTokenString)
            const { token } = userToken
            const selectedDates: never[] = []
            const response = await axios.post(
                'https://hrms-server-ygpa.onrender.com/api/v1/empLeave/apply/request',
                {
                    name: "name",
                    email: "email",
                    startDate: leaveVal.startDate,
                    endDate: leaveVal.endDate,
                    month: leaveVal.month,
                    dates: selectedDates,
                    leaveType: leaveVal.leaveType,
                    leaveReason: leaveVal.leaveReason
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast.success('Leave successfully created');
                getPendingLeave();
                setLeaveModal(false)

            } else {
                toast.error('Failed to create leave');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setOpen(false);
        }
    };
    const handleCompOffRequest = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/compoff/apply/for-a-day`, compVal,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(response, "response..")
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getAttendaceData();
        getPendingLeave();
        getRejectedLeave();
        getClaimRequest();
        getCompData();
    }, []);

    return (
        <Grid className={styles.claimRequestContainer}>
            <TableContainer className={styles.tableContainer}>
                <Grid className={styles.claimHeader}>
                    <HeadingText
                        heading={'Attendance Request List'}
                        IsAction={false}
                    />
                    <Box>
                        <CommonButton name={"Attendance Request"} onClick={handleAtenModal} />
                        <CommonButton name={"Leave Request"} onClick={handleLeaveModal} />
                        <CommonButton name={"Claim Request"} onClick={handleClickModal} />
                        <CommonButton name={"Comp Off Request"} onClick={handleCompOffModal} />

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attenRequestData && attenRequestData.filter((item: any) => item.regularizationRequest?.status === "Pending").map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formateDate(item.date)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.regularizationRequest?.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.clockIn === null ? "00:00:00" : <>{formateTime(item.clockIn)}</>}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.clockIn === null ? "00:00:00" : <>{formateTime(item.clockOut)}</>}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.tableContainer}>
                <Grid className={styles.claimHeader}>
                    <HeadingText
                        heading={'Leave Request List'}
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
                                </TableRow>
                            )
                        })}
                        <>
                            {rejectData && rejectData.map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formatedMessage(item.leaveType)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formatedMessage(item.status)}</TableCell>
                                    </TableRow>
                                )
                            })}</>

                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.tableContainer}>
                <Grid className={styles.claimHeader}>
                    <HeadingText
                        heading={'Claim Request List'}
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
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.tableContainer}>
                <Grid className={styles.claimHeader}>
                    <HeadingText
                        heading={'Comp Off Request List'}
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
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

            <RequestModal
                open={reqModal}
                handleClose={handleClose}
                requestVal={requestVal}
                handleChange={handleChangeReqaAtten}
                handleRequest={handleRequestAtt} />
            <LeaveModal
                open={leaveModal}
                heading={"Create New Leave"}
                handleClose={handleClose}
                leaveVal={leaveVal}
                handleChange={handleChangeLeaveReq}
                handleClick={handleClickLeave}
                handleChangeRadio={undefined}
                radioVal={undefined}
            />
            <ClaimsRequestModal
                open={open}
                heading='Claim Special Request'
                buttonName={"Submit"}
                inputData={inputData}
                handleChange={handleChange}
                handleClose={handleClose}
                handleClick={handleCreateClaimRequest}
                handleChengeMessage={handleChengeMessage}
            />
            <CompOffModal
                open={compModal}
                handleClose={handleClose}
                handleRequest={handleCompOffRequest}
                compVal={compVal}
                handleChange={handleChangeCompOff} />

            <ToastContainer />
        </Grid>
    )
}

export default ClaimsRequest