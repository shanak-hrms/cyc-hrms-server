import React from 'react'
import styles from './ClaimsRequestModal.module.scss'
import { Grid, Modal, Box, Typography, Divider } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import TextEditer from '../../TextEditer/TextEditer';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IClaimsRequestModal {
    open: boolean;
    heading: string;
    buttonName: string;
    inputData: any;
    handleClose: any;
    handleChange: any;
    handleClick: any;
    handleChengeMessage: any
}
const ClaimsRequestModal = ({ open, heading, buttonName, inputData, handleClose, handleChange, handleClick, handleChengeMessage }: IClaimsRequestModal) => {

    return (
        <Modal
            open={open}
            className={styles.claimsRequestContainer}
        >
            <Grid className={styles.claimsRequest}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={22}>{heading}</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.claimsField}>
                    <Box>
                        <InputField
                            label={'Claim Name'}
                            name={'claimName'}
                            placeholder={'please enter name'}
                            value={inputData.claimName}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Claim Amount'}
                            name={'claimAmount'}
                            placeholder={'please enter amount'}
                            value={inputData.claimAmount}
                            handleChange={handleChange}
                            type={"number"}
                        />
                    </Box>
                    <Box>
                        <TextEditer
                            heading='Message'
                            placeholder='Write message...'
                            onChange={handleChengeMessage}
                        />
                    </Box>
                    <Box>
                        <CommonButton
                            name={"Close"}
                            onClick={handleClose}
                        />
                        <CommonButton
                            name={buttonName}
                            onClick={handleClick}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ClaimsRequestModal