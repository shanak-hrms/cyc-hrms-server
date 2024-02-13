import React, { useEffect, useState } from 'react'
import styles from './NewHeading.module.scss'
import { Box, Grid, ListItemButton, ListItemText, Typography } from '@mui/material'
import { FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";



export interface INewHeading {
    open: any;
    menu?: any;
    handleMemuToggal?: any
    handleClick: any;
    handleLogout: any;
}
const NewHeading = ({ open, menu, handleMemuToggal, handleClick, handleLogout }: INewHeading) => {
    const [userName, setUserName] = useState('')
    useEffect(() => {
        const userName: any = localStorage.getItem("userName")
        setUserName(userName)

    }, [])
    return (
        <Grid className={styles.newHeadingContainer}>
            <Grid className={styles.newHeading}>
                <Box>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleMemuToggal} />
                </Box>
                <Box>
                    <Typography variant='h5' fontSize={18} fontWeight={600}>Hey, <span>{userName}</span></Typography>
                </Box>
                <Box>
                    <FaUserCircle fontSize={41} cursor={"pointer"} onClick={handleClick} />
                </Box>
            </Grid>
            {open &&
                <Grid className={styles.headingMenu}>
                    {/* <ListItemButton>
                        <ListItemText>Profile</ListItemText>
                    </ListItemButton> */}
                    <ListItemButton onClick={handleLogout}>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </Grid>

            }
            <>
                {menu &&
                    <Grid className={styles.headingMenu}>
                        {/* <ListItemButton>
                        <ListItemText>Profile</ListItemText>
                    </ListItemButton> */}
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText>Logout</ListItemText>
                        </ListItemButton>
                    </Grid>
                    }
            </>

        </Grid>
    )
}

export default NewHeading