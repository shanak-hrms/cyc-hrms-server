import React from 'react'
import styles from './StaffModal.module.scss'
import { Modal, Grid, Typography, Box, Divider } from '@mui/material'
import { MdClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import SelectField from '../../SelectField/SelectField';
import data from './data.json'
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IStaffModal {
    open: boolean;
    handleClose: any;
    inputValue: any;
    handleChange: any;
    handleCreate: any;

}
const StaffModal = ({ open, handleClose, inputValue, handleChange, handleCreate }: IStaffModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.staffModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Add Staff</Typography>
                    <MdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.staffModal}>
                    <Grid>
                        <InputField
                            label={'Name'}
                            name={'name'}
                            placeholder={''}
                            value={inputValue.name}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Date of join'}
                            name={'dateOfJoin'}
                            placeholder={'dateOfJoin'}
                            value={inputValue.dateOfJoin}
                            handleChange={handleChange}
                            type={"date"}
                        />
                        <SelectField
                            title={'Branch'}
                            data={data.branch}
                            option={inputValue.branch}
                            name={'branch'}
                            handleChange={handleChange}
                        />
                        <SelectField
                            title={'Designation'}
                            data={data.designation}
                            option={inputValue.designation}
                            name={'designation'}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid>
                        <InputField
                            label={'Email'}
                            name={'email'}
                            placeholder={''}
                            value={inputValue.email}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Password'}
                            name={'password'}
                            placeholder={''}
                            value={inputValue.password}
                            handleChange={handleChange}
                            type={"password"}
                        />
                        <SelectField
                            title={'Department'}
                            data={data.department}
                            option={inputValue.department}
                            name={'department'}
                            handleChange={handleChange}
                        />
                        <SelectField
                            title={'Role'}
                            data={data.role}
                            option={inputValue.role}
                            name={'role'}
                            handleChange={handleChange}
                        />
                    </Grid>

                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleCreate} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default StaffModal