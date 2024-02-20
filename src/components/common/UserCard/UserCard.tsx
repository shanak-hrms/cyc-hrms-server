import React from 'react'
import styles from './UserCard.module.scss'
import { Grid, Box, Typography, ListItemButton, ListItemText } from '@mui/material'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import CommonButton from '../CommonButton/CommonButton';
import { RxAvatar } from "react-icons/rx";
import { MdEdit, MdOutlineAdd, MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { RiFileEditFill } from "react-icons/ri";

import { MdChangeCircle } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdLaptopChromebook } from "react-icons/md";






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
    handleProfile?: any;
    handleAssignModal?: any
    handleAsserstModal?: any;
    handleChangeRoleModal?: any;
}
const UserCard = ({ label, name, email, IsButton, handleClick, actionOpen, handleEdit, handleAddSalary, handleDelete, handleProfile, handleAssignModal, handleAsserstModal, handleChangeRoleModal }: IUserCard) => {

    return (
        <Grid className={styles.userCardContainer}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginInlineEnd: "auto" }}>
                <Typography variant='h5'>{label}</Typography>
                <PiDotsThreeOutlineVerticalDuotone fontSize={20} onClick={handleClick} cursor={"pointer"} />
            </Box>
            <Box>
                {actionOpen ? <>
                    <ListItemButton onClick={handleEdit} >
                        <RiFileEditFill fontSize={18} style={{ marginInlineEnd: 2, color: "#0000FF" }} />
                        <ListItemText sx={{ textAlign: "left", }} > Edit Emp...</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleAddSalary} >
                        <HiOutlinePlusCircle fontSize={18} style={{ marginInlineEnd: 2, color: "#0000FF" }} />
                        <ListItemText sx={{ textAlign: "left", }} > Add Salary</ListItemText>
                    </ListItemButton>
                    {label === "MANAGER"
                        ?
                        <ListItemButton onClick={handleAssignModal} >
                            <FaUserPlus fontSize={18} style={{ marginInlineEnd: 2, color: "#0000FF" }} />
                            <ListItemText sx={{ textAlign: "left", }} > Assign Emp..</ListItemText>
                        </ListItemButton> :
                        ""
                    }
                    <ListItemButton onClick={handleAsserstModal} >
                        <MdLaptopChromebook fontSize={18} style={{ marginInlineEnd: 2, color: "#0000FF" }} />
                        <ListItemText sx={{ textAlign: "left", }} > Assign assets</ListItemText>
                    </ListItemButton>

                    <ListItemButton onClick={handleChangeRoleModal} >
                        <MdChangeCircle fontSize={18} style={{ marginInlineEnd: 2, color: "#0000FF" }} />
                        <ListItemText sx={{ textAlign: "left", }} > Change Role</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleDelete} >
                        <MdDelete fontSize={18} style={{ marginInlineEnd: 2, color: "#FF0000" }} />
                        <ListItemText sx={{ textAlign: "left", }} > Delete</ListItemText>
                    </ListItemButton>
                </> : ""}

            </Box>
            <Box onClick={handleProfile}>
                <Box>
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