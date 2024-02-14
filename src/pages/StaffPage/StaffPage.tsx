import React, { useEffect, useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffModal from '../../components/modal/StaffModal/StaffModal'
import SalaryStructureModal from '../../components/modal/SalaryStructureModal/SalaryStructureModal'
import CreatePayrollModal from '../../components/modal/CreatePayrollModal/CreatePayrollModal'
import { useNavigate } from 'react-router-dom'


const StaffPage = () => {
    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [actionOpen, setActionOpen] = useState(false)
    const [salStrModal, setSalStrModal] = useState(false)
    const handleClose = () => { setOpen(false); setSalStrModal(false); setEditModal(false) };
    const [inputData, setInputData] = useState({ emp_id: '', name: "", empCode: "", uanNumber: "", bankName: "", bankAccount: "", esic: "", address: "", mobile: "", email: "", password: '', branch: "", department: '', designation: "", dateOfJoining: "", role: "" })
    const [salStrVal, setSalStrVal] = useState({ employeeId: "", basicSalary: "", hraPercentage: "", travelAllowance: "" });
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const [editId, setEditId] = useState()

    const handleGlobalModal = () => {
        if (actionOpen == true) {
            console.log(actionOpen, "actionOpen")
            setActionOpen(false)
        }
    }
    console.log(inputData, "inputData")
    const handleActionModal = async (idx: any) => {
        setActionOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        setSalStrVal({ ...salStrVal, employeeId: idx })
    }
    const handleEditModal = (idx: any) => {
        setEditModal((preSate: any) => ({ ...preSate, [idx]: !preSate[idx] }))
        setEditId(idx)
        console.log(idx, "idx..")
    };
    const handleAddSalaryModal = async (idx: any) => {
        setSalStrModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
    };
    const handleChangeSalStr = (e: any) => {
        const { name, value } = e.target;
        setSalStrVal({ ...salStrVal, [name]: value })
    }
    const handleCreateSalary = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString)
        const { token } = loginedUser

        if (salStrVal.basicSalary === "") {
            toast.error("Please fill basic salary");
            return;
        } else if (salStrVal.hraPercentage === "") {
            toast.error("Please fill HRA percentage")
            return;
        } else if (salStrVal.travelAllowance === "") {
            toast.error("Please fill travel allowance")
            return;
        }
        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/salary/create/structure`, salStrVal,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 201) {
                setSalStrModal(false)
                toast.success("Salary created successfully")
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleClick = async () => {
        const empId = `CYC00${Math.floor(Math.random() * 100) + 1}`
        await setInputData((preState: any) => ({ ...preState, emp_id: empId }))
        // setOpen(!open)
        navigation('/add-staff')

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
            console.log(response, "response..")

        } catch (error) {
            console.error("Error during POST request:", error);

        } finally {
            setOpen(false);
        }
    };
    const handleUpdate = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString)
        const { token } = loginedUser
        if (inputData.name === "") {
            toast.error("Please fill name")
            return;
        } else if (inputData.email === '') {
            toast.error("Please fill email")
            return;
        } else if (inputData.email === '') {
            toast.error("Please fill email")
            return;
        } else if (inputData.role === '') {
            toast.error("Please selete role")
            return;
        }
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/user/update/profile`, inputData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success("Profile updated successfully")
                setEditModal(false)
                fetchData();
            }

        }
        catch (err) {
            console.log(err)
        }

    }

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
        <Grid onClick={handleGlobalModal}>
            <User
                data={userData}
                handleClick={handleClick}
                handleAction={handleActionModal}
                loading={loading}
                actionOpen={actionOpen}
                handleEdit={handleEditModal}
                handleAddSalary={handleAddSalaryModal}
                handlePayroll={undefined}
                handleDelete={handleDelete}
            />
            <StaffModal
                open={open}
                heading={"Add Staff/ Employee"}
                handleClose={handleClose}
                inputValue={inputData}
                handleChange={handleChange}
                handleCreate={handleCreate}
            />
            <StaffModal
                open={editModal}
                heading={"Update Staff/ Employee"}
                handleClose={handleClose}
                inputValue={inputData}
                handleChange={handleChange}
                handleCreate={handleUpdate}
            />
            <SalaryStructureModal
                open={salStrModal}
                salStrVal={salStrVal}
                handleClose={handleClose}
                handleChange={handleChangeSalStr}
                handleCreate={handleCreateSalary}
            />
            <ToastContainer />
        </Grid>
    )
}

export default StaffPage
