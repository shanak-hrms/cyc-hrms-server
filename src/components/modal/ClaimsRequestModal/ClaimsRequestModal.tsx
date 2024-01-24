import React from 'react'
import styles from './ClaimsRequestModal.module.scss'
import { Grid, Modal, Box, Typography, Divider } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import TextEditer from '../../TextEditer/TextEditer';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IClaimsRequestModal {
    open: boolean;
    heading:string;
    empId: string;
    name: string;
    buttonName:string;
    inputData: any;
    handleClose: any;
    handleChange: any;
    handleChangefile:any
    handleClick: any;
    handleChengeMessage: any
}
const ClaimsRequestModal = ({ open, heading, empId, name,buttonName, inputData, handleClose, handleChange,handleChangefile,handleClick, handleChengeMessage }: IClaimsRequestModal) => {
    const handleChengeText = () => {

    }
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: 'fit-content', margin: "auto" }}
        >
            <Grid className={styles.claimsRequestContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={22}>{heading}</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.claimsRequest}>
                    <Grid>
                        <Typography>Id: {empId}</Typography>
                        <Typography>Name: {name}</Typography>
                    </Grid>
                    <InputField
                        label={'Claim Type'}
                        name={'claimsType'}
                        placeholder={'claimsType'}
                        value={inputData.claimsType}
                        handleChange={handleChange}
                        type={"undefined"}
                    />
                    <TextEditer
                        heading='Message'
                        placeholder='Write message...'
                        onChange={handleChengeMessage}
                    />
                    <InputField
                        label={'Attachment'}
                        name={'attachment'}
                        placeholder={''}
                        value={inputData.attachment}
                        handleChange={handleChangefile}
                        type={"file"}
                    />
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