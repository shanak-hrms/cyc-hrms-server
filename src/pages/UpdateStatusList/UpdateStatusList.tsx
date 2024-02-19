import React, { useEffect, useState } from 'react'
import styles from './UpdateStatusList.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import HeadingText from '../../components/HeadingText/HeadingText'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import axios from 'axios'
import ConformActionModal from '../../components/modal/ConformActionModal/ConformActionModal'

const UpdateStatusList = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [leadData, setLeadData] = useState<any>();
    const getLeadData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/lead/all/leads`)
            const leadData = response.data.leadData;
            setLeadData(leadData)
            const filterData = leadData.filter((item:any)=>item.needApprovalFrom[0]==="MANAGER")
            console.log(leadData[0].needApprovalFrom,"leadData..")
            console.log(filterData, "filterData")
        }
        catch (err) {
            console.log(err)
        }
    };
    const handleActionModal = (idx: any) => {
        setOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))

    }
    useEffect(() => {
        getLeadData();
    }, [])
    return (
        <Grid>
            <Table>
                <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Lead Name</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Lead Type</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Open Date</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Close Date</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Type</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Source</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Vendor Name</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Vendor Address</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Value</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Cost</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Profit Amount</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Description</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leadData && leadData.map((item: any) => {
                        return (
                            <TableRow>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadType}</TableCell>
                                {/* <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.openDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.closeDate)}</TableCell> */}
                                <TableCell sx={{ textAlign: "center" }}>
                                    {item?.leadStatus}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.type}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.source}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorAddress}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.businessValueBooked}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.businessCost}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.profitAmount}</TableCell>
                                {/* <TableCell sx={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: truncateWords(item.leadDesc, 8) }}></TableCell> */}
                                <TableCell sx={{ textAlign: "center" }} onClick={handleActionModal} >
                                    <CommonButton name="Action" />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <ConformActionModal
                open={open}
                handleClose={handleClose}
                handleReject={handleClose}
                handleApprove={undefined}
            />
        </Grid>
    )
}

export default UpdateStatusList