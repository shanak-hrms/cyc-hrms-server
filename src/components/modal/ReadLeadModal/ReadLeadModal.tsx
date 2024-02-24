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
        const dateObj = new Date(idx);
        const year = dateObj.getUTCFullYear();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();

        const formattedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

        return formattedDateString;
    }
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.readLeadModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>View Business</Typography>
                    <MdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid container className={styles.readLead}>
                    <Grid item sm={6}>
                        <Typography>Lead Name: <span>{leadData && leadData.length > 0 ? leadData[0].leadName : 'No lead type available'}</span></Typography>
                        <Typography>Lead Status: <span>{leadData && leadData.length > 0 ? leadData[0].leadStatus : 'No lead type available'}</span></Typography>
                        <Typography>Open Date: <span>{formateDate(leadData && leadData.length > 0 ? leadData[0].openDate : 'No lead type available')}</span></Typography>
                        <Typography>Vendor Name: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorName : 'No lead type available'}</span></Typography>
                        <Typography>Vendor Email: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorEmail : 'No lead type available'}</span></Typography>
                        <Typography>Business Type: <span>{leadData && leadData.length > 0 ? leadData[0].business?.type : 'No lead type available'}</span></Typography>
                        <Typography>Business Value: <span>{leadData && leadData.length > 0 ? leadData[0].business?.businessValueBooked : 'No lead type available'}</span></Typography>

                    </Grid>
                    <Grid item sm={6}>
                        <Typography>Lead Type: <span>{leadData && leadData.length > 0 ? leadData[0].leadType : 'No lead type available'}</span></Typography>
                        <Typography>Business From : <span>{leadData && leadData.length > 0 ? leadData[0].business?.source : 'No lead type available'}</span></Typography>
                        <Typography>Close Date : <span>{formateDate(leadData && leadData.length > 0 ? leadData[0].closeDate : 'No lead type available')}</span></Typography>
                        <Typography>Vendor Mobile: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorMobile : 'No lead type available'}</span></Typography>
                        <Typography>Vendor Address: <span>{leadData && leadData.length > 0 ? leadData[0].business?.vendorName : 'No lead type available'}</span></Typography>
                        <Typography>Business Cost: <span>{leadData && leadData.length > 0 ? leadData[0].business?.businessCost : 'No lead type available'}</span></Typography>
                        <Typography>Profit Amount: <span>{leadData && leadData.length > 0 ? leadData[0].business?.profitAmount : 'No lead type available'}</span></Typography>
                    </Grid>
                    <Typography>Lead Description: <span dangerouslySetInnerHTML={{ __html: (leadData && leadData.length > 0 ? leadData[0].leadDesc : 'No lead type available') }}></span></Typography>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ReadLeadModal