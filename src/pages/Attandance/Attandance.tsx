import React, { useState, useEffect } from 'react'
import styles from './Attandance.module.scss'
import { Grid, SelectChangeEvent } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import data from './data.json'
import AttandanceTable from '../../components/tableData/attandanceTable/AttandanceTable';
import axios from 'axios';

export interface IinputDataType {
    emp_id: string;
    name: string;
    date: string;
    status: string;
    clock_in: string;
    clock_out: string | number;
    late: string;
    early_leaving: string;
    overtime: string
    id: string | number
}
const Attandance = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("");
    const openModal = () => setOpen(!open)
    const [attandenceTable, setattandenceTable] = useState<IinputDataType[]>([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await axios.get("https://hrms-server-ygpa.onrender.com/api/v1/attendance/get");
                const data = result.data.attendanceData;
                const newData = data[0].regularizationRequest.status
                setattandenceTable(data);
                console.log(result, "result");
                console.log(newData, "newData")
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid className={styles.attandanceContainer}>
            <CommonHeading
                heading={''}
                onClick={openModal}
                IsHeadingAction={false}
            />
            <AttandanceTable
                heading='Attendance'
                query={query}
                setQuery={setQuery}
                tableHeading={data.tableTitle}
                tableData={attandenceTable}
                loading={loading}
            />
        </Grid>
    )
}

export default Attandance;
