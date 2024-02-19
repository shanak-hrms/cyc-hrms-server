import React from 'react'
import styles from './AssignEmpModal.module.scss'
import { Box, Divider, FormControl, Grid, MenuItem, Modal, Select, Typography } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import SelectField from '../../SelectField/SelectField';
import CommonButton from '../../common/CommonButton/CommonButton';

export interface IAssignEmpModal {
    open: boolean;
    staffRole: any;
    handleChangeAssiEmp: any;
    userData: any;
    handleSelectEmp: any
    handleClickAssiEmp: any;
    handleClose: () => void;
}
const AssignEmpModal = ({ open, staffRole, handleChangeAssiEmp, userData, handleSelectEmp, handleClickAssiEmp, handleClose }: IAssignEmpModal) => {
    return (
        <Modal
            open={open}
            className={styles.changeRoleModalContainer}
        >
            <Grid className={styles.changeRoleModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={25} fontWeight={500}>Assign Employee</Typography>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.changeRole}>
                    <FormControl  >
                        <Typography>{"Select Employee"}</Typography>
                        <Select
                            value={staffRole.role}
                            name={"role"}
                            onChange={handleChangeAssiEmp}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {userData && userData.filter((item: any) => item.role === "EMPLOYEE").map((item: any, idx: number) => {
                                return (
                                    <MenuItem key={idx} value={item} onClick={() => handleSelectEmp(item._id)}>{item?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleClickAssiEmp} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AssignEmpModal;