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
                </Table>
            </TableContainer>
            <TableContainer>
                {loading ? <CustomLoader /> : <Table><TableBody>
                    {tableData && tableData.filter((employee: { name: string }) => {
                        return (
                            query === "" ||
                            (employee.name
                                ?.toLowerCase()
                                ?.includes(query.toLowerCase()) ??
                                false)
                        );
                    }).map((item: any) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell sx={{ textAlign: "center" }}>{item.employeeId.name}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.employeeId.email}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formatDate(item.date)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formatTime(item.clockIn)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {formatTime(item.clockOut)}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody></Table>}

            </TableContainer>
        </Grid>
    )
}

export default AttandanceTable