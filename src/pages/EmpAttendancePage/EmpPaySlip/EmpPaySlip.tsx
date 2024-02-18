import React from 'react'
import styles from './EmpPaySlip.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import HeadingText from '../../../components/HeadingText/HeadingText'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { FaCloudDownloadAlt } from "react-icons/fa";


const EmpPaySlip = () => {
    const handleRequest = () => {

    };
    const handleDownload = () => {

    }
    return (
        <Grid className={styles.empPaySlipContainer}>
            <HeadingText heading={'Pay Slip List'} IsAction={true} name='Pay Slip Request' handleClick={handleRequest} />
            <TableContainer className={styles.tableContainer}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#01ACAC" }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Month</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Month</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {/* <CommonButton name={"Download"} onClick={handleDownload} /> */}
                                <FaCloudDownloadAlt fontSize={25} cursor={"pointer"} onClick={handleDownload} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default EmpPaySlip