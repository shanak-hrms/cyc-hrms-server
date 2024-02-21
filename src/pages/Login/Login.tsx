import React, { useState } from 'react'
import styles from './Login.module.scss'
import { Box, Grid, Typography } from '@mui/material'
// import logo from '../../asserst/images/CYC_logo-01-removebg-preview.png'
import logo from '../../asserst/images/tempImagel5jDoC 1.svg'

import LoginForm from '../../components/LoginForm/LoginForm'

export interface ILogin {
    inputData: any;
    handleChange: any;
    handleLogin: any;
}
const Login = ({ inputData, handleChange, handleLogin }: ILogin) => {


    return (
        <Grid className={styles.loginContainer}>
            <Box>
                <img src={logo} alt='img' />
            </Box>
            <Box>
                <LoginForm
                    inputData={inputData}
                    handleChange={handleChange}
                    handleClick={handleLogin} />
            </Box>
        </Grid>
    )
}

export default Login