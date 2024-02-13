import React, { useState } from 'react'
import styles from './LoginForm.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import InputField from '../inputField/InputField'
import CommonButton from '../common/CommonButton/CommonButton'
import { IoMdClose } from "react-icons/io";


export interface ILoginForm {
    open:boolean;
    handleClose:any;
    handleForgate:any;
    inputData: any,
    handleChange: any;
    handleClick: any;

}
const LoginForm = ({open, handleClose, handleForgate, inputData, handleChange, handleClick }: ILoginForm) => {

    return (
        <Grid className={styles.loginFormContainer}>
            <Typography marginBlockEnd={4} variant='h4' fontSize={29} fontWeight={600}>Welcome
                <span style={{ color: "#68C5AE", paddingInlineStart: 10 }}>
                    to login!
                </span>
            </Typography>
            <Box>
                <InputField
                    label={'Email'}
                    name={'email'}
                    placeholder={'example@gmail.com'}
                    value={inputData.email}
                    handleChange={handleChange}
                    type={"email"}
                />
                <InputField
                    label={'Password'}
                    name={'password'}
                    placeholder={'*****'}
                    value={inputData.password}
                    handleChange={handleChange}
                    type={"password"}
                />
            </Box>
            <Typography style={{ color: "#68C5AE", cursor: "pointer" }} onClick={handleForgate}>Forgot Your Password?</Typography>
            <CommonButton
                name={"Login"}
                onClick={handleClick}
            />
            {open ?
                <Grid className={styles.forgate}>
                    <Box>
                        <IoMdClose fontSize={26} cursor={"pointer"} onClick={handleClose} />
                    </Box>
                    <Typography textAlign={"center"}>Please contact to hr</Typography>
                </Grid> : ""}

        </Grid>
    )
}

export default LoginForm