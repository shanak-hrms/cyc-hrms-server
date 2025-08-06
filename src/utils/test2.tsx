import React from 'react'
import styles from './LeavePolicy.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";


export interface ILeavePolicy {
    open: boolean;
}
const LeavePolicy = () => {
    return (
        <Grid className={styles.leavePolicyModal}>
            <Grid className={styles.policyDetails}>
                <Typography variant='h5' fontSize={24} fontWeight={600} textAlign={"center"}>Leave policy:</Typography>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Sand witch leave policy:</Typography>
                <Typography>Any employee applying for a leave on Saturday and the subsequent Monday will be considered leave for entire three days instead of 2 days.</Typography>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Casual Leave addition:</Typography>
                <Typography>Every employee is entitled to 12 privilege  leave and 6 sick leaves every year. The leaves will be added at a pro rata basis  upto 1.5 leaves PM,which will be credited after successful 22 days of work in a month and can be obtained at maximum 2 per month . The same is available only after completion of 6 months of probation period from the date of joining.</Typography>
                <Typography>Also to note in order to consider LWP it is to be approved from three levels - Line Manager- HR- Director.</Typography>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Probation Clause and Attendance Regularisation</Typography>
                <Typography >Every employee who completes six month from the date of joining can raise a special request to complete probation which will go through three levels of Approval :</Typography>
                <Typography>Line Manager - Human Resource Manager- Director for approval</Typography>
                <Typography variant='h5' fontSize={18} fontWeight={600}>Attendance Regularisation:</Typography>
                <Typography>In case an employee fails to mark attendance it can be regularized by raising approval request to Line Manager</Typography>
                <Typography>Level of Approval - 2 days Line Manager</Typography>
                <Typography>2-5 days : Human Resource and Director.</Typography>
                <Typography>Above 5 days - Only director approval.</Typography>
            </Grid>

        </Grid>
    )
}

export default LeavePolicy