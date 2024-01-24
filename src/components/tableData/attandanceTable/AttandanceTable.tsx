import React from 'react'
import styles from './AttandanceTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
import SearchBox from '../../common/searchBox/SearchBox';

export interface IAttandanceTable {
    heading: string;
    query: any;
    setQuery: any;
    tableHeading: any;
    tableData: any;
    loading: boolean;
}
const AttandanceTable = ({ heading, query, setQuery, tableHeading, tableData, loading }: IAttandanceTable) => {

    return (
        <Grid className={styles.attandanceTableContainer}>
            <TableHead className={styles.tableHead}>
                <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
                <TableCell sx={{ fontSize: 20 }}>
                    <SearchBox setQuery={setQuery} />
                </TableCell>
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
                                <TableCell sx={{ textAlign: "center" }}>
                                    <CommonButton name={item.emp_id} />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.email}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.date}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.clock_in}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.clock_out}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody></Table>}

            </TableContainer>
        </Grid>
    )
}

export default AttandanceTable