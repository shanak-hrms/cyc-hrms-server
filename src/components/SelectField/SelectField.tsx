import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, Typography } from '@mui/material'
import styles from './SelectField.module.scss'

export interface ISelectField {
    title: string;
    data: any;
    option: any;
    name: string;
    handleChange: any
    handleClick?: any;

}
const SelectField = ({ title, data, option, name, handleChange, handleClick }: ISelectField) => {


    return (
        <Grid className={styles.selectFieldContainer}>
            <FormControl sx={{ m: 1, minWidth: 120 }} >
                <Typography>{title}</Typography>
                <Select
                    value={option}
                    name={name}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {data.map((item: any, idx: number) => {
                        return (
                            <MenuItem key={idx} value={item} onClick={handleClick}>{item}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Grid>
    );
}

export default SelectField;