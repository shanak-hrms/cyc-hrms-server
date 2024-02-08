import React, { useState } from "react";
import styles from "./ManageLeaveTable.module.scss";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,

} from "@mui/material";
import SearchBox from "../searchBox/SearchBox";
import CommonButton from "../CommonButton/CommonButton";
import CustomLoader from "../../CustomLoader/CustomLoader";

export interface IManageLeaveTable {
  heading: string;
  query: any;
  setQuery: any;
  pendingLeaveData: any;
  approvedLeaveData: any;
  rejectedLeaveData: any;
  tableTitle: any;
  IsManageLeaveAction: boolean;
  leaveActionHandler?: any;
  editHandler?: any;
  deleteHandler?: any;
  handleAction?: any;
  newStatus?: string;
  loading: boolean;
}

const ManageLeaveTable = ({
  query,
  setQuery,
  heading,
  pendingLeaveData,
  approvedLeaveData,
  rejectedLeaveData,
  loading, handleAction
}: IManageLeaveTable) => {
  const formateDate: any = (dateString: any) => {
    const date = new Date(dateString)
    const formate = date.toLocaleDateString()
    return formate

  }

  return (
    <Grid className={styles.commonTableContainer}>
      <Grid className={styles.tableHead}>
        <Typography variant="h5" fontSize={22} fontWeight={500} marginInlineStart={1.25}>Peanding Leave</Typography>
        <SearchBox setQuery={setQuery} />
      </Grid>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead style={{ backgroundColor: "#383A3C" }}>
            <TableRow>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>MONTH</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingLeaveData && pendingLeaveData.map((item: any, idx: number) => {
              return (
                <TableRow key={idx}>
                  <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.month}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.leaveType}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <CommonButton name={"Action"} onClick={() => handleAction(item._id)} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className={styles.tableContainer}>
        <Typography variant="h5" fontSize={22} fontWeight={500} marginInlineStart={2.5} marginBlockEnd={1.5}>Approved Leave</Typography>
        <Table>
          <TableHead style={{ backgroundColor: "#383A3C" }}>
            <TableRow>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>MONTH</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvedLeaveData && approvedLeaveData.map((item: any, idx: number) => {
              return (
                <TableRow key={idx}>
                  <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.month}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.leaveType}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className={styles.tableContainer}>
        <Typography variant="h5" fontSize={22} fontWeight={500} marginInlineStart={2.5} marginBlockEnd={1.5}>Rejected Leave</Typography>
        <Table>
          <TableHead style={{ backgroundColor: "#383A3C" }}>
            <TableRow>
            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>NAME</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>START DATE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>END DATE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>MONTH</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>LEAVE TYPE</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>STATUS</TableCell>
              <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>REASON</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rejectedLeaveData && rejectedLeaveData.map((item: any, idx: number) => {
              return (
                <TableRow key={idx}>
                  <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formateDate(item.startDate)}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formateDate(item.endDate)}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.month}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.leaveType}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ManageLeaveTable;

// {pendingLeaveData && pendingLeaveData.filter((employee: { name: string }) => {
//   return (
//     query === "" ||
//     (employee.name
//       ?.toLowerCase()
//       ?.includes(query.toLowerCase()) ??
//       false)
//   );
// }}