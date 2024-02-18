import React from 'react'
import styles from './AgreedToAgreement.module.scss'
import { Box, Grid, Modal, Typography } from '@mui/material'
import CommonButton from '../common/CommonButton/CommonButton'

export interface IAgreedToAgreementModal {
    handleClick: () => void;
}
const AgreedToAgreement = ({ handleClick }: IAgreedToAgreementModal) => {
    return (
        <Grid className={styles.agreedToAgreement}>
            <Box>
                <Typography textAlign={"center"} variant='h5' fontSize={25} fontWeight={500}>Acceptance of Terms</Typography>
                <Typography textAlign={"center"}>By using the Service, You agree to be bound by this Agreement, including any additional terms and conditions and policies referenced herein. If You do not agree to these terms, You may not access or use the Service.</Typography>
                <Box>
                    <CommonButton name={"Accept"} onClick={handleClick} />
                </Box>
            </Box>
        </Grid>
    )
}

export default AgreedToAgreement;