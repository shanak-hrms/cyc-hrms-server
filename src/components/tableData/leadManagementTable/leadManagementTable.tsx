import React from 'react'
import styles from './leadManagementTable.module.scss'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdOutlinePreview, MdEdit, MdDelete, MdCloudDownload } from "react-icons/md";
import { GrView } from "react-icons/gr";



export interface ILeadManagementTable {
    data: any;
    handleEdit: any;
    handleDelete: any;
    handleaddBusiness: any;
    handledownload: any;
    query: any;
};

const LeadManagementTable = ({ data, handleEdit, handleDelete, handleaddBusiness, handledownload, query }: ILeadManagementTable) => {
    const formattedDate = (idx: any) => {
        const dateObj = new Date(idx);
        const year = dateObj.getUTCFullYear();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();

        const formattedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        if (formattedDateString === "1970-01-01") {
            return formattedDateString;
        }
        return formattedDateString;


    };
    function truncateWords(text: string, numWords: number) {
        const words = text.split(' ');
        const truncatedText = words.slice(0, numWords).join(' ');
        return truncatedText;
    }



    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer className={styles.leadManagementTable}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#383A3C" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Lead Name</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Lead Type</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Open Date</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Close Date</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Status</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Business Type</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Business From</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Business Value</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Business Cost</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Profit Amount</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "left" }}>Description</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.filter((lead: { leadName: string }) => {
                            return (
                                query === "" ||
                                (lead.leadName
                                    ?.toLowerCase()
                                    ?.includes(query.toLowerCase()) ??
                                    false)
                            );
                        }).map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: "left" }}>{item.leadName}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.leadType}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{formattedDate(item.openDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{formattedDate(item.closeDate)}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.leadStatus}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.businessType}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.businessFrom}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.businessVal}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.businessCost}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>{item.profitAmount}</TableCell>
                                    <TableCell sx={{ textAlign: "left" }} dangerouslySetInnerHTML={{ __html: truncateWords(item.leadDesc, 8) }}></TableCell>
                                    <TableCell sx={{ textAlign: "center", display: "flex", flexDirection: 'column' }} >
                                        <MdOutlinePreview fontSize={18} style={{ color: "#3EC8D5" }} cursor={"pointer"} onClick={(() => handleaddBusiness(item._id))} />
                                        <MdEdit fontSize={18} style={{ color: "#000000" }} cursor={"pointer"} onClick={(() => handleEdit(item._id))} />
                                        <MdDelete fontSize={18} style={{ color: "#FF3A6E" }} cursor={"pointer"} onClick={(() => handleDelete(item._id))} />
                                        <MdCloudDownload fontSize={18} style={{ color: "blue" }} cursor={"pointer"} onClick={(() => handledownload(item._id))} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default LeadManagementTable