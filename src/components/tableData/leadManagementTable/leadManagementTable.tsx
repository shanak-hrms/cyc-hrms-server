import React from 'react'
import styles from './leadManagementTable.module.scss'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdEdit, MdDelete, MdCloudDownload } from "react-icons/md";


export interface ILeadManagementTable {
    data: any;
    handleEdit: any;
    handleDelete: any;
    handleDownload: any;
    handleaddBusiness: any;
};

const LeadManagementTable = ({ data, handleEdit, handleDelete, handleDownload, handleaddBusiness }: ILeadManagementTable) => {
    const formattedDate = (idx: any) => {
        const dateObj = new Date(idx);
        const year = dateObj.getUTCFullYear();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();

        const formattedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

        return formattedDateString;
    };
    const formatedDes = (idx: any) => {
        const formattedDes = idx.replace(/<\/?p>/g, '');

        return formattedDes;

    };

    return (
        <TableContainer className={styles.leadManagementTable}>
            <Table>
                <TableHead sx={{ backgroundColor: "#383A3C" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Lead Name</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Lead Type</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Open Date</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Close Date</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Status</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Description</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Add/View Business</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((item: any) => {
                        return (
                            <TableRow>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadType}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.openDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.closeDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadStatus}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formatedDes(item.leadDes)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} className={styles.action}>
                                    <CommonButton name={"Add"} onClick={(() => handleaddBusiness(item._id))} />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <MdEdit fontSize={28} style={{ color: "#3EC8D5" }} onClick={(() => handleEdit(item._id))} />
                                    <MdDelete fontSize={28} style={{ color: "#FF3A6E" }} onClick={(() => handleDelete(item._id))} />
                                    {/* <MdCloudDownload fontSize={28} style={{ color: "#58024B" }} onClick={(() => handleDownload(item._id))} /> */}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default LeadManagementTable