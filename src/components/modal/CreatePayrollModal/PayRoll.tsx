import React from 'react'
import styles from './CreatePayrollModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export interface ICreatePayrollModal {
    open: boolean;
    heading: string;
    name?: string;
    payrollVal: any;
    handleCreate: () => void;
    handleClose: () => void;
    handleChange: any;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const PayrollModal = ({ open, name, heading, payrollVal, handleCreate, handleClose, handleChange }: ICreatePayrollModal) => {
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
                    <FormControl fullWidth>
                        <Typography>Month</Typography>

                        <Select
                            labelId="month-label"
                            id="month-select"
                            name="month"
                            value={payrollVal.month}
                            label="Month"
                            onChange={handleChange}
                        >
                            {months.map((month, index) => (
                                <MenuItem key={index} value={month}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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

export default PayrollModal