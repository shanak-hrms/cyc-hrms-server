import React, { useEffect, useState } from 'react'
import styles from './NewHeading.module.scss'
import { Box, Grid, ListItemButton, ListItemText, Typography } from '@mui/material'
import { FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";
import Sidebar from '../sidebar/Sidebar';
import { menuData } from '../../components/sidebar/menuData'

export interface INewHeading {
    open: any;
    menu?: any;
    menuData: any;
    handleSidebarMemu?: any
    handleClickLogout?: any;
    handleLogout: any;
    handleResponsiveMenu?: any;
}
const NewHeading = ({ open, menu, menuData, handleSidebarMemu, handleClickLogout, handleLogout, handleResponsiveMenu }: INewHeading) => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const userName: any = localStorage.getItem("userName")
        setUserName(userName)

    }, [])
    return (
        <Grid className={styles.newHeadingContainer}>
            <Grid className={styles.newHeading}>
                <Grid className={styles.headingMenuOne}>
                    <FiAlignJustify fontSize={32} cursor={"pointer"} onClick={handleSidebarMemu} />
                </Grid>
                <Grid className={styles.headingName}>
                    <Typography variant='h5' fontSize={18} fontWeight={600}>Hey, <span>{userName}</span></Typography>
                </Grid>
                <Grid className={styles.headinglogout}>
                    <FaUserCircle fontSize={41} cursor={"pointer"} onClick={handleClickLogout} />
                </Grid>
            </Grid>
            {open &&
                <Grid className={styles.headingMenu}>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </Grid>

            }
            <>
                {menu &&
                    <Grid className={styles.headingSidebarMenu}>
                        <Sidebar menuData={menuData} handleLogout={undefined} handleResponsiveMenu={handleResponsiveMenu} />
                    </Grid>
                }
            </>

        </Grid>
    )
}

export default NewHeading