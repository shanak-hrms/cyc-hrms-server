import React from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import RoutesPage from '../RoutesPage/RoutesPage'
import Sidebar from '../../sidebar/Sidebar'
import { menuData } from '../../sidebar/menuData'
import Heading from '../../../pages/EmpAttendancePage/Heading/Heading'
import NewHeading from '../../NewHeading/NewHeading'

export interface IOverview {
    open: any;
    menu: any;
    handleSidebarMemu: any;
    handleLogout: () => void;
    handleClick: any;
    handleResponsiveMenu?:any
}
const Overview = ({ open, menu, handleSidebarMemu, handleLogout, handleClick,handleResponsiveMenu }: IOverview) => {
    return (
        <Grid className={styles.overviewContainer}>
            <Grid container className={styles.overview}>
                <Grid className={styles.overviewSidebar}>
                    <Sidebar
                        menuData={menuData}
                        handleLogout={handleLogout}
                    />
                </Grid>
                <Grid className={styles.overviewRoutesPage}>
                    {/* <Heading /> */}
                    <NewHeading
                        open={open}
                        handleClickLogout={handleClick}
                        handleLogout={handleLogout}
                        menu={menu}
                        handleSidebarMemu={handleSidebarMemu} 
                        handleResponsiveMenu={handleResponsiveMenu}/>
                    <RoutesPage />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Overview;