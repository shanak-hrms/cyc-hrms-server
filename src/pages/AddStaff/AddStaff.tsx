import React, { useEffect, useState } from 'react'
import styles from './AddStaff.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MdClose } from 'react-icons/md'
import InputField from '../../components/inputField/InputField'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectField from '../../components/SelectField/SelectField'
import { useNavigate } from 'react-router-dom'

const AddStaff = () => {
    const data = {
        role: ["EMPLOYEE", "HR", "MANAGER", "DIRECTOR"],
        type: ["PROBATION", "PERMANENT"]
    }
    const navigation = useNavigate();
    const [inputValue, setInputValue] = useState({ name: "", uanNumber: "", bankName: "", bankAccount: "", esic: "", address: "", mobile: "", email: "", officialEmail: "", password: '', branch: "", IFSC: "", department: '', designation: "", dateOfJoining: "", role: "", empStatus: "" });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/user/get');
            const users = response.data.userData;
            // setUserData(users);
        } catch (error) {
            console.error("Error during GET request:", error);
        }
    };

    const handleCreate = async () => {
        if (inputValue.name === "" || inputValue.email === "" || inputValue.officialEmail === "" || inputValue.mobile === "" || inputValue.address === "" || inputValue.bankAccount === "" || inputValue.bankName === "" || inputValue.branch === "" || inputValue.dateOfJoining === "" || inputValue.department === "" || inputValue.designation === "" || inputValue.role === "" || inputValue.password === "" || inputValue.IFSC === "" || inputValue.empStatus === "") {
            toast.error("Please fill require field")
            return;
        }

        try {
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/api/v1/user/signUp', inputValue);

            if (response.status === 201) {
                toast.success("Staff added successfuly!")
                navigation('/staff')
            }

            await fetchData();

        } catch (error) {
            console.error("Error during POST request:", error);

        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(inputValue, "inputValue...")
    return (
        <Grid className={styles.addStaffContainer}>
            <Typography variant='h5' fontSize={25} fontWeight={600} textAlign={"center"}>Create Staff</Typography>

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
                        label={'Official Email'}
                        name={'email'}
                        placeholder={'Enter your email'}
                        value={inputValue.email}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Designation'}
                        name={'designation'}
                        placeholder={'Enter your designation'}
                        value={inputValue.designation}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <SelectField
                        IsRequire={true}
                        title={'Emp Status'}
                        data={data?.type}
                        option={inputValue?.empStatus}
                        name={'empStatus'}
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
                        label={'IFSC Code'}
                        name={'IFSC'}
                        placeholder={'Enter your IFSC code'}
                        value={inputValue.IFSC}
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
                    <InputField
                        IsRequire={true}
                        label={'Address'}
                        name={'address'}
                        placeholder={'Enter your address'}
                        value={inputValue.address}
                        handleChange={handleChange}
                        type={"text"}
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
                        label={'Mobile'}
                        name={'mobile'}
                        placeholder={'Enter your mobile'}
                        value={inputValue.mobile}
                        handleChange={handleChange}
                        type={"number"}
                    />
                    <InputField
                        IsRequire={true}
                        label={'Password'}
                        name={'password'}
                        placeholder={'Enter your password'}
                        value={inputValue.password}
                        handleChange={handleChange}
                        type={"password"}
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
                <CommonButton name={"Submit"} onClick={handleCreate} />
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default AddStaff