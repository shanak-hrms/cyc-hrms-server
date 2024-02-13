import React, { useEffect, useState } from 'react'
import styles from './NewHeading.module.scss'
import { Box, Grid, ListItemButton, ListItemText, Typography } from '@mui/material'
import { FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";
import Sidebar from '../sidebar/Sidebar';
import { menuData } from '../../pages/EmpAttendancePage/menuData';




export interface INewHeading {
    open: any;
    menu?: any;
    handleClickMemu?: any
    handleClick: any;
    handleLogout: any;
}
const NewHeading = ({ open, menu, handleClickMemu, handleClick, handleLogout }: INewHeading) => {
    const [userName, setUserName] = useState('')
    useEffect(() => {
        const userName: any = localStorage.getItem("userName")
        setUserName(userName)

    }, [])
    return (
        <Grid className={styles.newHeadingContainer}>
            <Grid className={styles.newHeading}>
                <Grid className={styles.menuToggal}>
                    <FiAlignJustify fontSize={32} cursor={"pointer"} onClick={handleClickMemu} />
                </Grid>
                <Grid>
                    <Typography variant='h5' fontSize={18} fontWeight={600}>Hey, <span>{userName}</span></Typography>
                </Grid>
                <Grid>
                    <FaUserCircle fontSize={41} cursor={"pointer"} onClick={handleClick} />
                </Grid>
            </Grid>
            {open &&
                <Grid className={styles.headingMenu}>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </Grid>

            }
            {/* <>
                {open &&
                    <Grid className={styles.headingMenuOne}>
                        <Sidebar menuData={menuData} handleLogout={undefined} />
                    </Grid>
                }
            </> */}

        </Grid>
    )
}

export default NewHeading