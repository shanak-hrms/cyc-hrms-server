import React from 'react'
import styles from './MeetingSchedule.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import HeadingText from '../../HeadingText/HeadingText';

export interface IMeetingSchedule {
    data: any;
    handleClick: any;
    handleEdit: any
    handleDelete: any;
}

const MeetingSchedule = ({ data, handleClick, handleEdit, handleDelete }: IMeetingSchedule) => {
    return (
        <Grid className={styles.meetingScheduleContainer}>
            <HeadingText heading={'Announcement List'} IsAction={true} name='Create' handleClick={handleClick} />
            <TableContainer>
                <Table>
                    <TableHead style={{ backgroundColor: "#383A3C" }}>
                        <TableRow >
                            <TableCell style={{ color: "#68C5AE" }}>TITLE</TableCell>
                            <TableCell style={{ color: "#68C5AE" }}>START DATE</TableCell>
                            <TableCell style={{ color: "#68C5AE" }}>START TIME</TableCell>
                            <TableCell style={{ color: "#68C5AE" }}>DESCRIPTION</TableCell>
                            <TableCell style={{ color: "#68C5AE" }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.start_date}</TableCell>
                                    <TableCell>{item.start_time}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <MdEdit fontSize={22} cursor={"pointer"} style={{ color: "#3EC8D5" }} onClick={(() => handleEdit(item._id))} />
                                        <MdDelete fontSize={22} cursor={"pointer"} style={{ color: "#FF3A6E" }} onClick={(() => handleDelete(item._id))} />
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

export default MeetingSchedule