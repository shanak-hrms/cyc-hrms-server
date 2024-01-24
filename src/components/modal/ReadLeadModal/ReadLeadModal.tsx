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
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.readLeadModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Lead Details</Typography>
                    <MdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.readLead}>
                    <Typography>
                        {leadData && leadData.length > 0 ? leadData[0].leadType : 'No lead type available'}
                    </Typography>

                </Grid>
            </Grid>
        </Modal>
    )
}

export default ReadLeadModal