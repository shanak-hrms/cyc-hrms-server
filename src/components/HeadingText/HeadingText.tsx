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
    IsName2?: boolean;
    IsSearchBox?: boolean
    setQuery?:any
}
const HeadingText = ({ heading, name, name2, IsName2, handleClick, IsAction, handleClick2, IsSearchBox, setQuery }: IHeadingText) => {
    return (
        <Grid className={styles.headingTextContainer}>
            <Typography variant='h4' fontWeight={500} fontSize={25}>{heading}</Typography>
            {IsAction
                ?
                <Grid className={styles.button}>
                    {IsSearchBox ? <SearchBox setQuery={setQuery} /> : ""}

                    <CommonButton name={name} onClick={handleClick} />
                    {IsName2 ? <CommonButton name={name2} onClick={handleClick2} /> : ""}
                </Grid> :
                ""}
        </Grid>
    )
}

export default HeadingText