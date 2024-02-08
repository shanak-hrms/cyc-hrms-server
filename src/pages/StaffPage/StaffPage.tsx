import React, { useEffect, useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffModal from '../../components/modal/StaffModal/StaffModal'
import SalaryStructureModal from '../../components/modal/SalaryStructureModal/SalaryStructureModal'


const StaffPage = () => {
    const [open, setOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false)
    const [salStrModal, setSalStrModal] = useState(true)
    const handleClose = () => { setOpen(false); setSalStrModal(false) };
    const [inputData, setInputData] = useState({ emp_id: '', name: "", address: "", mobile: "", email: "", password: '', branch: "", department: '', designation: "", dateOfJoining: "", role: "" })
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const [staffId, setStaffId] = useState()

    const handleActionModal = async (idx: any) => {
        setActionOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        await setStaffId(idx)
    }
    const handleAddSalaryModal = async (idx: any) => {
        setSalStrModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
    }
    const handleClick = async () => {
        const empId = `CYC00${Math.floor(Math.random() * 100) + 1}`
        await setInputData((preState: any) => ({ ...preState, emp_id: empId }))
        console.log(empId, "empId")
        setOpen(!open)
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/user/get');
            const users = response.data.userData;
            setUserData(users);
        } catch (error) {
            console.error("Error during GET request:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {

        setLoading(true);
        try {
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/api/v1/user/signUp', inputData);

            if (response.status === 200) {
                toast.success("Staff added successfuly!")
            }

            await fetchData();

        } catch (error) {
            console.error("Error during POST request:", error);

        } finally {
            setOpen(false);
        }
    };

    const handleDelete = async (idx: number) => {
        try {
            setLoading(true)
            const response = await axios.delete(`https://hrms-server-ygpa.onrender.com/api/v1/user/delete/${idx}`);

            if (response.status === 200) {

                const updatedEmployeeData = userData.filter(
                    (employee: { _id: any; }) => employee._id !== idx
                );

                setUserData(updatedEmployeeData);
                toast.success("Staff deleted successfuly!")
            } else {
                console.error(`Failed to delete employee. Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        } finally {
            setOpen(false);
            setLoading(false)
        }
    };


    return (
        <Grid>
            <User
                data={userData}
                handleClick={handleClick}
                handleAction={handleActionModal}
                loading={loading}
                actionOpen={actionOpen}
                handleEdit={undefined}
                handleAddSalary={handleAddSalaryModal}
                handleDelete={handleDelete}
            />
            <StaffModal
                open={open}
                handleClose={handleClose}
                inputValue={inputData}
                handleChange={handleChange}
                handleCreate={handleCreate}
            />
            <SalaryStructureModal
                open={salStrModal}
                handleClose={handleClose}
                handleCreate={undefined}
            />
            <ToastContainer />
        </Grid>
    )
}

export default StaffPage
