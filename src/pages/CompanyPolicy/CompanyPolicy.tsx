import React from 'react'
import styles from './CompanyPolicy.module.scss'
import { Grid, Typography } from '@mui/material'
import CompanyPolicyText from '../../components/CompanyPolicyText/CompanyPolicyText'
import data from './data.json'

const CompanyPolicy = () => {
    return (
        <Grid className={styles.companyPolicyContainer}>
            <Typography variant='h5' fontSize={25} fontWeight={600} textAlign={"center"}>Company Policy and Regulations:</Typography>
            <CompanyPolicyText
                name='Attendance'
                data={data.Attendance}
            />
            <CompanyPolicyText
                name='Probation Period'
                data={data.ProbationPeriod}
            />
            <CompanyPolicyText
                name='Performance & screening tools'
                data={data.Performance}
            />
            <CompanyPolicyText
                name='Office timing'
                data={data.Officetiming}
            />
            <Typography sx={{ fontFamily: "italic", fontWeight: 600 }}>** Work timing may vary as per the requirement</Typography>
            <CompanyPolicyText
                name='Dress Code'
                data={data.DressCode}
            />
            <Typography sx={{ fontFamily: "italic", fontWeight: 600 }}>** Any violation of the code will lead to strict actions</Typography>

            <CompanyPolicyText
                name='Zero tolerance policy'
                data={data.Zerotolerancepolicy}
            />
            <CompanyPolicyText
                name='Holidays'
                data={data.Holidays}
            />
            <Typography sx={{ fontFamily: "italic", fontWeight: 600 }}>** Any otherleave taken will be evaluated first on few parameters & then decisions would be made</Typography>

            <CompanyPolicyText
                name='Grievance management'
                data={data.Grievance}
            />
        </Grid>
    )
}

export default CompanyPolicy