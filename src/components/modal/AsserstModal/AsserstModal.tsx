import React from 'react'
import styles from './AsserstModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IAsserstModal {
    open: boolean;
    asserstVal: any;
    handleChange: any;
    handleClickAssets: any;
    handleClose: any;

}
const AsserstModal = ({ open, asserstVal, handleChange, handleClickAssets, handleClose }: IAsserstModal) => {
    return (
        <Modal
            open={open}
            className={styles.asserstModalContainer}
        >
            <Grid className={styles.asserstModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={25} fontWeight={500}>Assign Assets</Typography>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.asserst}>
                    <InputField
                        label={'Name'}
                        name={'name'}
                        placeholder={''}
                        value={asserstVal.name}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Date'}
                        name={'date'}
                        placeholder={''}
                        value={asserstVal.date}
                        handleChange={handleChange}
                        type={"date"}
                    />
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} />
                    <CommonButton name={"Submit"} onClick={handleClickAssets} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AsserstModal