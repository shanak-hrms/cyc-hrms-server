import React from 'react'
import styles from './HeadingText.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import { BsFillPatchPlusFill } from "react-icons/bs";
import CommonButton from '../common/CommonButton/CommonButton';
import SearchBox from '../common/searchBox/SearchBox';

export interface IHeadingText {
    heading: string;
    name?: string;
    handleClick?: any;
    IsAction?: boolean;
    name2?: string;
    handleClick2?: any;
    handleClick3?: any;
    IsName2?: boolean;
    IsName3?: boolean;
    name3?: any
    IsSearchBox?: boolean
    setQuery?: any
}
const HeadingText = ({ heading, name, name2, name3, IsName3, handleClick3, IsName2, handleClick, IsAction, handleClick2, IsSearchBox, setQuery }: IHeadingText) => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const { role } = loginedUser;
    return (
        <Grid className={styles.headingTextContainer}>
            <Typography variant='h4' fontWeight={500} fontSize={25}>{heading}</Typography>
            {IsAction
                ?
                <Grid className={styles.button}>
                    {IsSearchBox ? <SearchBox setQuery={setQuery} /> : ""}

                    <CommonButton name={name} onClick={handleClick} />
                    {IsName2 ? <CommonButton name={name2} onClick={handleClick2} /> : ""}
                    {role === "MANAGER" ? <>{IsName3 ? <CommonButton name={name3} onClick={handleClick3} /> : ""}</> : ""}
                </Grid> :
                ""}
        </Grid>
    )
}

export default HeadingText