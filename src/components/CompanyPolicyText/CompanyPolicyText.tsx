import React from 'react'
import styles from './CompanyPolicyText.module.scss'
import { Grid, Typography } from '@mui/material';

export interface ICompanyPolicyText {
    name: string;
    data: any;
}
const CompanyPolicyText = ({ name, data }: ICompanyPolicyText) => {
    return (
        <Grid className={styles.companyPolicyText}>
            <Typography variant='h5' fontSize={22} fontWeight={500}>{name}:</Typography>
            {data && data.map((item: any) => {
                return (
                    <Typography> {item.id}.  {item.label}</Typography>
                )
            })}
        </Grid>
    )
}

export default CompanyPolicyText;