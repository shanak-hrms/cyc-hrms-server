import React, { useEffect, useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SalaryStructureModal from '../../components/modal/SalaryStructureModal/SalaryStructureModal'
import { useNavigate } from 'react-router-dom'
import StaffProfileModal from '../../components/modal/StaffProfileModal/StaffProfileModal'
import ChangeRoleModal from '../../components/modal/ChangeRoleModal/ChangeRoleModal'
import AssignEmpModal from '../../components/modal/AssignEmpModal/AssignEmpModal'
import AsserstModal from '../../components/modal/AsserstModal/AsserstModal'


const StaffPage = () => {
    const navigation = useNavigate();
    const [actionOpen, setActionOpen] = useState(true)
    const [salStrModal, setSalStrModal] = useState(false)
    const [profilModal, setProfileModal] = useState(false)
    const [assignModal, setAssignModal] = useState(false);
    const [roleModal, setRoleModal] = useState(false);
    const [asserstModal, setAsserstModal] = useState(false);
    const handleClose = () => { setActionOpen(false); setSalStrModal(false); setProfileModal(false); setRoleModal(false); setAssignModal(false); setAsserstModal(false) }
    const [salStrVal, setSalStrVal] = useState({ employeeId: "", basicSalary: "", hraPercentage: "", travelAllowance: "" });
    const [staffRole, setStaffRole] = useState({ rolenewRole: "", newDepartment: '' })
    const [asserstVal, setAsserstVal] = useState({ name: "", date: "", assetsModel: "", assetsId: '' })
    const [assetsData, setAssetsData] = useState<any>([]);
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);
    const [staffId, setStaffId] = useState()
    const [selectedEmp, setSelectedEmp] = useState()
    const [rofile, setProfile] = useState<any>()
    const handleClick = async () => { navigation('/add-staff') };
    const handleEdit = () => { navigation('/update-staff') };

    const handleGlobalModal = () => {

        const values = Object.values(actionOpen);

        if (values.includes(true)) {
            setActionOpen(false);
        }
    }

    const handleActionModal = async (idx: any) => {
        setActionOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        setSalStrVal({ ...salStrVal, employeeId: idx })
        localStorage.setItem("staffId", JSON.stringify(idx))
        const staffDetails = userData.filter((item: any) => item._id === idx);
        localStorage.setItem("staffDetails", JSON.stringify(staffDetails))
        console.log(staffDetails, "staffDetails");
        setStaffId(idx)
    }

    const handleAddSalaryModal = async (idx: any) => {
        setSalStrModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
    };
    const handleAssignModal = (idx: any) => {
        setAssignModal((preSate: any) => ({ ...preSate, [idx]: !preSate[idx] }))
    }
    const handleAsserstModal = (idx: any) => {
        setAsserstModal((preSate: any) => ({ ...preSate, [idx]: !preSate[idx] }))
    }
    const handleChangeAsserst = (e: any) => {
        const { name, value } = e.target;
        setAsserstVal({ ...asserstVal, [name]: value })
    };
    const handleAdd = () => {
        setAssetsData((prevAssets: any) => [...prevAssets, asserstVal]);
    };
    console.log(assetsData, "assets..")
    const handleDeleteAssets = (idx: number) => {
        const filteredAssets = assetsData.filter((item: any, index: number) => index !== idx);
        setAssetsData(filteredAssets)
        console.log(filteredAssets, "filtered assets...");
    }
    const handleClickAssets = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString)
        const { token } = loginedUser;

        const payloadData = assetsData.map((data: any) => ({
            name: data.name,
            date: data.date,
            assetsModel: data.assetsModel,
            assetsId: data.assetsId
        }));

        const payload = { assets: payloadData };

        console.log(payloadData, "payloadData...")
        console.log(assetsData, "assets..")
        console.log("payload", payload)
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/assign/assets/to-employee/${staffId}`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success(response.data.message)
                setAsserstModal(false)
                window.location.reload();
            }

        }
        catch (err) {
            console.log(err)
        }

    }
    const handleChangeRoleModal = (idx: any) => {
        setRoleModal((preSate: any) => ({ ...preSate, [idx]: !preSate[idx] }))
    };
    const handleChangeRole = (e: any) => {
        const { name, value } = e.target;
        setStaffRole({ ...staffRole, [name]: value })
    }
    const handleClickRole = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString)
        const { token } = loginedUser
        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/assign/change-employee-role-department/${staffId}`, staffRole,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success("Role updated successfully")
                setRoleModal(false);
                await fetchData();
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleChangeAssiEmp = (e: any) => {
        const { name, value } = e.target;
        setStaffRole({ ...staffRole, [name]: value });
    };
    const handleSelectEmp = (idx: any) => {
        setSelectedEmp(idx)
    }
    const handleClickAssiEmp = async (idx: any) => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString)
        const { token } = loginedUser;
        console.log(idx, "idx...")

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/assign/manager-to-employee/${selectedEmp}/${staffId}`, staffRole,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success("Manager assigned to Employee successfully")
                setAssignModal(false);
                await fetchData();
            }
        }
        catch (err) {
            console.log(err)
        }

    }
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


    const handleProfile = (idx: any) => {
        const profileData = userData.length > 0 && userData?.filter((item: any) => item._id === idx)

        if (profileData && profileData.length > 0) {
            setProfile(profileData)
            setProfileModal((prevState: any) => ({ ...prevState, [idx]: !prevState[idx] }))
        } else {
            console.log("Profile data not found for ID:", idx);
            // Handle the case where profileData is undefined or empty
        }
    }

    console.log(rofile, "rofile")
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/user/get');
            const users = response.data.userData;
            setUserData(users);
            console.log(users, "users...")
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
        <Grid onClick={handleGlobalModal} className={styles.staffPageContainer}>
            <User
                data={userData}
                handleClick={handleClick}
                handleAction={handleActionModal}
                loading={loading}
                actionOpen={actionOpen}
                handleEdit={handleEdit}
                handleAddSalary={handleAddSalaryModal}
                handlePayroll={undefined}
                handleProfile={handleProfile}
                handleDelete={handleDelete}
                handleAssignModal={handleAssignModal}
                handleAsserstModal={handleAsserstModal}
                handleChangeRoleModal={handleChangeRoleModal}
            />
            <SalaryStructureModal
                open={salStrModal}
                salStrVal={salStrVal}
                handleClose={handleClose}
                handleChange={handleChangeSalStr}
                handleCreate={handleCreateSalary}
            />
            <ChangeRoleModal
                open={roleModal}
                staffRole={staffRole}
                handleClose={handleClose}
                handleChangeRole={handleChangeRole}
                handleClickRole={handleClickRole}
            />
            <AssignEmpModal
                open={assignModal}
                staffRole={staffRole}
                handleChangeAssiEmp={handleChangeAssiEmp}
                userData={userData}
                handleSelectEmp={handleSelectEmp}
                handleClickAssiEmp={handleClickAssiEmp}
                handleClose={handleClose}
            />
            <AsserstModal
                open={asserstModal}
                asserstVal={asserstVal}
                handleAdd={handleAdd}
                assets={assetsData}
                handleDeleteAssets={handleDeleteAssets}
                handleChange={handleChangeAsserst}
                handleClickAssets={handleClickAssets}
                handleClose={handleClose}
            />
            <StaffProfileModal
                open={profilModal}
                profile={rofile}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Grid>
    )
}

export default StaffPage
