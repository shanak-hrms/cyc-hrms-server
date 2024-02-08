import React from 'react'
import styles from './ConformActionModal.module.scss'
import { Modal, Grid, Typography, Box, Divider } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IConformActionModal {
    open: boolean;
    handleClose: any;
    handleReject: any;
    handleApprove: any
}
const ConformActionModal = ({ open, handleClose, handleReject, handleApprove }: IConformActionModal) => {
    return (
        <Modal
            open={open}
            className={styles.conformActionModal}
        >
            <Grid className={styles.conformAction}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Are you sure ? </Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.action}>
                    <CommonButton name={"Reject"} onClick={handleReject} />
                    <CommonButton name={"Approve"} onClick={handleApprove} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ConformActionModal