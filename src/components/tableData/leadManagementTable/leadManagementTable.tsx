import React from 'react'
import styles from './leadManagementTable.module.scss'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdOutlinePreview, MdEdit, MdDelete, MdCloudDownload } from "react-icons/md";
import { GrView } from "react-icons/gr";
import StatusModal from '../../modal/StatusModal/StatusModal';

export interface ILeadManagementTable {
    data: any;
    handleEdit: any;
    handleDelete: any;
    handleaddBusiness: any;
    handledownload: any;
    query: any;
    leadStatusModal: any
    statusVal: any;
    handleChangeStatus: any;
    handleUpdateStatus: any;
};

const LeadManagementTable = ({ data, handleEdit, handleDelete, handleaddBusiness, handledownload, query, leadStatusModal, statusVal, handleChangeStatus, handleUpdateStatus }: ILeadManagementTable) => {
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
        <TableContainer className={styles.leadManagementTable} >
            <Table sx={{ width: "150%", overflowX: 'auto' }}>
                <TableHead sx={{ backgroundColor: "#383A3C" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Lead Name</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Lead Type</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Open Date</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Close Date</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Status</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Business Type</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Business Source</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Vendor Name</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Vendor Address</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Business Value</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Business Cost</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Profit Amount</TableCell>
                        <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Description</TableCell>
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
                                <TableCell sx={{ textAlign: "center" }}>{item.leadName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadType}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.openDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.closeDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>

                                    {leadStatusModal && <StatusModal statusVal={statusVal}
                                        handleChange={handleChangeStatus} handleClick={() => handleUpdateStatus(item._id)} />
                                    }
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.type}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.source}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorAddress}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.businessValueBooked}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.businessCost}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.profitAmount}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: truncateWords(item.leadDesc, 8) }}></TableCell>
                                <TableCell sx={{ textAlign: "center" }} >
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
    )
}

export default LeadManagementTable