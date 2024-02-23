import React from 'react'
import styles from './leadManagementTable.module.scss'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdOutlinePreview, MdEdit, MdDelete, MdCloudDownload } from "react-icons/md";
import { GrView } from "react-icons/gr";
import StatusModal from '../../modal/StatusModal/StatusModal';
import { CiEdit } from "react-icons/ci";

export interface ILeadManagementTable {
    data: any;
    handleEdit: any;
    handleDelete: any;
    handleTagIn: any;
    handleTagOut: any;
    handleaddBusiness: any;
    handledownload: any;
    handleStatusModal: any;
    query: any;
};

const LeadManagementTable = ({ data, handleEdit, handleDelete, handleTagIn, handleTagOut, handleaddBusiness, handledownload, query, handleStatusModal }: ILeadManagementTable) => {
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
            <Table>
                <TableHead sx={{ backgroundColor: "#02ABB5" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Lead Name</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Tag In</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Tag Out</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Lead Type</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Open Date</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Close Date</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Type</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Source</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Vendor Name</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Vendor Mobile</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Vendor Email</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Vendor Address</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Value</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Business Cost</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Profit Amount</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Description</TableCell>
                        <TableCell sx={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Action</TableCell>
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
                                <TableCell sx={{ textAlign: "center" }}>
                                    {item?.leadTagIn != 'xyz'
                                        ?
                                        <CommonButton name={"Tag In"} onClick={() => handleTagIn(item._id)} />
                                        :
                                        "Done"
                                    }
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {item?.leadTagOut != ''
                                        ?
                                        <CommonButton name={"Tag Out"} onClick={() => handleTagOut(item._id)} />
                                        :
                                        "Done"
                                    }
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.leadType}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.openDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.closeDate)}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {item?.leadStatus}<CiEdit fontSize={18} cursor={"pointer"} style={{ color: "#02ABB5" }} onClick={() => handleStatusModal(item._id)} />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.type}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.source}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorMobile}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.business?.vendorEmail}</TableCell>
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