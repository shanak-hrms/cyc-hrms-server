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
                    <CommonButton name={"Request Approval"} onClick={() => navigation('/request-approval-list')} />
                </Box>
            </TableHead>
            <TableContainer className={styles.tableContainer}>
                <Table>
                    <TableHead style={{ backgroundColor: "#00ACB2" }}>
                        <TableRow >
                            {tableHeading.map((item: any) => {
                                return (
                                    <TableCell key={item.id} style={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>{item.title}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData && tableData.length > 0 && tableData.filter((item: any) => {
                            const employeeName = item.employeeId?.name || "";
                            return (
                                query === "" ||
                                employeeName.toLowerCase().includes(query.toLowerCase())
                            );
                        }).map((item: any) => {
                            return (
                                <TableRow key={item._id} >
                                    <TableCell style={{ textAlign: "center" }}>{item.employeeId?.name}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{item.employeeId?.email}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatDate(item.date)}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{formatTime(item.clockIn)}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {item.clockOut === null ? "Pending" : <>{formatTime(item.clockOut)}</>}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </Grid>
    )
}

export default AttandanceTable