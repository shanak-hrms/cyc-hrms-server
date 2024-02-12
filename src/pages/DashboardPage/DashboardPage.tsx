import React, { Fragment, useEffect, useState } from 'react'
import styles from './DashboardPage.module.scss'
import Dashboard from '../../components/dashboard/Dashboard'
import CustomLoader from '../../components/CustomLoader/CustomLoader'
import axios from 'axios'
import { Grid } from '@mui/material'

const DashboardPage = () => {
    const [loading, setLoading] = useState(false)

    return (
        <Grid className={styles.dashboard}>
            {loading ?
                <CustomLoader />
                :
                <Dashboard />
            }
        </Grid>
    )
}

export default DashboardPage