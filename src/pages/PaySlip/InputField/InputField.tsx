import React from 'react'
import styles from './InputField.module.scss'
import { Grid, TextField, Typography } from '@mui/material'

function InputField() {
    return (
        <Grid className={styles.inputFieldContainer}>
            <Typography variant='h5' fontSize={16} fontWeight={600}>Employee Name : </Typography>
            <TextField variant="standard" />
        </Grid>
    )
}

export default InputField