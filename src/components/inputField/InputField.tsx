import React, { ChangeEvent } from 'react'
import styles from './InputField.module.scss'
import { Grid, Box, TextField, Typography } from '@mui/material'

export interface IInputField {
    IsRequire?: any;
    label: string;
    name: string;
    value: any;
    handleChange: any;
    placeholder?: string;
    type?: string;
    options?: { label: string; value: string }[];
    select?: boolean;
    disabled?: boolean;
}
const InputField = ({ IsRequire, label, name, type, placeholder, value, handleChange ,disabled=false}: IInputField) => {
    return (
        <Grid className={styles.inputFieldContainer}>
            <Typography>{label}</Typography>
            {IsRequire ? <Grid className={styles.required}>
                <Typography><span style={{ color: "red" }}>*</span>Require this field</Typography>
            </Grid> : ""}

            <TextField type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange}   disabled={disabled}/>
        </Grid>
    )
}

export default InputField;