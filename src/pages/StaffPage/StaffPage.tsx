import React, { useEffect, useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SalaryStructureModal from '../../components/modal/SalaryStructureModal/SalaryStructureModal'
import { useNavigate } from 'react-router-dom'


const StaffPage = () => {
    const navigation = useNavigate();
    const [actionOpen, setActionOpen] = useState(false)
    const [salStrModal, setSalStrModal] = useState(false)
    const handleClose = () => { setActionOpen(false); setSalStrModal(false) }
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
    const handleActionModal = async (idx: any) => {
        setActionOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        setSalStrVal({ ...salStrVal, employeeId: idx })
    }

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
        navigation('/add-staff')
    };

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
                handleEdit={undefined}
                handleAddSalary={handleAddSalaryModal}
                handlePayroll={undefined}
                handleDelete={handleDelete}
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
