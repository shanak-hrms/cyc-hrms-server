import React from 'react'
import styles from './ChangeRoleModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import SelectField from '../../SelectField/SelectField';
import CommonButton from '../../common/CommonButton/CommonButton';
import InputField from '../../inputField/InputField';

export interface IChangeRoleModal {
    open: boolean;
    staffRole: any;
    handleClose: () => void;
    handleClickRole: any;
    handleChangeRole: any;
}
const ChangeRoleModal = ({ open, staffRole, handleClose, handleClickRole, handleChangeRole }: IChangeRoleModal) => {
    const data = ["EMPLOYEE", "HR", "MANAGER", "DIRECTER"]

    return (
        <Modal
            open={open}
            className={styles.changeRoleModalContainer}
        >
            <Grid className={styles.changeRoleModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={25} fontWeight={500}>Change Role and Department</Typography>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.changeRole}>
                    <SelectField
                        title={'Select Role'}
                        data={data}
                        option={staffRole?.newRole}
                        name={'newRole'}
                        handleChange={handleChangeRole}
                    />
                    <InputField
                        label={'Department'}
                        name={'newDepartment'}
                        placeholder={'Enter department'}
                        value={staffRole.newDepartment}
                        handleChange={handleChangeRole}
                        type={"text"}
                    />
                    {/* <SelectField title={'Select Department'} data={data} option={staffRole?.role} name={'department'} handleChange={handleChangeRole} /> */}
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleClickRole} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ChangeRoleModal