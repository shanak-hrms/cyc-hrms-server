import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import LeaveTable from '../../../components/tableData/leaveTable/LeaveTable';
import HeadingText from '../../../components/HeadingText/HeadingText';
import LeaveModal from '../../../components/modal/LeaveModal/LeaveModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Leave = () => {
    const [open, setOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [emp_id, setEmpId] = useState('')
    const [leaveId, setLeaveId] = useState<string>()
    const [inputData, setInputData] = useState<any>({
        emp_id: '', name: '', start_date: '', end_date: '', leave_type: '', leave_reason: '', remark: ''
    });
    const [leaveData, setLeaveData] = useState<any>('')
    const handleModal = () => {
        const userName: any = localStorage.getItem("userName")
        const userId: any = localStorage.getItem("empId")
        setName(userName)
        setEmpId(userId)
        setOpen(!open)
    }
    console.log(name, "name")
    const handleClose = () => setOpen(false)
    const handleEditClose = () => {
        setEditModal(false)
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = axios.get('https://hrms-server-ygpa.onrender.com/empLeave')
            const data = (await response).data.leaveData;
            setLeaveData(data)

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleClick = async () => {
        if (inputData.start_date == '' ||
            inputData.end_date == '' ||
            inputData.leave_reason == '' ||
            inputData.leave_type == '') {
            toast.error("Please fill all the field!")
            return;
        }
        try {
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/empLeave/create', { name: name, emp_id: emp_id, start_date: inputData.start_date, end_date: inputData.end_date, leave_reason: inputData.leave_reason, leave_type: inputData.leave_type });
            await fetchData();
            console.log(response, "response..")
            if (response.status === 200) {
                toast.success("Leave successfully created");
            } else {
                toast.error("Failed to create leave");
            }
        } catch (error) {

            console.error('Error:', error);
        } finally {
            setOpen(false)
        }
    };

    const handleDelete = async (idx: string) => {
        setLoading(true)
        try {
            await axios.delete(`https://hrms-server-ygpa.onrender.com/empLeave/${idx}`);
            setLeaveData((prevLeaveData: any) => {
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
                const filteredData = leaveData.filter((leave: any) => leave._id === idx);
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
    }
    const handleEditLeave = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${leaveId}`, inputData)

            setLeaveData((prevLeaveData: any[]) => {
                const updatedLeaveData = prevLeaveData.map(leave => {
                    if (leave._id === leaveId) {

                        return { ...leave, ...response.data };
                    }
                    return leave;
                });

                return updatedLeaveData;
            });
            await fetchData();
        } catch (error) {
            console.log(error)
        } finally {
            setEditModal(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    console.log(leaveData, "leaveData...")
    return (
        <Grid>
            <HeadingText
                heading={'Leave'}
                IsAction={true}
                name='Apply'
                handleClick={handleModal} />
            <LeaveTable
                data={leaveData}
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
            />
            <LeaveModal
                open={editModal}
                heading={"Edit Leave"}
                handleClose={handleEditClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleEditLeave}
            />
            <ToastContainer />
        </Grid>
    )
}

export default Leave;