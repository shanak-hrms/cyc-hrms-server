import React from 'react'
import styles from './StatusModal.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import SelectField from '../../SelectField/SelectField'

export interface IStatusModal {
    statusVal: any;
    handleChange: any;
    handleClick: any;
}
const StatusModal = ({ statusVal, handleChange, handleClick }: IStatusModal) => {
    const leadStatus = ["Closed", "Open", "Cold", "Hot"]
    return (
        <Grid className={styles.statusModal}>
            <SelectField
                title={''}
                data={leadStatus}
                option={statusVal.leadStatus}
                name={'leadStatus'}
                handleChange={handleChange}
                handleClick={handleClick}
            />
        </Grid>
    )
}

export default StatusModal