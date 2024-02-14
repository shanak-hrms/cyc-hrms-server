import React, { ChangeEvent } from 'react'
import styles from './InputField.module.scss'
import { Grid, Box, TextField, Typography } from '@mui/material'

export interface IInputField {
    IsRequire?: any
    label: string;
    name: string;
    placeholder: string;
    value: string;
    handleChange: any;
    type: any;
}
const InputField = ({ IsRequire, label, name, type, placeholder, value, handleChange }: IInputField) => {
    return (
        <Grid className={styles.inputFieldContainer}>
            <Typography>{label}</Typography>
            {IsRequire ? <Grid className={styles.required}>
                <Typography><span style={{ color: "red" }}>*</span>Require this field</Typography>
            </Grid> : ""}

            <TextField type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange} />
        </Grid>
    )
}

export default InputField;