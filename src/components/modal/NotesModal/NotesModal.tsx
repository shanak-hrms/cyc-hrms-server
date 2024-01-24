import React from 'react'
import styles from './NotesModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { FaHandPointRight } from "react-icons/fa";

export interface INotesModal {
    open: boolean;
    heading: string;
    handleClose: any;
    noteValue: any;
    noteData: any
    handleChange: any;
    handleClick: any;
}
const NotesModal = ({ open, heading, handleClose, noteValue, noteData, handleChange, handleClick }: INotesModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: "fit-content", margin: "auto" }}
        >
            <Grid className={styles.termsConditionModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                {noteData?.map((item: any) => {
                    return (
                        <Box display={"flex"} sx={{ marginBlock: 1, borderBlockEnd: "1px solid #58024B" }}>
                            <FaHandPointRight fontSize={25} style={{ color: "#58024B" }} />
                            <Typography sx={{ paddingInlineStart: 2 }}>{item.note}</Typography>
                        </Box>
                    )
                })}
                <Grid className={styles.termDetails}>
                    <InputField
                        label={''}
                        name={'note'}
                        placeholder={'Write terms and conditions hare.'}
                        value={noteValue.note}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <CommonButton name={"Add New Term"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default NotesModal