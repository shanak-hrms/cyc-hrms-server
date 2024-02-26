import React from 'react'
import styles from './ReadLeadModal.module.scss'
import { Box, Grid, Modal, Typography, Divider } from '@mui/material'
import { MdClose } from "react-icons/md";


export interface IReadLeadModal {
    open: boolean;
    leadData: any;
    handleClose: any
}
const ReadLeadModal = ({ open, leadData, handleClose }: IReadLeadModal) => {
    const formatedDesc = (idx: any) => {
        if (idx) {
            const formattedDes = idx.replace(/<\/?p>/g, '');
            return formattedDes;
        } else {
            // Handle the case where idx is undefined or null
            return 'Default value or handle accordingly';
        }
    }
    const formateDate = (idx: any) => {
        const date = new Date(idx);
        return date.toLocaleDateString()

    };
    const formatTime = (idx: any) => {
        const date = new Date(idx);
        return date.toLocaleTimeString()
    };
    const lastTagInName = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.employeeId?.name :
        null;
    const lastTagInDate = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagIn :
        null;
    const lastTagInTime = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagIn :
        null;
    const lastTagInOut = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagOut :
        null;
    const lastTagInlatitude = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagInLocation?.latitude :
        null;
    const lastTagInlongitude = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagInLocation?.longitude :
        null;
    const lastTagOutlatitude = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagOutLocation?.latitude :
        null;
    const lastTagOutlongitude = leadData && leadData.length > 0 ?
        leadData[0].taggingHistory[leadData[0].taggingHistory.length - 1]?.tagOutLocation?.longitude :
        null;
    console.log(leadData, "leadData")
    return (
        <Modal
            open={open}
            className={styles.readLeadModalContainer}
        >
            <Grid className={styles.readLeadModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>View Business</Typography>
                    <MdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid container className={styles.readLead}>
                    <Grid item sm={6}>
                        <Typography>Lead Name: <span>{leadData && leadData.length > 0 ? leadData[0].leadName : 'Loading...'}</span></Typography>
                        <Typography>Lead Status: <span>{leadData && leadData.length > 0 ? leadData[0].leadStatus : 'Loading...'}</span></Typography>
                        <Typography>Open Date: <span>{formateDate(leadData && leadData.length > 0 ? leadData[0].openDate : 'Loading...')}</span></Typography>
                        <Typography>Vendor Name: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorName : 'Loading...'}</span></Typography>
                        <Typography>Vendor Email: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorEmail : 'Loading...'}</span></Typography>
                        <Typography>Business Type: <span>{leadData && leadData.length > 0 ? leadData[0].business?.type : 'Loading...'}</span></Typography>
                        <Typography>Business Value: <span>{leadData && leadData.length > 0 ? leadData[0].business?.businessValueBooked : 'Loading...'}</span></Typography>

                    </Grid>
                    <Grid item sm={6}>
                        <Typography>Lead Type: <span>{leadData && leadData.length > 0 ? leadData[0].leadType : 'Loading...'}</span></Typography>
                        <Typography>Business From : <span>{leadData && leadData.length > 0 ? leadData[0].business?.source : 'Loading...'}</span></Typography>
                        <Typography>Close Date : <span>{formateDate(leadData && leadData.length > 0 ? leadData[0].closeDate : 'Loading...')}</span></Typography>
                        <Typography>Vendor Mobile: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorMobile : 'Loading...'}</span></Typography>
                        <Typography>Vendor Address: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorName : 'Loading...'}</span></Typography>
                        <Typography>Business Cost: <span>{leadData && leadData.length > 0 ? leadData[0].business?.businessCost : 'Loading...'}</span></Typography>
                        <Typography>Profit Amount: <span>{leadData && leadData.length > 0 ? leadData[0].business?.profitAmount : 'Loading...'}</span></Typography>
                    </Grid>
                </Grid>
                <Typography sx={{ fontWeight: 600 }}>Lead Description: <span style={{ fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: (leadData && leadData.length > 0 ? leadData[0].leadDesc : 'null') }}></span></Typography>
                <Typography sx={{ fontWeight: 600, backgroundColor: "#F8FAF9", paddingBlock: 1, textAlign: "center", border: "1px solid #d9def1;", borderRadius: 0.5 }}>Tag Details</Typography>
                <Grid container className={styles.readLead}>
                    <Grid item sm={6}>
                        <Typography>
                            Tag in Name: <span>
                                {lastTagInName ? lastTagInName : 'null'}
                            </span>
                        </Typography>

                        <Typography>
                            Tag in Time: <span>
                                {lastTagInTime ? formatTime(lastTagInTime) : 'null'}
                            </span>
                        </Typography>
                        <Typography>
                            Tag in Location: <span>
                                {lastTagInlatitude ? lastTagInlatitude : 'null'}, {lastTagInlongitude ? lastTagInlongitude : "null"}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item sm={6}>

                        <Typography>
                            Tag in Date: <span>
                                {lastTagInDate ? formateDate(lastTagInDate) : 'null'}
                            </span>
                        </Typography>
                        <Typography>
                            Tag Out Time: <span>
                                {lastTagInOut ? formatTime(lastTagInOut) : 'null'}
                            </span>
                        </Typography>
                        <Typography>
                            Tag Out Location: <span>
                                {lastTagOutlatitude ? lastTagOutlatitude : 'null'}, {lastTagOutlongitude ? lastTagOutlongitude : "null"}
                            </span>
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
        </Modal>
    )
}
export default ReadLeadModal