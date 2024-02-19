import React from 'react'
import styles from './AssignEmpModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import SelectField from '../../SelectField/SelectField';
import CommonButton from '../../common/CommonButton/CommonButton';

export interface IAssignEmpModal {
    open: boolean;
    handleClose: () => void;
}
const AssignEmpModal = ({ open, handleClose }: IAssignEmpModal) => {
    const data = ["EMPLOYEE", "HR", "MANAGER", "DIRECTER"]
    return (
        <Modal
            open={open}
            className={styles.changeRoleModalContainer}
        >
            <Grid className={styles.changeRoleModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={25} fontWeight={500}>Assign Staff</Typography>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.changeRole}>
                    <SelectField title={'Select Role'} data={data} option={undefined} name={'role'} handleChange={undefined} />
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} />
                    <CommonButton name={"Submit"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AssignEmpModal;