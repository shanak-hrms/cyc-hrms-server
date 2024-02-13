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
    heading: string;
    handleClose: any;
    inputValue: any;
    handleChange: any;
    handleCreate: any;

}
const StaffModal = ({ open, heading, handleClose, inputValue, handleChange, handleCreate }: IStaffModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.staffModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <MdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.staffModal}>
                    <Grid>
                        <InputField
                            label={'Name'}
                            name={'name'}
                            placeholder={'Enter your name'}
                            value={inputValue.name}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Email'}
                            name={'email'}
                            placeholder={'Enter your email'}
                            value={inputValue.email}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Branch'}
                            name={'branch'}
                            placeholder={'Enter your branch'}
                            value={inputValue.branch}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Designation'}
                            name={'designation'}
                            placeholder={'Enter your designation'}
                            value={inputValue.designation}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'dateOfJoining'}
                            name={'dateOfJoining'}
                            placeholder={'Enter your joining date'}
                            value={inputValue.dateOfJoining}
                            handleChange={handleChange}
                            type={"date"}
                        />
                    </Grid>
                    <Grid>
                        <InputField
                            label={'Mobile'}
                            name={'mobile'}
                            placeholder={'Enter your mobile'}
                            value={inputValue.mobile}
                            handleChange={handleChange}
                            type={"number"}
                        />
                        <InputField
                            label={'Password'}
                            name={'password'}
                            placeholder={'Enter your password'}
                            value={inputValue.password}
                            handleChange={handleChange}
                            type={"password"}
                        />
                        <InputField
                            label={'Department'}
                            name={'department'}
                            placeholder={'Enter your department'}
                            value={inputValue.department}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <SelectField
                            title={'Role'}
                            data={data.role}
                            option={inputValue.role}
                            name={'role'}
                            handleChange={handleChange}
                        />
                        <InputField
                            label={'Address'}
                            name={'address'}
                            placeholder={'Enter your address'}
                            value={inputValue.address}
                            handleChange={handleChange}
                            type={"text"}
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