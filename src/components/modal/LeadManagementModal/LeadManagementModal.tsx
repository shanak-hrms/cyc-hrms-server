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
        "leadType": [
            {
                "id": 1,
                "label": "Carporate"
            },
            {
                "id": 2,
                "label": "TMC"
            }
        ],
        "leadStatus": [
            {
                "id": 1,
                "label": "Closed "
            },
            {
                "id": 2,
                "label": "Open"
            },
            {
                "id": 3,
                "label": "Hot"
            },
            {
                "id": 4,
                "label": "Cold"
            }
        ]
    }
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: 'fit-content', margin: 'auto' }}
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
                        placeholder={'Write lead name hare..'}
                        value={inputData.leadName}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <Box>
                        <SelectField
                            title={'Lead Type'}
                            data={data.leadType}
                            option={inputData.leadType}
                            name={'leadType'}
                            handleChange={handleChange}
                        />
                        <SelectField
                            title={'Lead Status'}
                            data={data.leadStatus}
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
                        onChange={handleChangeText}
                    />
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal >
    )
}

export default LeadManagementModal;