import React, { useState, useEffect } from "react";
import styles from "./EmployeeTable.module.scss";
import {
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

export interface IEmployeeTable {
  heading: string;
  tableTitle: any;
  tableData: any;
  handleEdit: any;
  handleDelete: any;
  setQuery: any;
  query: any;
  loading: boolean
}

const EmployeeTable = ({
  heading,
  query,
  setQuery,
  tableTitle,
  tableData,
  handleEdit,
  handleDelete,
  loading
}: IEmployeeTable) => {
  return (
    <Grid className={styles.commonTableContainer}>
      <TableHead className={styles.tableHead}>
        <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
        <TableCell sx={{ fontSize: 20 }}>
          <SearchBox setQuery={setQuery} />
        </TableCell>
      </TableHead>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: "#383A3C" }}>
            <TableRow>
              {tableTitle.map((item: any) => {
                return (
                  <TableCell style={{ color: "#68C5AE", textAlign:"center" }}>{item.title}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer>
        {loading ? <CustomLoader /> : <Table>
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
                      <TableCell sx={{textAlign:"center"}}>
                        <CommonButton
                          name={item.emp_id}
                        />
                      </TableCell>
                      <TableCell sx={{textAlign:"center"}}>{item.name}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{item.email}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{item.branch}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{item.department}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{item.designation}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{item.dateOfJoin}</TableCell>
                      <TableCell sx={{textAlign:"center"}} className={styles.tableAction}>
                        <MdOutlineMode onClick={()=>handleEdit(item._id)} fontSize={30} />
                        <RiDeleteBinLine
                          onClick={() => handleDelete(item._id)}
                          fontSize={30}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>}

      </TableContainer>
    </Grid>
  );
};

export default EmployeeTable;
