import React from 'react'
import styles from './LeadStatusModal.module.scss'
import { Modal, Grid, Box, Typography, Divider } from '@mui/material'
import SelectField from '../../SelectField/SelectField';
import { IoMdClose } from "react-icons/io";
import CommonButton from '../../common/CommonButton/CommonButton';


export interface ILeadStatusModal {
    open: any;
    statusVal: any
    handleClose: any;
    handleUpdateStatus: any;
    handleChangeLeadStatus: any
}
const LeadStatusModal = ({ open, handleClose, statusVal, handleChangeLeadStatus, handleUpdateStatus }: ILeadStatusModal) => {
    const data = ["Closed", "Open", "Cold", "Hot", "Warm", "Lost"]
    return (
        <Modal
            open={open}
            className={styles.leadStatusModalContainer}
        >
            <Grid className={styles.leadStatusModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={25} fontWeight={500}>Update Status Request</Typography>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <SelectField
                    title={'Select Status'}
                    data={data}
                    option={statusVal.requestFor}
                    name={'requestFor'}
                    handleChange={handleChangeLeadStatus}
                />
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleUpdateStatus} />
                </Grid>

            </Grid>
        </Modal>
    )
}

export default LeadStatusModal