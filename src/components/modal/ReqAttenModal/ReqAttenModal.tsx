import React from 'react'
import styles from './ReqAttenModal.module.scss'
import { Grid, Box, Modal, Typography, Divider, TextField } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import CommonButton from '../../common/CommonButton/CommonButton';
import InputField from '../../inputField/InputField';
import { style } from '@mui/system';


export interface IReqAttenModal {
    open: boolean;
    handleClose: any;
    reqAttenVal: any;
    handleChange: any;
    handleAttendance: any;
}
const ReqAttenModal = ({ open, reqAttenVal, handleClose, handleChange, handleAttendance }: IReqAttenModal) => {
    return (
        <Modal
            open={open}
            className={styles.reqAttenModal}
        >
            <Grid className={styles.reqAtten}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>
                        Marked Attendance
                    </Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.selectField}>
                    <Typography>Select Time</Typography>
                    <TextField type='time' name='time' value={reqAttenVal.time} onChange={handleChange} />
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Clock In"} onClick={handleAttendance} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ReqAttenModal