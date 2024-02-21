import React, { useEffect, useState } from 'react'
import { Grid, Box, MenuList, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logo from '../../asserst/images/CYC logo-01.png'
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbPoint } from "react-icons/tb";
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbCalendarTime } from "react-icons/tb";
import { MdOutlineManageHistory, MdOutlineEventNote } from "react-icons/md";
import { PiNote, PiNotePencilFill } from "react-icons/pi";

export interface ISidebar {
    menuData: any;
    handleResponsiveMenu?: any;
    handleLogout: any;
}

const Sidebar = ({ menuData, handleLogout, handleResponsiveMenu }: ISidebar) => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState<string | null>('')
    const [userRole, setUserRole] = useState("HR");

    // const menuData2 = [
    //     {
    //         "id": 1,
    //         "icon": <AiOutlineHome />,
    //         "title": "Dashboard",
    //         "link": "/"
    //     },
    //     {
    //         "id": 2,
    //         "icon": <AiOutlineTeam />,
    //         "title": "Staff",
    //         "link": "/staff"
    //     },
    //     {
    //         "id": 4,
    //         "icon": <TbCalendarTime />,
    //         "title": "Attandance",
    //         "link": "/attandance",
    //     },
    //     {
    //         "id": 5,
    //         "icon": <PiNote />,
    //         "title": "Manage Leave",
    //         "link": "/manage-leave",
    //     },
    //     {
    //         "id": 6,
    //         "icon": <PiNotePencilFill />,
    //         "title": "Request",
    //         "link": "/request",
    //     },
    //     {
    //         "id": 7,
    //         "icon": <MdOutlineManageHistory />,
    //         "title": "Lead Management",
    //         "link": "/lead-management",
    //     },
    //     {
    //         "id": 8,
    //         "icon": <MdOutlineEventNote />,
    //         "title": role === "HR" ? "Payroll Management" : "Pay Slip",
    //         "link": role === "HR" ? "/pay-slip" : "/manager-pay-slip",
    //     }
    // ]

    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleMenu = async () => {
        console.log("menu")
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

    }, [])
    return (
        <Grid className={styles.sidebarContainer}>
            <Box>
                <img src={logo} alt='logo' />
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
            </Grid>
            <Grid className={styles.logout}>
                <Box display={"flex"} sx={{ paddingInline: 2, paddingBlockEnd: 1 }} >
                    <Typography fontSize={14} sx={{ cursor: "pointer", "&:hover": { color: "#68C5AE" } }} onClick={(() => navigation('/company-policy'))}>*Company policy</Typography>
                    <Typography fontSize={14} sx={{ cursor: "pointer", "&:hover": { color: "#68C5AE" } }} paddingInlineStart={1}
                        onClick={(() => navigation('/leave-policy'))}>*Leave policy</Typography>
                </Box>
                {/* <MenuList onClick={handleLogout}>
                    <MenuItem>Version: 3.0.3</MenuItem>
                </MenuList> */}
            </Grid>
        </Grid>
    )
}

export default Sidebar;