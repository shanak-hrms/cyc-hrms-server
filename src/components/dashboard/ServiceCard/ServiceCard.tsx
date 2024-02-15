import React from 'react'
import styles from './ServiceCard.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import { FaUserGroup } from "react-icons/fa6";

export interface IServiceCard {
    heading: string;
    subHeading: any;
    icon: any;
    color?: string;
    bgColor?: string;
}
const ServiceCard = ({ heading, subHeading, icon, color, bgColor }: IServiceCard) => {
    return (
        <Grid className={styles.serviceCardContainer}>
            <Box>
                <Typography fontSize={18} fontWeight={600}>{heading}</Typography>
                <Typography fontSize={22} fontWeight={600} sx={{ color: color }}>{subHeading}</Typography>
            </Box>
            <Box sx={{ backgroundColor: bgColor }}>
                {icon}
            </Box>
        </Grid>
    )
}

export default ServiceCard