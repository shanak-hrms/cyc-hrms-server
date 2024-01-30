import React from 'react'
import styles from './PaySlip.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import logo from '../../asserst/images/LOGO_CYC2.png'
import InputField from './InputField/InputField'

const PaySlip = () => {
    return (
        <Grid className={styles.paySlipContainer}>
            <Grid className={styles.paySlipHedinng}>
                <Typography variant='h2' fontSize={32} fontWeight={600}>CYC</Typography>
                <Box>
                    <img src={logo} alt="logo" />
                </Box>
            </Grid>
            <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
            <Grid>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Address</Typography>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Mail:hr@cycevents.in</Typography>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Phone No: 033-3580-6414</Typography>
            </Grid>
            <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
            <Grid>
                <Typography textAlign={"center"} variant='h5' fontSize={22} fontWeight={600}>Pay Slip for Month of ____,2024</Typography>
            </Grid>
            <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
            <Grid className={styles.payslipField}>
                <Grid>
                    <InputField />
                    <InputField />
                    <InputField />
                    <InputField />
                </Grid>
                <Grid>
                    <InputField />
                    <InputField />
                    <InputField />
                    <InputField />
                </Grid>
            </Grid>

        </Grid>
    )
}

export default PaySlip