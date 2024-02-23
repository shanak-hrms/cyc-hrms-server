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
    const formateDate = (idx: any) => {
        const date = new Date(idx);
        return date.toLocaleDateString();
    }
    return (
        <Modal
            open={open}
            className={styles.staffProfileModal}
        >
            <Grid className={styles.staffProfile}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Employee Details</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid container className={styles.staffDetailsContainer}>
                    <Grid container className={styles.staffDetails}>
                        <Grid item sm={6}>
                            {profile && profile.length > 0 && (
                                <>
                                    <Typography>Emp Code:<span>{profile[0].empCode}</span></Typography>
                                    <Typography>Name:<span>{profile[0].name}</span></Typography>
                                    <Typography>Official Email:<span>{profile[0].officialEmail}</span></Typography>
                                    <Typography>Department:<span>{profile[0].department}</span></Typography>
                                    <Typography>Status:<span>{profile[0].empStatus}</span></Typography>

                                    <Typography>Bank Name:<span>{profile[0].bankName}</span></Typography>
                                    <Typography>Branch:<span>{profile[0].branch}</span></Typography>
                                    <Typography>UAN:<span>{profile[0].uanNumber}</span></Typography>
                                    <Typography>Address:<span>{profile[0].address}</span></Typography>
                                </>
                            )}
                        </Grid>
                        <Grid item sm={6}>
                            {profile && profile.length > 0 && (
                                <>
                                    <Typography>Date of Joining:<span>{formateDate(profile[0]?.dateOfJoining)}</span></Typography>
                                    <Typography>Mobile No:<span>{profile[0]?.mobile}</span></Typography>
                                    <Typography>Personal Email:<span>{profile[0]?.email}</span></Typography>
                                    <Typography>Designation:<span>{profile[0]?.designation}</span></Typography>
                                    <Typography>Role:<span>{profile[0]?.role}</span></Typography>

                                    <Typography>Bank Account Number:<span>{profile[0]?.bankAccount}</span></Typography>
                                    <Typography>IFSC Code:<span>{profile[0]?.IFSC}</span></Typography>
                                    <Typography>ESIC Ref No:<span>{profile[0]?.esic}</span></Typography>
                                </>
                            )}
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container className={styles.staffDetails2}>
                    <Grid item sm={3}>
                        {profile && profile.length > 0 && (
                            <>
                                {profile && profile.length > 0 && (
                                    <Typography>Assets Name:
                                        <span>
                                            {profile[0].assetsAssign.map((item: any) => (
                                                <Typography key={item._id}>{item.name}</Typography>
                                            ))}
                                        </span>
                                    </Typography>
                                )}
                            </>
                        )}
                    </Grid>
                    <Grid item sm={3}>
                        {profile && profile.length > 0 && (
                            <>
                                {profile && profile.length > 0 && (
                                    <Typography>Assets Modal:
                                        <span>
                                            {profile[0].assetsAssign.map((item: any) => (
                                                <Typography key={item._id}>{item.assetsModel}</Typography>
                                            ))}
                                        </span>
                                    </Typography>
                                )}
                            </>
                        )}
                    </Grid>
                    <Grid item sm={3}>
                        {profile && profile.length > 0 && (
                            <>
                                {profile && profile.length > 0 && (
                                    <Typography>Assets Id:
                                        <span>
                                            {profile[0].assetsAssign.map((item: any) => (
                                                <Typography key={item._id}>{item.assetsId}</Typography>
                                            ))}
                                        </span>
                                    </Typography>
                                )}
                            </>
                        )}
                    </Grid>
                    <Grid item sm={3}>
                        {profile && profile.length > 0 && (
                            <>
                                {profile && profile.length > 0 && (
                                    <Typography>Assign Date:
                                        <span>
                                            {profile[0].assetsAssign.map((item: any) => (
                                                <Typography key={item._id}>{item.date}</Typography>
                                            ))}
                                        </span>
                                    </Typography>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default StaffProfileModal