import React from 'react'
import styles from './LeadManagementModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../inputField/InputField';
import SelectField from '../../SelectField/SelectField';
import CommonButton from '../../common/CommonButton/CommonButton';
import TextEditer from '../../TextEditer/TextEditer';

export interface ILeadManagementModal {
    open: boolean;
    heading: string;
    inputData: any;
    handleChange: any;
    handleChangeText: any;
    handleClose: any;
    handleClick: any;
}
const LeadManagementModal = ({ open, heading, inputData, handleChange, handleChangeText, handleClose, handleClick }: ILeadManagementModal) => {
    const data = {
        "leadType": ["Corporate", "TMC"],
        "leadStatus": ["Closed", "Open", "Cold", "Hot", "Warm", "Lost"],
        "businessleadType": ["Event", "Room"],
        "leadFrom": ["Direct", "Vendor"]
    }
    console.log(inputData, 'inputData...')

    return (
        <Modal
            open={open}
            className={styles.leadManagementModalContainer}
        >
            <Grid className={styles.leadManagementModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.leadManagement}>
                    <InputField
                        label={'Lead Name'}
                        name={'leadName'}
                        placeholder={'Enter lead name'}
                        value={inputData?.leadName}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <Box>
                        <SelectField
                            title={'Lead Type'}
                            data={data?.leadType}
                            option={inputData.leadType}
                            name={'leadType'}
                            handleChange={handleChange}
                        />

                        <SelectField
                            title={'Lead Status'}
                            data={data?.leadStatus}
                            option={inputData.leadStatus}
                            name={'leadStatus'}
                            handleChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <InputField
                            label={'Open Date'}
                            name={'openDate'}
                            placeholder={'Write lead name hare..'}
                            value={inputData.openDate}
                            handleChange={handleChange}
                            type={"date"}
                        />
                        <InputField
                            label={'Close Date'}
                            name={'closeDate'}
                            placeholder={'Write lead name hare..'}
                            value={inputData.closeDate}
                            handleChange={handleChange}
                            type={"date"}
                        />
                    </Box>
                </Grid>
                <Grid>
                    <TextEditer
                        heading='Lead Description'
                        placeholder="Write lead description..."
                        onChange={handleChangeText}
                        width={420}
                        height={125}
                    />
                </Grid>
                <Grid className={styles.leadBusiness}>
                    <Box>
                        <SelectField
                            title={'Business Type'}
                            data={data.businessleadType}
                            option={inputData?.business?.type}
                            name={'business.type'}
                            handleChange={handleChange}
                        />
                        <SelectField
                            title={'Business Source'}
                            data={data.leadFrom}
                            option={inputData?.business?.source}
                            name={'business.source'}
                            handleChange={handleChange}
                        />
                    </Box>
                    {inputData?.business?.source === "Direct" ? "" :
                        <>
                            <Box>
                                <InputField
                                    label={'Vender Name'}
                                    name={'business.vendorName'}
                                    placeholder={'Enter vender name'}
                                    value={inputData?.business?.vendorName}
                                    handleChange={handleChange}
                                    type={"text"}
                                />
                                <InputField
                                    label={'Vender Mobile'}
                                    name={'business.vendorMobile'}
                                    placeholder={'Enter vender mobile'}
                                    value={inputData?.business?.vendorMobile}
                                    handleChange={handleChange}
                                    type={"text"}
                                />
                            </Box>
                            <Box>
                                <InputField
                                    label={'Vender Email'}
                                    name={'business.vendorEmail'}
                                    placeholder={'Enter vender email'}
                                    value={inputData?.business?.vendorEmail}
                                    handleChange={handleChange}
                                    type={"text"}
                                />
                                <InputField
                                    label={'Vender Address'}
                                    name={'business.vendorAddress'}
                                    placeholder={'Enter vender address'}
                                    value={inputData?.business?.vendorAddress}
                                    handleChange={handleChange}
                                    type={"text"}
                                />
                            </Box>
                            <Box>
                                <InputField
                                    label={'Business Value'}
                                    name={'business.businessValueBooked'}
                                    placeholder={'Enter business value'}
                                    value={inputData?.business?.businessValueBooked}
                                    handleChange={handleChange}
                                    type={"number"}
                                />
                                <InputField
                                    label={'Business Cost'}
                                    name={'business.businessCost'}
                                    placeholder={'Enter business cost'}
                                    value={inputData?.business?.businessCost}
                                    handleChange={handleChange}
                                    type={"number"}
                                />
                            </Box>
                            <InputField
                                label={'Profit Amount'}
                                name={'business.profitAmount'}
                                placeholder={'Enter profit amount'}
                                value={inputData?.business?.profitAmount}
                                handleChange={handleChange}
                                type={"number"}
                            />
                        </>}
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal >
    )
}

export default LeadManagementModal;