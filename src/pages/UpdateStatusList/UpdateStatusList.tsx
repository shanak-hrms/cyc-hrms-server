import React, { useEffect, useState } from 'react'
import styles from './UpdateStatusList.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import HeadingText from '../../components/HeadingText/HeadingText'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import axios from 'axios'
import ConformActionModal from '../../components/modal/ConformActionModal/ConformActionModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStatusList = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [leadData, setLeadData] = useState<any>();
    const [leadId, setLeadId] = useState()

    const getLeadData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/lead/all/leads`);
            const leadData = response.data.leadData;

            // Check if leadData is not null or undefined
            if (leadData) {
                // Filter leadData based on needApprovalFrom property
                const filterData = leadData.filter((item: any) => item.needApprovalFrom && item.needApprovalFrom[0] === "MANAGER");

                // Update state with leadData
                setLeadData(filterData);

                // Log data
                if (leadData.length > 0) {
                    console.log(leadData[0].needApprovalFrom, "leadData..");
                }
                console.log(filterData, "filterData");
            } else {
                console.log("No lead data found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleActionModal = (idx: any) => {
        setOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }));
        setLeadId(idx)
        console.log(idx, "idx..")
    }
    const handleApprove = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/lead/approve/to-requested-status/${leadId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success("Status updated sunccessfully")
                setOpen(false)
                getLeadData();
            }
        } catch (error) {
            console.error("Error during POST request:", error);
        }
    };
    const formattedDate = (idx: any) => {
        const dateObj = new Date(idx);
        const year = dateObj.getUTCFullYear();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();

        const formattedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        if (formattedDateString === "1970-01-01") {
            return formattedDateString;
        }
        return formattedDateString;


    };
    function truncateWords(text: string, numWords: number) {
        const words = text.split(' ');
        const truncatedText = words.slice(0, numWords).join(' ');
        return truncatedText;
    }

    useEffect(() => {
        getLeadData();
    }, [])
    return (
        <Grid className={styles.updateStatusListCOntainer}>
            <HeadingText heading={'Update Status List'} />
            <TableContainer className={styles.tableContainer}>
                <Table >
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
                                    <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.openDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.closeDate)}</TableCell>
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
                                    <TableCell sx={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: truncateWords(item.leadDesc, 8) }}></TableCell>
                                    <TableCell sx={{ textAlign: "center" }} onClick={() => handleActionModal(item._id)} >
                                        <CommonButton name="Action" />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConformActionModal
                open={open}
                handleClose={handleClose}
                handleReject={handleClose}
                handleApprove={handleApprove}
            />
            <ToastContainer />
        </Grid>
    )
}

export default UpdateStatusList