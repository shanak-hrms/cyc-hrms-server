import React, { useEffect, useState } from 'react'
import { Grid, Box, MenuList, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logo from '../../asserst/images/LOGO CYC.jpg'

const Sidebar = ({ menuData, handleLogout }: any) => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState<string | null>('')

    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleMenu = () => {
        setShow(!show)
    }
    useEffect(() => {
        const userRole = localStorage.getItem("userRole")
        setRole(userRole)

    }, [])
    return (
        <Grid className={styles.sidebarContainer}>
            <Box>
                <img src={logo} alt='logo' />
            </Box>
            {menuData.map((item: any) => {
                return (
                    <Grid key={item.id} className={styles.sidebarMenu}>
                        <MenuList onClick={item.subMenu && item.subMenu.length > 0 ? handleMenu : () => navigation(item.link)} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                            <MenuItem>  {item.icon}{item.title}</MenuItem>
                            {show && <>
                                {item.subMenu?.map((item: any) => {
                                    return (
                                        <MenuList onClick={() => navigation(item.link)} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                                            <MenuItem>  {item.icon}{item.title}</MenuItem>
                                        </MenuList>
                                    )
                                })}
                            </>}
                        </MenuList>
                    </Grid>
                )
            })}
            <Grid className={styles.logout}>
                <MenuList onClick={handleLogout}>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Grid>
        </Grid>
    )
}

export default Sidebar;