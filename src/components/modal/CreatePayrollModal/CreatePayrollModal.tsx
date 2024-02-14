import React from 'react'
import styles from './CreatePayrollModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';

export interface ICreatePayrollModal {
    open: boolean;
    heading: string;
    name?: string;
    payrollVal: any;
    handleCreate: () => void;
    handleClose: () => void;
    handleChange: any;
}
const CreatePayrollModal = ({ open, name, heading, payrollVal, handleCreate, handleClose, handleChange }: ICreatePayrollModal) => {
    return (
        <Modal
            open={open}
            className={styles.createPayrollModal}
        >
            <Grid className={styles.createPayroll}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.createField}>
                    <InputField
                        label={'Month'}
                        name={'month'}
                        placeholder={'Please enter month'}
                        value={payrollVal.month}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Year'}
                        name={'year'}
                        placeholder={'Please enter year'}
                        value={payrollVal.year}
                        handleChange={handleChange}
                        type={"number"}
                    />
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={name} onClick={handleCreate} />
                </Grid>

            </Grid>
        </Modal>
    )
}

export default CreatePayrollModal