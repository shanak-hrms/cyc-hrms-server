import React from 'react'
import styles from './StaffProfileModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";

export interface IStaffProfileModal {
    open: boolean;
    profile: any;
    handleClose: () => void;
}
const StaffProfileModal = ({ open, profile, handleClose }: IStaffProfileModal) => {
    return (
        <Modal
            open={open}
            className={styles.staffProfileModal}
        >
            <Grid className={styles.staffProfile}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Profile Details</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid container className={styles.staffDetails}>
                    <Grid item sm={6}>
                        {/* <Typography>Emp Code:<span>{profile && profile[0]?.name}</span></Typography> */}
                        {/* <Typography>Name:<span>{profile[0]?.name}</span></Typography>
                        <Typography>Oficial Email:<span>{profile[0]?.email}</span></Typography>
                        <Typography>Department:<span>{profile[0]?.department}</span></Typography>
                        <Typography>Staff Type:<span>{profile[0]?.type}</span></Typography>
                        <Typography>Bank Name:<span>{profile[0]?.bankName}</span></Typography>
                        <Typography>Branch:<span>{profile[0]?.branch}</span></Typography>
                        <Typography>UAN:<span>{profile[0]?.una}</span></Typography>
                        <Typography>Address:<span>{profile[0]?.address}</span></Typography> */}
                    </Grid>
                    {/* <Grid item sm={6}>
                        <Typography>Date of Joining:<span>{profile[0]?.dateOfJoining}</span></Typography>
                        <Typography>Mobile No:<span>{profile[0]?.name}</span></Typography>
                        <Typography>Personal Email:<span>{profile[0]?.name}</span></Typography>
                        <Typography>Designation:<span>{profile[0]?.designation}</span></Typography>
                        <Typography>Role:<span>{profile[0]?.role}</span></Typography>
                        <Typography>Bank Account Number:<span>{profile[0]?.name}</span></Typography>
                        <Typography>IFSC Code:<span>{profile[0]?.name}</span></Typography>
                        <Typography>ESIC Ref No:<span>{profile[0]?.name}</span></Typography>
                    </Grid> */}
                </Grid>
            </Grid>
        </Modal>
    )
}

export default StaffProfileModal