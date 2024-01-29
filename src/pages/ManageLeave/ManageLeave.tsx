import React, { useEffect, useState } from "react";
import styles from "./ManageLeave.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import ManageLeaveTable from "../../components/common/ManageLeave/ManageLeaveTable";
import data from "./data.json";
import LeaveActionModal from "../../components/LeaveActionModal/LeaveActionModal";
import axios from "axios";

export interface ManageType {
  emp_id: string;
  name: string;
  status: string;
  leave_type: string;
  start_date: number;
  leave_reason: string;
  total_day: number;
  end_date: number;
  id: string | number;
}

const ManageLeave = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false);
  const [leaveData, setLeaveData] = useState<any>();
  const handleClose = () => setOpen(false);
  const [selectedLeave, setSelectedLeave] = useState<any>()
  const [name, setName] = useState<any>()
  const [empId, setEmpId] = useState<any>()
  const [leaveType, setLeaveType] = useState<any>()
  const [startDate, setStartDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [totalLeave, setTotaleLeave] = useState<any>()
  const [leaveReason, setLeaveReason] = useState<any>()
  const [user, setUser] = useState("")

  const getData = async () => {
    const newUser = localStorage.getItem("userRole")
    try {
      setLoading(true)
      const response = await axios.get('https://hrms-server-ygpa.onrender.com/empLeave')
      const data = response.data.leaveData;
      if (newUser === "HR") {
        setLeaveData(data)
      } else if (newUser === "MANAGER") {
        const filteredData = data.filter((item: any) => item.status === "hr_Approved" || item.status === "manager_Approved")
        setLeaveData(filteredData)
      } else if (newUser === "ADMIN") {
        const filteredData = data.filter((item: any) => item.status === "manager_Approved" || item.status === "Approved")
        setLeaveData(filteredData)
      } else {
        console.log("err")
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  const handleAction = (idx: any) => {
    setOpen((preState: any) => ({
      ...preState, [idx]: !preState[idx]
    }))
    const newData = leaveData.filter((item: any) => item._id === idx)
    const id = newData[0]._id;
    const name = newData[0].name;
    const empId = newData[0].emp_id;
    const leaveType = newData[0].leave_type;
    const startDate = newData[0].start_date;
    const endDate = newData[0].end_date;
    const totalLeave = newData[0].total_day;
    const leaveReason = newData[0].leave_reason;
    const status = newData[0].status;
    console.log(newData, "newData...")
    setSelectedLeave(id)
    setName(name)
    setEmpId(empId)
    setLeaveType(leaveType)
    setStartDate(startDate)
    setEndDate(endDate)
    setTotaleLeave(totalLeave)
    setLeaveReason(leaveReason)
  }
  const handleApproved = async () => {
    let newStatus = "";
    if (user === "ADMIN") {
      newStatus = "Approved";
    } else if (user === "MANAGER") {
      newStatus = "manager_Approved";
    } else if (user === "HR") {
      newStatus = "hr_Approved";
    }
    try {
      await axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${selectedLeave}`, { status: newStatus });
      await getData();
      console.log(user, "user..");
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }

  const handleReject = async () => {
    try {
      axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${selectedLeave}`, { status: "Rejected" })
      await getData();
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false)
    }
  };

  useEffect(() => {
    const userRole: any = localStorage.getItem("userRole");
    setUser(userRole)

    getData();
  }, []);

  return (
    <Grid className={styles.manageLeaveContainer}>
      <CommonHeading heading={""} />
      <ManageLeaveTable
        query={query}
        setQuery={setQuery}
        heading={"Manage Leave"}
        tableData={leaveData}
        tableTitle={data.tableTitle}
        IsManageLeaveAction={true}
        handleAction={handleAction}
        loading={loading}
      />
      <LeaveActionModal
        open={open}
        name={name}
        empId={empId}
        leaveType={leaveType}
        startDate={startDate}
        endDate={endDate}
        totalLeave={totalLeave}
        leaveReason={leaveReason}
        handleClose={handleClose}
        handleApproved={handleApproved}
        handleReject={handleReject}
      />
    </Grid>
  );
};

export default ManageLeave;
