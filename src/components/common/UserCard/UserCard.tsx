import React from 'react'
import styles from './UserCard.module.scss'
import { Grid, Box, Typography, List, ListItemButton, ListItemText } from '@mui/material'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import CommonButton from '../CommonButton/CommonButton';
import img from '../../../asserst/images/profile_pic.jpg'
import { RxAvatar } from "react-icons/rx";
import { PiUserCircleLight } from "react-icons/pi";
import { MdEdit, MdOutlineAdd, MdDelete } from "react-icons/md";


export interface IUserCard {
    label: string;
    image?: string;
    name: string;
    email: string;
    IsButton: boolean;
    IsLabel: boolean;
    handleClick?: any
    actionOpen?: boolean;
    handleEdit?: any;
    handleAddSalary?: any;
    handlePayroll?: any;
    handleDelete?: any;
}
const UserCard = ({ label, image, name, email, IsButton, IsLabel, handleClick, actionOpen, handleEdit, handleAddSalary, handlePayroll, handleDelete }: IUserCard) => {
    return (
        <Grid className={styles.userCardContainer}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginInlineEnd: "auto" }}>
                <Typography variant='h5'>{label}</Typography>
                <PiDotsThreeOutlineVerticalDuotone fontSize={20} onClick={handleClick} cursor={"pointer"} />
            </Box>
            <Box>
                {actionOpen ? <>
                    <ListItemButton onClick={handleEdit} sx={{ display: "flex", flexDirection: "column" }}>
                        <ListItemText sx={{ textAlign: "left", }} > <MdEdit fontSize={18} />Edit</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleAddSalary} sx={{ display: "flex", flexDirection: "column" }}>
                        <ListItemText sx={{ textAlign: "left", }} > <MdOutlineAdd fontSize={18} />Add Salart</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleDelete} sx={{ display: "flex", flexDirection: "column" }}>
                        <ListItemText sx={{ textAlign: "left" }} > <MdDelete fontSize={18} />Delete</ListItemText>
                    </ListItemButton>
                </> : ""}

            </Box>

            <Box>
                <Box>
                    {/* <img src={img} alt='img' /> */}
                    <RxAvatar fontSize={90} />
                </Box>
                <Typography variant='h4' align='center'>{name}</Typography>
                <Typography align='center'>{email}</Typography>
                {IsButton ? <CommonButton
                    name={"#EMP00001"} onClick={function (): void {
                        throw new Error('Function not implemented.');
                    }} /> : ""}
            </Box>
        </Grid>
    )
}

export default UserCard;