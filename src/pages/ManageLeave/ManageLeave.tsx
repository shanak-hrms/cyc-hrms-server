import React, { useEffect, useState } from "react";
import styles from "./ManageLeave.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import ManageLeaveTable from "../../components/common/ManageLeave/ManageLeaveTable";
import data from "./data.json";
import LeaveActionModal from "../../components/LeaveActionModal/LeaveActionModal";
import axios from "axios";
import ConformActionModal from "../../components/modal/ConformActionModal/ConformActionModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [pendingLeaveData, setPendingLeaveData] = useState<any>();
  const [approvedLeaveData, setApprovedLeaveData] = useState<any>();
  const [rejectedLeaveData, setRejectedLeaveData] = useState<any>();
  const [selectedId, setSelectedId] = useState<any>()



  const getPendingLeaveData = async () => {
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/pending/request/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setPendingLeaveData(response.data.pendingLeave)

    }
    catch (err) {
      console.log(err)
    }

  }
  const getApprovedLeaveData = async () => {
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/approved/request/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setApprovedLeaveData(response.data.approvedLeave)

    }
    catch (err) {
      console.log(err)
    }

  }
  const getRejectedLeaveData = async () => {
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/rejected/request/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setRejectedLeaveData(response.data.rejectedLeave)

    }
    catch (err) {
      console.log(err)
    }

  }
  const handleAction = async (idx: any) => {
    try {
      setOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }));
      await setSelectedId(idx)
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleReject = async () => {
    const userTokenString: any = localStorage.getItem("loginedUser");
    const userToken = JSON.parse(userTokenString);
    const { token } = userToken;
    console.log(token, "handleReject...");
    try {
      const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/empLeave/reject/request/${selectedId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        await getRejectedLeaveData()
        setOpen(false)
        toast.success("Leave rejected successfully")

      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprove = async () => {
    const userTokenString: any = localStorage.getItem("loginedUser");
    const userToken = JSON.parse(userTokenString);
    const { token } = userToken;
    console.log(token, "token...");
    try {
      const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1//empLeave/approve/request/${selectedId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        await getApprovedLeaveData()
        setOpen(false)
        toast.success("Leave approved successfully")
      }

    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.error)
    }

  }
  useEffect(() => {
    getPendingLeaveData();
    getApprovedLeaveData();
    getRejectedLeaveData();
  }, [])
  return (
    <Grid className={styles.manageLeaveContainer}>
      <CommonHeading heading={""} />
      <ManageLeaveTable
        query={query}
        setQuery={setQuery}
        heading={"Manage Leave"}
        pendingLeaveData={pendingLeaveData}
        IsManageLeaveAction={true}
        handleAction={handleAction}
        loading={loading}
        approvedLeaveData={approvedLeaveData}
        rejectedLeaveData={rejectedLeaveData}
        tableTitle={undefined}
      />
      <ConformActionModal
        open={open}
        handleClose={handleClose}
        handleReject={handleReject}
        handleApprove={handleApprove}
      />
      <ToastContainer />
    </Grid>
  );
};

export default ManageLeave;
