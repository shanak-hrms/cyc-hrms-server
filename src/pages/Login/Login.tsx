import React, { useState } from 'react'
import styles from './Login.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import logo from '../../asserst/images/CYC_logo-01-removebg-preview.png'
import LoginForm from '../../components/LoginForm/LoginForm'

export interface ILogin {
    inputData: any;
    handleChange: any;
    handleLogin: any;
}
const Login = ({ inputData, handleChange, handleLogin }: ILogin) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => { setOpen(false) }

    const handleForgate = () => {
        setOpen(!open)
    }
    const handleClick = () => {
        if (open === true) {
            console.log("false")
            setOpen(false)
        } else (
            console.log("tru")
        )
    }

    return (
        <Grid className={styles.loginContainer} onClick={handleClick}>
            <Box>
                <img src={logo} alt='img' />
            </Box>
            <Box>
                <LoginForm
                    inputData={inputData}
                    handleChange={handleChange}
                    handleClick={handleLogin} open={open} handleClose={handleClose} handleForgate={handleForgate} />
            </Box>
        </Grid>
    )
}

export default Login