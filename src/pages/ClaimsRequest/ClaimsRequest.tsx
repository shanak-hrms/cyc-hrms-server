import React, { useEffect, useState } from 'react'
import styles from './ClaimsRequest.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import HeadingText from '../../components/HeadingText/HeadingText'
import ClaimsRequestModal from '../../components/modal/ClaimsRequestModal/ClaimsRequestModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonButton from '../../components/common/CommonButton/CommonButton'


const ClaimsRequest = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false) };
    const [inputData, setInputData] = useState({ claimName: "", claimAmount: "", message: "" });
    const [claimRequestData, setClaimRequestData] = useState<any>();
    const [claimMessage, setClaimMessage] = useState();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };
    const handleChengeMessage = (des: any) => {
        setClaimMessage(des)
        setInputData((preState: any) => ({ ...preState, message: claimMessage }))
    };
    const handleClickModal = (idx: any) => {
        setOpen(!open);
    };
    const getData = async () => {
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
            const data = response.data.claimData;
            setClaimRequestData(data);
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
            await getData();
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
    useEffect(() => {
        getData();
    }, [])
    return (
        <Grid className={styles.claimRequestContainer}>
            <Grid className={styles.claimHeader}>
                <HeadingText
                    heading={'Claims Special Request'}
                    IsAction={false}
                />
                <CommonButton name={"Claim"} onClick={handleClickModal} />
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#000000", textAlign: "center", fontSize:13, fontWeight:600 }}>CLAIM NAME</TableCell>
                            <TableCell sx={{ color: "#000000", textAlign: "center", fontSize:13, fontWeight:600 }}>CLAIM AMOUNT</TableCell>
                            <TableCell sx={{ color: "#000000", textAlign: "center", fontSize:13, fontWeight:600 }}>DATE</TableCell>
                            <TableCell sx={{ color: "#000000", textAlign: "center", fontSize:13, fontWeight:600 }}>STATUS</TableCell>
                            <TableCell sx={{ color: "#000000", textAlign: "center", fontSize:13, fontWeight:600 }}>MESSAGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claimRequestData && claimRequestData.map((item: any) => {
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
            <ToastContainer />
        </Grid>
    )
}

export default ClaimsRequest