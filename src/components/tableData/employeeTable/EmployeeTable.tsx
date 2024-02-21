import React, { useState, useEffect } from "react";
import styles from "./EmployeeTable.module.scss";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdOutlineMode } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import CommonButton from "../../common/CommonButton/CommonButton";
import SearchBox from "../../common/searchBox/SearchBox";
import CustomLoader from "../../CustomLoader/CustomLoader";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdPreview } from "react-icons/md";



export interface IEmployeeTable {
  heading: string;
  tableTitle: any;
  tableData: any;
  handlePayrollModal: any;
  handlePayrollDownload: any;
  handleDownload:any;
  setQuery: any;
  query: any;
}

const EmployeeTable = ({
  heading,
  query,
  setQuery,
  tableTitle,
  tableData,
  handlePayrollModal,
  handleDownload,
  handlePayrollDownload,
}: IEmployeeTable) => {
  const formattedDate = (idx: any) => {
    const date = new Date(idx)
    return date.toLocaleDateString()
  };
  return (
    <Grid className={styles.commonTableContainer}>
      <TableHead className={styles.tableHead}>
        <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
        <Box sx={{ fontSize: 20, display: "flex" }}>
          <SearchBox setQuery={setQuery} />
          <CommonButton name="Download" onClick={handleDownload} />
        </Box>
      </TableHead>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead style={{ backgroundColor: "#00ACB2" }}>
            <TableRow>
              {tableTitle.map((item: any) => {
                return (
                  <TableCell style={{ color: "#000000", textAlign: "center", fontSize: 13, fontWeight: 600 }}>{item.title}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData.filter((employee: { name: string }) => {
              return (
                query === "" ||
                (employee.name
                  ?.toLowerCase()
                  ?.includes(query.toLowerCase()) ??
                  false)
              );
            })
              .map((item: any, idx: any) => {
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.branch}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.department}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.designation}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{formattedDate(item.dateOfJoining)}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <MdOutlineMenuBook fontSize={22} cursor={"pointer"} onClick={(() => handlePayrollModal(item._id))} />
                      <MdPreview fontSize={22} cursor={"pointer"} onClick={(() => handlePayrollDownload(item._id))} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default EmployeeTable;
