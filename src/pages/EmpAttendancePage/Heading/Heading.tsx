import React, { useEffect, useState } from 'react'
import styles from './Heading.module.scss'
import { Grid, Box, Typography, Button } from '@mui/material'
import img from '../../../asserst/images/profile_pic.jpg'
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingNotification from '../../../components/heading/headingNotification/HeadingNotification';
import { useLocation } from 'react-router-dom';
import { LuAlignJustify } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from '../../../components/sidebar/Sidebar';
import { menuData } from '../menuData';

export interface IHeading {
    handleCheckIn?: any;
    handleCheckOut?: any;
    IsAction?: boolean;
    menu?: boolean;
    handleClick?: () => void;
    handleResponsiveMenu?: any;
}
const Heading = ({ handleCheckIn, handleCheckOut, IsAction, menu, handleClick, handleResponsiveMenu }: IHeading) => {
    const location = useLocation();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [date, setDate] = useState<any>('');
    const [headingName, setHeadingName] = useState<any>('');

    const path = location.pathname;

    useEffect(() => {
        const today = new Date();
        const formatedDate = today.toDateString();
        setDate(formatedDate);

        const userName = localStorage.getItem('userName')
        if (userName) {
            setHeadingName(userName)
        } else {
            console.log('No logined user found');
        }

    }, []);
    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Grid container className={styles.headingContainer}>
            <Grid >
                <Box>
                    {typeof window !== 'undefined' && window.innerWidth && window.innerWidth < 480 ? <LuAlignJustify fontSize={35} onClick={handleClick} /> : <>{img && <img src={img} alt='img' />}</>}

                </Box>
                <Box>
                    {headingName && <Typography variant='h4' fontWeight={600} fontSize={25}>Hi, {headingName}</Typography>}
                    {date && <Typography fontSize={15}>{date}</Typography>}
                </Box>
                <Box>
                    <FaUserCircle fontSize={28} />
                </Box>
            </Grid>
            <Grid >
                {IsAction
                    ?
                    <Box>
                        {path === "/attendance" ?
                            <>
                                <CommonButton name={"Check In"} onClick={handleCheckIn} />
                                <CommonButton name={"Check Out"} onClick={handleCheckOut} />
                            </>
                            :
                            ""}
                    </Box> :

                    <Box>
                        {typeof window !== 'undefined' && window.innerWidth && window.innerWidth < 480 ? <img src='' /> : <HeadingNotification />}
                    </Box>
                }
            </Grid>
            <Grid className={styles.responsiveMenu}>
                {menu && <Sidebar
                    menuData={menuData}
                    handleLogout={undefined}
                    handleResponsiveMenu={handleResponsiveMenu}
                />}
            </Grid>
        </Grid>
    )
}

export default Heading