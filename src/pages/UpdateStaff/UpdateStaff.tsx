import React, { useEffect, useState } from 'react'
import styles from './UpdateStaff.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MdClose } from 'react-icons/md'
import InputField from '../../components/inputField/InputField'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectField from '../../components/SelectField/SelectField'
import { useLocation, useNavigate } from 'react-router-dom'


const UpdateStaff = () => {
    const data = {
        role: ["EMPLOYEE", "HR", "MANAGER", "DIRECTOR"],
        type: ["PROBATION", "PERMANENT"]
    }
    const navigation = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [inputValue, setInputValue] = useState<any>({ name: "", uanNumber: "", bankName: "", bankAccount: "", esic: "", address: "", mobile: "", email: "", officialEmail: "", password: '', branch: "", IFSC: "", department: '', designation: "", dateOfJoining: "", role: "", empStatus: "" });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const handleUpdate = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString);
        const { token } = loginedUser;
        if (inputValue.name === "" || inputValue.email === "" || inputValue.officialEmail === "" || inputValue.mobile === "" || inputValue.address === "" || inputValue.bankAccount === "" || inputValue.bankName === "" || inputValue.branch === "" || inputValue.dateOfJoining === "" || inputValue.department === "" || inputValue.designation === "" || inputValue.role === "" || inputValue.password === "" || inputValue.IFSC === "" || inputValue.empStatus === "") {
            toast.error("Please fill require field")
            return;
        }

        try {
            const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/user/update/profile`, inputValue,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (response.status === 200) {
                toast.success("Staff added successfuly!")
                navigation('/staff')
            }

        } catch (error) {
            console.error("Error during POST request:", error);

        }
    };
    const getData = () => {
        if (path === "/update-staff") {
            const staffDataString: any = localStorage.getItem("staffDetails")
            const staffData = JSON.parse(staffDataString);
            setInputValue({
                name: staffData[0].name,
                uanNumber: staffData[0].uanNumber,
                bankName: staffData[0].bankName,
                bankAccount: staffData[0].bankAccount,
                esic: staffData[0].esic,
                address: staffData[0].address,
                mobile: staffData[0].mobile,
                officialEmail: staffData[0].officialEmail,
                password: staffData[0].password,
                branch: staffData[0].branch,
                IFSC: staffData[0].IFSC,
                department: staffData[0].department,
                designation: staffData[0].designation,
                dateOfJoining: staffData[0].dateOfJoining,
                role: staffData[0].role,
                empStatus: staffData[0].empStatus
            })
        }
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <Grid className={styles.addStaffContainer}>
            <Typography variant='h5' fontSize={25} fontWeight={600} textAlign={"center"}>Update Staff</Typography>
            <Grid className={styles.staffModal}>
                <Grid>
                    <InputField
                        IsRequire={true}
                        label={'Name'}
                        name={'name'}
                        placeholder={'Enter your name'}
                        value={inputValue.name}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Personal Email'}
                        name={'officialEmail'}
                        placeholder={'Enter your email'}
                        value={inputValue.officialEmail}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Mobile'}
                        name={'mobile'}
                        placeholder={'Enter your mobile'}
                        value={inputValue.mobile}
                        handleChange={handleChange}
                        type={"number"}
                    />

                    <SelectField
                        IsRequire={true}
                        title={'Emp Status'}
                        data={data?.type}
                        option={inputValue?.empStatus}
                        name={'empStatus'}
                        handleChange={handleChange}
                    /><InputField
                        IsRequire={true}
                        label={'Designation'}
                        name={'designation'}
                        placeholder={'Enter your designation'}
                        value={inputValue.designation}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    
                    <InputField
                        IsRequire={true}
                        label={'IFSC Code'}
                        name={'IFSC'}
                        placeholder={'Enter your IFSC code'}
                        value={inputValue.IFSC}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Address'}
                        name={'address'}
                        placeholder={'Enter your address'}
                        value={inputValue.address}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={false}
                        label={'UAN'}
                        name={'uanNumber'}
                        placeholder={'Enter your uan'}
                        value={inputValue.uanNumber}
                        handleChange={handleChange}
                        type={"number"}
                    />
                </Grid>
                <Grid>
                    <InputField
                        IsRequire={true}
                        label={'Date of Joining'}
                        name={'dateOfJoining'}
                        placeholder={'Enter your joining date'}
                        value={inputValue.dateOfJoining}
                        handleChange={handleChange}
                        type={"date"}
                    />

                    <InputField
                        IsRequire={true}
                        label={'Official Email'}
                        name={'officialEmail'}
                        placeholder={'Enter your email'}
                        value={inputValue.officialEmail}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Department'}
                        name={'department'}
                        placeholder={'Enter your department'}
                        value={inputValue.department}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <SelectField
                        IsRequire={true}
                        title={'Role'}
                        data={data.role}
                        option={inputValue?.role}
                        name={'role'}
                        handleChange={handleChange}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Bank Name'}
                        name={'bankName'}
                        placeholder={'Enter your bank name'}
                        value={inputValue.bankName}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Bank Account Number'}
                        name={'bankAccount'}
                        placeholder={'Enter your bank account'}
                        value={inputValue.bankAccount}
                        handleChange={handleChange}
                        type={"number"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Branch'}
                        name={'branch'}
                        placeholder={'Enter your branch'}
                        value={inputValue.branch}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={false}
                        label={'ESIC Ref No'}
                        name={'esic'}
                        placeholder={'Enter your esi'}
                        value={inputValue.esic}
                        handleChange={handleChange}
                        type={"text"}
                    />

                </Grid>
            </Grid>
            <Grid className={styles.action}>
                <CommonButton name={"Cancel"} onClick={(() => navigation('/staff'))} />
                <CommonButton name={"Submit"} onClick={handleUpdate} />
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default UpdateStaff