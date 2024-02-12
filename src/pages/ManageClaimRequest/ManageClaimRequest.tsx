import React, { Fragment, useEffect, useState } from 'react'
import styles from './ManageClaimRequest.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import ClaimActionModal from '../../components/modal/ClaimActionModal/ClaimActionModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageClaimRequest = () => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false);
    const [claimData, setClaimData] = useState<any>()
    const [claimId, setClaimId] = useState();

    const getData = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/claim/all/pending/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const data = response.data.claimData;
            setClaimData(data);
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleActionModal = (idx: any) => {
        setOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        setClaimId(idx)
        console.log(idx, "idx")
    };
    const handleReject = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        console.log(token, "token...")
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/claim/reject/request/${claimId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                await getData()
                setOpen(false)
                toast.success("Claim rejected successfully")

            }

        } catch (err) {
            console.log(err)
        }
    }
    const handleApprove = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/claim/approve/request/${claimId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                await getData()
                setOpen(false)
                toast.success("Claim approved successfully")
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const formateDate = (dateString: any) => {
        const date = new Date(dateString)
        return date.toLocaleDateString()

    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <Fragment>
            <Grid className={styles.manageClaimRequest}>
                <Typography variant='h5' fontSize={22} fontWeight={500}>Claim Request</Typography>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#00ACB2" }}>
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
                            {claimData && claimData.length > 0 && claimData.map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>{item.claimName}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.claimAmount}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{formateDate(item.date)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>MESSAGE</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <CommonButton name={"Action"} onClick={(() => handleActionModal(item._id))} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <ClaimActionModal open={open} handleClose={handleClose} handleReject={handleReject} handleApprove={handleApprove} />
            <ToastContainer />
        </Fragment>
    )
}

export default ManageClaimRequest