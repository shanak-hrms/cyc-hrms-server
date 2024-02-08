import React from 'react'
import styles from './AttandanceTable.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
import SearchBox from '../../common/searchBox/SearchBox';
import { useNavigate } from 'react-router';

export interface IAttandanceTable {
    heading: string;
    query: any;
    setQuery: any;
    tableHeading: any;
    tableData: any;
    loading: boolean;
}
const AttandanceTable = ({ heading, query, setQuery, tableHeading, tableData, loading }: IAttandanceTable) => {
    const navigation = useNavigate()
    function formatDate(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    function formatTime(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    }
    console.log(tableData, "tableData...")
    return (
        <Grid className={styles.attandanceTableContainer}>
            <TableHead className={styles.tableHead}>
                <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
                <Box sx={{ fontSize: 20 }}>
                    <SearchBox setQuery={setQuery} />
                    <CommonButton name={"Request Approval List"} onClick={() => navigation('/request-approval-list')} />
                </Box>
            </TableHead>
            <TableContainer>
                <Table>
                    <TableHead style={{ backgroundColor: "#383A3C" }}>
                        <TableRow >
                            {tableHeading.map((item: any) => {
                                return (
                                    <TableCell key={item.id} style={{ color: "#68C5AE", textAlign: "center" }}>{item.title}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData && tableData.length > 0 && tableData.map((item: any) => {
                            return (
                                <TableRow key={item._id} >
                                    <TableCell style={{ textAlign: "center" }}>{"NAME"}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{"email"}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatDate(item.date)}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatTime(item.clockIn)}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.clockOut === undefined ? "00:00:00" : <>{formatTime(item.clockOut)}</>}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default AttandanceTable