import React from 'react'
import { Divider, Grid, Modal, Typography } from '@mui/material'
import styles from './LeaveActionModal.module.scss'
import LeaveText from './LeaveText/LeaveText';
import { RxCross2 } from "react-icons/rx";
import CommonButton from '../common/CommonButton/CommonButton';


export interface ILeaveActionModal {
  open: boolean;
  name: string,
  empId: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  totalLeave: string,
  leaveReason: string
  handleClose: any;
  handleApproved: any;
  handleReject: any;

}
const LeaveActionModal = ({ open, name, empId, leaveType, startDate, endDate, totalLeave, leaveReason, handleClose, handleApproved, handleReject }: ILeaveActionModal) => {
  const formattedDate = (idx: any) => {
    const dateObj = new Date(idx);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();

    const formattedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    if (formattedDateString === "1970-01-01") {
      return formattedDateString;
    }
    return formattedDateString;
  };
  return (
    <Modal
      open={open}
      sx={{ width: 600, height: "fit-content", margin: "auto" }}
    >
      <Grid className={styles.leaveActionModal}>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Typography variant='h5' fontSize={20} fontWeight={500}>Manage Leave</Typography>
          <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
        </Grid>
        <Divider />
        <Grid container className={styles.leaveDetails} >
          <Grid item sm={6}>
            <LeaveText name={"Name"} lebel={name} />
            <LeaveText name={"Start Date"} lebel={formattedDate(startDate)} />
            <LeaveText name={"Leave Type"} lebel={leaveType} />
            <LeaveText name={"Leave Reason"} lebel={leaveReason} />
          </Grid>
          <Grid item sm={6}>
            <LeaveText name={"EMP ID"} lebel={empId} />
            <LeaveText name={"End Date"} lebel={formattedDate(endDate)} />
            <LeaveText name={"Total Days"} lebel={totalLeave} />
          </Grid>
        </Grid>
        <Grid className={styles.actionButton}>
          <CommonButton
            name={"Approve"}
            onClick={handleApproved}
          />
          <CommonButton
            name={"Reject"}
            onClick={handleReject}
          />
        </Grid>

      </Grid>

    </Modal>
  )
}

export default LeaveActionModal