import React, { useEffect, useState } from 'react'
import styles from './LeaveModal.module.scss'
import { Modal, Grid, Typography, Divider, Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import SelectField from '../../SelectField/SelectField';
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { RxCross1 } from "react-icons/rx";
import data from './data.json';

export interface ILeaveModal {
    open: boolean;
    heading: string;
    handleClose: any;
    leaveVal: any;
    handleChange: any;
    handleClick: any;
    handleChangeRadio: any;
    radioVal: any;
}
const LeaveModal = ({ open, heading, handleClose, leaveVal, handleChange, handleClick, handleChangeRadio, radioVal }: ILeaveModal) => {
    const [name, setName] = useState()
    const [empId, setEmpId] = useState()
    useEffect(() => {
        const userName: any = localStorage.getItem("userName")
        const userId: any = localStorage.getItem("empId")
        setName(userName)
        setEmpId(userId)
    }, [])
    return (
        <Modal
            open={open}
            className={styles.leadModalContainer}
        >
            <Grid className={styles.createLeaveModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h4' fontSize={20} fontWeight={500}>{heading} </Typography>
                    <RxCross1 fontSize={20} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.createLeaveModal}>
                    <Box display={"flex"}>
                        <InputField
                            label={'Start Date'}
                            name={'startDate'}
                            placeholder={''}
                            value={leaveVal.startDate}
                            handleChange={handleChange}
                            type={"date"}
                        />
                        <InputField
                            label={'End Date'}
                            name={'endDate'}
                            placeholder={''}
                            value={leaveVal.endDate}
                            handleChange={handleChange}
                            type={"date"}
                        />
                    </Box>
                    <Box>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={radioVal}
                                onChange={handleChangeRadio}
                            >
                                <FormControlLabel value="date" control={<Radio />} label="Half Day" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <SelectField
                            title={'Leave Type'}
                            data={data.leaveType}
                            option={leaveVal.leaveType}
                            name={'leaveType'}
                            handleChange={handleChange}
                        />
                        <SelectField
                            title={'Month'}
                            data={data.month}
                            option={leaveVal.month}
                            name={'month'}
                            handleChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <InputField
                            label={'Leave Reason'}
                            name={'leaveReason'}
                            placeholder={'Enter your reason'}
                            value={leaveVal.leaveReason}
                            handleChange={handleChange}
                            type={"text"}
                        />

                    </Box>
                    <Box>
                        <CommonButton
                            name={"Close"}
                            onClick={handleClose}
                        />
                        <CommonButton
                            name={"Create"}
                            onClick={handleClick}
                        />
                    </Box>
                </Grid>
            </Grid>

        </Modal>
    )
}

export default LeaveModal