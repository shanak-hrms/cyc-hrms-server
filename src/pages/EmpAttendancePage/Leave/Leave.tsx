import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import LeaveTable from '../../../components/tableData/leaveTable/LeaveTable';
import HeadingText from '../../../components/HeadingText/HeadingText';
import LeaveModal from '../../../components/modal/LeaveModal/LeaveModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Leave.module.scss'
import CommonButton from '../../../components/common/CommonButton/CommonButton';


const Leave = () => {
    const [open, setOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [leaveId, setLeaveId] = useState<string>()
    const [inputData, setInputData] = useState<any>({
        startDate: '', endDate: '', leaveType: '', month: "", leaveReason: ''
    });
    const [radioVal, setRadioVal] = useState("date")
    const [newDateVal, setNewDateVal] = useState({ newDate: "" })
    const [selectedDates, setSelectedDates] = useState<any>([]);
    const [pendingData, setPendingData] = useState<any>('')
    const handleModal = () => { setOpen(!open) }
    const handleClose = () => setOpen(false)
    const handleEditClose = () => {
        setEditModal(false)
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };

    const handleChangeRadio = (e: any) => {
        setRadioVal(e.target.value)
    };
    const handleChangeRandomDate = (e: any) => {
        const { name, value } = e.target;
        setNewDateVal({ ...newDateVal, [name]: value });
        setSelectedDates([...selectedDates, value]);
    };
    const getApprovedLeaveData = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/empLeave/approved/request/list/foruser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data.approvedLeave;
            setPendingData(data)

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };
    const getPendingLeaveData = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/empLeave/approved/request/list/foruser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data.approvedLeave;
            setPendingData(data)

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };
    const getRejectedLeaveData = async () => {
        const userTokenString: any = localStorage.getItem("loginedUser")
        const userToken = JSON.parse(userTokenString)
        const { token } = userToken
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/empLeave/rejected/request/list/foruser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data.rejectedLeave;
            console.log(response, "getRejectedLeaveData")
            setPendingData(data)

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleClick = async () => {
        try {
            const userTokenString: any = localStorage.getItem("loginedUser")
            const userToken = JSON.parse(userTokenString)
            const { token } = userToken

            const response = await axios.post(
                'https://hrms-server-ygpa.onrender.com/api/v1/empLeave/apply/request',
                {
                    name: "name",
                    email: "email",
                    startDate: inputData.startDate,
                    endDate: inputData.endDate,
                    month: inputData.month,
                    dates: selectedDates,
                    leaveType: inputData.leaveType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast.success('Leave successfully created');
            } else {
                toast.error('Failed to create leave');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setOpen(false);
        }
    };

    const handleDelete = async (idx: string) => {
        setLoading(true)
        try {
            await axios.delete(`https://hrms-server-ygpa.onrender.com/empLeave/${idx}`);
            setPendingData((prevLeaveData: any) => {
                return prevLeaveData.filter((leave: { _id: string }) => leave._id !== idx);
            });
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleEdit = async (idx: string) => {

        try {
            setEditModal((preState: any) => ({
                ...preState, [idx]: !preState[idx]
            }))
            setLeaveId(idx)
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/empLeave`)

            if (response.status === 200) {
                const data = response.data.leaveData;
                const filteredData = pendingData.filter((leave: any) => leave._id === idx);
                setInputData({
                    emp_id: filteredData[0].emp_id,
                    name: filteredData[0].name,
                    leave_type: filteredData[0].leave_type,
                    leave_reason: filteredData[0].leave_reason,
                    start_date: filteredData[0].start_date,
                    end_date: filteredData[0].end_date,
                })
            } else {
                console.log("data not found")
            }
        } catch (error) {
            console.error(error)
        }
    };
    const handleEditLeave = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${leaveId}`, inputData)

            setPendingData((prevLeaveData: any[]) => {
                const updatedLeaveData = prevLeaveData.map(leave => {
                    if (leave._id === leaveId) {

                        return { ...leave, ...response.data };
                    }
                    return leave;
                });

                return updatedLeaveData;
            });
        } catch (error) {
            console.log(error)
        } finally {
            setEditModal(false)
            setLoading(false)
        }
    };

    useEffect(() => {
        getApprovedLeaveData();
        getPendingLeaveData();
        getRejectedLeaveData();
    }, []);

    return (
        <Grid className={styles.leaveContainer}>
            <Grid className={styles.leaveHeader}>
                <HeadingText
                    heading={'Leave'}
                    IsAction={false}
                />
                <CommonButton name={"Apply"} onClick={handleModal} />
            </Grid>
            <LeaveTable
                pendingData={pendingData}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <LeaveModal
                open={open}
                heading={"Create New Leave"}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleClick}
                handleChangeRadio={handleChangeRadio}
                radioVal={radioVal}
                newDateVal={newDateVal}
                selectedDates={selectedDates}
                handleChangeRandomDate={handleChangeRandomDate}
            />
            {/* <LeaveModal
                open={editModal}
                heading={"Edit Leave"}
                handleClose={handleEditClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleEditLeave}
            /> */}
            <ToastContainer />
        </Grid>
    )
}

export default Leave;