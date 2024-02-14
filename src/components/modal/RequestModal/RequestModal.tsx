import React from 'react'
import styles from './RequestModal.module.scss'
import { Modal, Grid, Typography, Box, Divider, TextField } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IRequestModal {
    open: boolean;
    handleClose: () => void;
    handleRequest: () => void;
    requestVal: any;
    handleChange: any;
}
const RequestModal = ({ open, handleClose, handleRequest, requestVal, handleChange }: IRequestModal) => {
    return (
        <Modal
            open={open}
            className={styles.requestModalContainer}
        >
            <Grid className={styles.requestModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Requet Approval</Typography>
                    <IoMdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.inputField}>
                    <Typography>Select Date</Typography>
                    <TextField type='date' name='date' value={requestVal.date} onChange={handleChange} />
                </Grid>
                <Divider sx={{ marginBlock: 2 }} />

                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submite"} onClick={handleRequest} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default RequestModal