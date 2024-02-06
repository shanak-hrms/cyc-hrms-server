import React from 'react'
import styles from './ApproveReqModal.module.scss'
import { Modal, Grid, Typography, Divider } from '@mui/material'
import { Box } from '@mui/system';
import { MdOutlineClose } from "react-icons/md";
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IApproveReqModal {
    open: boolean;
    handleClose: () => void;
    handleApprove: () => void;
}
const ApproveReqModal = ({ open, handleClose, handleApprove }: IApproveReqModal) => {
    return (
        <Modal
            open={open}
            className={styles.approveReqModal}
        >
            <Grid className={styles.approveReq}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Request Approval</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.acton}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Approve"} onClick={handleApprove} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ApproveReqModal