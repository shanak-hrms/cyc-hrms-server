import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, Typography } from '@mui/material'
import styles from './SelectField.module.scss'

export interface ISelectField {
    IsRequire?: any
    title: string;
    data: any;
    option: any;
    name: string;
    handleChange: any
    handleClick?: any;

}
const SelectField = ({IsRequire, title, data, option, name, handleChange, handleClick }: ISelectField) => {


    return (
        <Grid className={styles.selectFieldContainer}>
            <FormControl  >
                <Typography>{title}</Typography>
                {IsRequire ? <Grid className={styles.required}>
                    <Typography><span style={{ color: "red" }}>*</span>Require this field</Typography>
                </Grid> : ""}

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