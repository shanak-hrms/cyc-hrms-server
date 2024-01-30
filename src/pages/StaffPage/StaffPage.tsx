import React, { useEffect, useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffModal from '../../components/modal/StaffModal/StaffModal'


const StaffPage = () => {
    const [open, setOpen] = useState(false);
    const [inputData, setInputData] = useState({ emp_id: '', name: "", email: "", password: '', branch: "", department: '', designation: "", dateOfJoin: "", role: "" })
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)


    const handleClick = async () => {
        const empId = `CYC00${Math.floor(Math.random() * 100) + 1}`
        await setInputData((preState: any) => ({ ...preState, emp_id: empId }))
        console.log(empId, "empId")
        setOpen(!open)
    };
    const handleClose = () => setOpen(false);
    console.log("inputData", inputData)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/user');
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
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/user/signUp', inputData);

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
            const response = await axios.delete(`https://hrms-server-ygpa.onrender.com/user/${idx}`);

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
                handleAction={handleDelete}
                loading={loading}
            />
            <StaffModal
                open={open}
                handleClose={handleClose}
                inputValue={inputData}
                handleChange={handleChange}
                handleCreate={handleCreate}
            />
            <ToastContainer />
        </Grid>
    )
}

export default StaffPage
