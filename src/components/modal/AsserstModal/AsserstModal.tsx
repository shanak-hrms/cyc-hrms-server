import React from 'react'
import styles from './AsserstModal.module.scss'
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';



export interface IAsserstModal {
    open: boolean;
    asserstVal: any;
    assets: any;
    handleAdd: any;
    handleDeleteAssets: any;
    handleChange: any;
    handleClickAssets: any;
    handleClose: any;

}
const AsserstModal = ({ open, asserstVal, assets, handleAdd, handleDeleteAssets, handleChange, handleClickAssets, handleClose }: IAsserstModal) => {
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
                <Grid className={styles.asserstContainer}>
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
                    <Button onClick={handleAdd}>Add</Button>
                    {assets && assets.map((item: any, idx: number) => {
                        return (
                            <Grid className={styles.history} display={"flex"} justifyContent={"space-between"}>
                                <Typography>Name: {item.name}</Typography>
                                <Typography>Date: {item.date}</Typography>
                                <IoMdClose fontSize={22} style={{ color: "#E91E63" }} onClick={() => handleDeleteAssets(idx)} />
                            </Grid>
                        )
                    })}
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