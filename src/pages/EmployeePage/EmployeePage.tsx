import React, { Fragment, useEffect, useState } from "react";
import styles from "./EmployeePage.module.scss";
import { Box, Grid, ListItemButton, Typography } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/employeeTable/EmployeeTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeModal from "../../components/modal/EmployeeModal/EmployeeModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePayrollModal from "../../components/modal/CreatePayrollModal/CreatePayrollModal";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import SearchBox from "../../components/common/searchBox/SearchBox";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const EmployeePage = () => {
  const navigation = useNavigate()
  const [payrollModal, setPayrollModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false)
  const handleClose = () => { setPayrollModal(false); setDownloadModal(false) };
  const [inputData, setInputData] = useState<any>({
    name: "",
    email: "",
    emp_id: "",
    branch: "",
    department: "",
    designation: "",
    dateOfJoin: ""
  });
  const [payrollVal, setPayrollVal] = useState({ employeeId: "", month: "", year: "" })
  const [query, setQuery] = useState("");
  const [employeeData, setEmployeeData] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const [downloadId, setDownloadId] = useState()
  const [payrollData, setPayRollData] = useState<any>()

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/user/get`)
      const data = response.data.userData
      setEmployeeData(data);

    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false)
    }
  };

  const handlePayrollModal = async (idx: any) => {
    setPayrollModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }));
    setPayrollVal({ ...payrollVal, employeeId: idx });
  };
  const handleChangePayroll = (e: any) => {
    const { name, value } = e.target;
    setPayrollVal({ ...payrollVal, [name]: value });
  }
  const handleCreatePayroll = async () => {
    const loginedUserString: any = localStorage.getItem("loginedUser")
    const loginedUser = JSON.parse(loginedUserString)
    const { token } = loginedUser
    if (payrollVal.month === "") {
      toast.error("Please fill month");
      return;
    } else if (payrollVal.year === "") {
      toast.error("Please fill year")
      return;
    }

    try {
      const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/payroll/create`, payrollVal,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      if (response.status === 200) {
        toast.success("Payroll created successfuly")
        setPayrollModal(false)
      }
    }
    catch (err) {
      console.log(err)
    }


  }

  const handlePayrollDownloadModal = (idx: any) => {
    setDownloadModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
    console.log(idx, "idx")
    setDownloadId(idx)
  }
  const handleDownloadPaySlip = () => {
    const input: any = document.getElementById('userData');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('userData.pdf');
      });

  }

  const handleDownload = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/payroll/download/monthly-payroll/${downloadId}?month=${payrollVal.month}`
      )
      if (response.status === 200) {
        toast.success("success")
        const payrollData = response.data.payroll;
        localStorage.setItem("payrollData", JSON.stringify(payrollData))
        navigation('/pay-slip-preview')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Fragment>
      <Grid className={styles.employeePageContainer}>
        <CommonHeading
          heading={""}
          IsHeadingAction={false}
        />
        <EmployeeTable
          heading={"Pay Slip Management"}
          tableTitle={data.tableTitle}
          tableData={employeeData}
          handlePayrollModal={handlePayrollModal}
          handlePayrollDownload={handlePayrollDownloadModal}
          setQuery={setQuery}
          query={query}
        />
        <CreatePayrollModal
          open={payrollModal}
          heading={"Create Payroll"}
          name="Submit"
          payrollVal={payrollVal}
          handleCreate={handleCreatePayroll}
          handleClose={handleClose}
          handleChange={handleChangePayroll}
        />
        <CreatePayrollModal
          open={downloadModal}
          name="Next"
          heading={"Download Pay Slip"}
          payrollVal={payrollVal}
          handleCreate={handleDownload}
          handleClose={handleClose}
          handleChange={handleChangePayroll}
        />
        <ToastContainer />
      </Grid>
    </Fragment>
  );
};

export default EmployeePage;
