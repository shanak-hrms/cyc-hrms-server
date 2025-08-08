import React, { useEffect, useState } from 'react'
import { Grid, Box, MenuList, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logo from '../../asserst/images/CYC logo-01.png'
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbPoint } from "react-icons/tb";

import axios from 'axios'
import { baseURL } from '../../utils/baseURL'

export interface ISidebar {
    menuData: any;
    handleResponsiveMenu?: any;
    handleLogout: any;
}

const Sidebar = ({ menuData, handleLogout, handleResponsiveMenu }: ISidebar) => {
    const [show, setShow] = useState(false);
    const [hrmsLogo, setHRMSLogo] = useState<{ logoUrl?: string; altText?: string } | undefined>(undefined);
    const [role, setRole] = useState<string | null>('')
    const [userRole, setUserRole] = useState("HR");
    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleMenu = async () => {
        try {
            if (path === '/pay-slip-form' || path === '/salary-calculation') {
                setShow(true);
            } else {
                setShow(!show);
            } 
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const userRole = localStorage.getItem("userRole")
        setRole(userRole)

    }, []);

    const loadLogo = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/get-logo`);
            if (response.status === 200) {
                const data = response?.data?.data || { logoUrl: "", "altText": "HRMS" };
                setHRMSLogo(data)
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    useEffect(() => {
        loadLogo()
    }, []);

    return (
        <Grid className={styles.sidebarContainer}>
            <Box>
                <img src={hrmsLogo?.logoUrl || logo} alt={hrmsLogo?.altText || 'logo'} />
            </Box>

            <Grid>
                {menuData.map((item: any) => {
                    return (
                        <Grid key={item.id} className={styles.sidebarMenu}>
                            <MenuList onClick={handleResponsiveMenu}>
                                <MenuList onClick={item.subMenu && item.subMenu.length > 0 ? handleMenu : () => navigation(item.link)} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                                    <MenuItem>  {item.icon}{item.title} {item.subMenu && item.subMenu.length > 0 ? <MdKeyboardArrowDown style={{ backgroundColor: "transparent", boxShadow: "unset" }} /> : ""}</MenuItem>
                                    {show && <>
                                        {item.subMenu?.map((item: any) => {
                                            return (
                                                <MenuList onClick={() => navigation(item.link)} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                                                    <MenuItem className={styles.subMenu}> <TbPoint /> {item.title}</MenuItem>
                                                </MenuList>
                                            )
                                        })}
                                    </>}
                                </MenuList>
                            </MenuList>
                        </Grid>
                    )
                })}

                <Grid className={styles.sidebarMenu}>
                    <MenuList onClick={handleResponsiveMenu}>
                        <MenuList onClick={() => navigation("/application-logo")} className={path == "" ? styles.activeMenu : styles.inActiveMenu}>
                            <MenuList className={path =="" ? styles.activeMenu : styles.inActiveMenu}>
                                <MenuItem className={styles.subMenu}> <TbPoint />LOGO</MenuItem>
                            </MenuList>
                        </MenuList>
                    </MenuList>
                </Grid>
                 <Grid className={styles.sidebarMenu}>
                    <MenuList onClick={handleResponsiveMenu}>
                        <MenuList onClick={() => navigation("/application-company-policy")} className={path == "" ? styles.activeMenu : styles.inActiveMenu}>
                            <MenuList className={path =="" ? styles.activeMenu : styles.inActiveMenu}>
                                <MenuItem className={styles.subMenu}> <TbPoint />Company Policy</MenuItem>
                            </MenuList>
                        </MenuList>
                    </MenuList>
                </Grid>
                 <Grid className={styles.sidebarMenu}>
                    <MenuList onClick={handleResponsiveMenu}>
                        <MenuList onClick={() => navigation("/application-leave-policy")} className={path == "" ? styles.activeMenu : styles.inActiveMenu}>
                            <MenuList className={path =="" ? styles.activeMenu : styles.inActiveMenu}>
                                <MenuItem className={styles.subMenu}> <TbPoint />Leave Policy</MenuItem>
                            </MenuList>
                        </MenuList>
                    </MenuList>
                </Grid>
            </Grid>
            <Grid className={styles.logout}>
                <Box display={"flex"} sx={{ paddingInline: 2, paddingBlockEnd: 1 }} >
                    <Typography fontSize={14} sx={{ cursor: "pointer", "&:hover": { color: "#68C5AE" } }} onClick={(() => navigation('/company-policy'))}>*Company policy</Typography>
                    <Typography fontSize={14} sx={{ cursor: "pointer", "&:hover": { color: "#68C5AE" } }} paddingInlineStart={1}
                        onClick={(() => navigation('/leave-policy'))}>*Leave policy</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Sidebar;