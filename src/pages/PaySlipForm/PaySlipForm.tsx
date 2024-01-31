import React, { useState } from 'react'
import styles from './PaySlipForm.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import InputField from '../../components/inputField/InputField'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import { useNavigate } from 'react-router-dom'

const PaySlipForm = () => {
    const navigation = useNavigate();
    const [inputValue, setInputValue] = useState({ emp_name: "", emp_code: '', department: "", designation: "", presentDays: "", emp_band: "", paymentMode: "", status: '', uan: "", esic: "", bankName: "", accNumber: "", basic: "", hra: "", specialAllowances: "", transportAllowances: "", Incentives: "", grossSalary: "", netSalary: "", pf: "", esi: "", salaryAdvance: "", tax: "", totalDeduction: "", amountInWord: "" });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })

    }
    console.log(inputValue, "inputValue...")
    const handleContinue = async () => {
        try {
            navigation('/pay-slip')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Grid className={styles.payslipformContainer}>
            <Typography textAlign={"center"} variant='h2' fontSize={28} fontWeight={600}> Pay Slip Form</Typography>
            <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
            <Typography variant='h4' fontSize={18} fontWeight={600}>Pay Slip for Month of ____,2024</Typography>
            <Grid className={styles.payslipform}>
                <Box>
                    <InputField
                        label={'Employee Name'}
                        name={'emp_name'}
                        placeholder={''}
                        value={inputValue.emp_name}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Department'}
                        name={'department'}
                        placeholder={''}
                        value={inputValue.department}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Present Days'}
                        name={'presentDays'}
                        placeholder={''}
                        value={inputValue.presentDays}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Payment Mode'}
                        name={'paymentMode'}
                        placeholder={''}
                        value={inputValue.paymentMode}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'UAN'}
                        name={'uan'}
                        placeholder={''}
                        value={inputValue.uan}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Bank Name'}
                        name={'bankName'}
                        placeholder={''}
                        value={inputValue.bankName}
                        handleChange={handleChange}
                        type={undefined}
                    />

                </Box>
                <Box>
                    <InputField
                        label={'Emp Code'}
                        name={'emp_code'}
                        placeholder={''}
                        value={inputValue.emp_code}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Designation'}
                        name={'designation'}
                        placeholder={''}
                        value={inputValue.designation}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Emp Band'}
                        name={'emp_band'}
                        placeholder={''}
                        value={inputValue.emp_band}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Status'}
                        name={'status'}
                        placeholder={''}
                        value={inputValue.status}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={"ESIC / Group Medical Ref No"}
                        name={'esic'}
                        placeholder={''}
                        value={inputValue.esic}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={"Bank Account Number"}
                        name={'accNumber'}
                        placeholder={''}
                        value={inputValue.accNumber}
                        handleChange={handleChange}
                        type={undefined}
                    />
                </Box>
            </Grid>
            <Typography variant='h4' fontSize={18} fontWeight={600}>Earnings</Typography>
            <Grid className={styles.earningsContainer}>
                <Box>
                    <InputField
                        label={'Basic'}
                        name={'basic'}
                        placeholder={''}
                        value={inputValue.basic}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Special Allowances'}
                        name={'specialAllowances'}
                        placeholder={''}
                        value={inputValue.specialAllowances}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Incentives (If applicable)'}
                        name={'Incentives'}
                        placeholder={''}
                        value={inputValue.Incentives}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Net Salary(Payable)'}
                        name={'netSalary'}
                        placeholder={''}
                        value={inputValue.netSalary}
                        handleChange={handleChange}
                        type={undefined}
                    />
                </Box>
                <Box>
                    <InputField
                        label={'H R A'}
                        name={'hra'}
                        placeholder={''}
                        value={inputValue.hra}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Transport Allowances'}
                        name={'transportAllowances'}
                        placeholder={''}
                        value={inputValue.transportAllowances}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Gross Salary'}
                        name={'grossSalary'}
                        placeholder={''}
                        value={inputValue.grossSalary}
                        handleChange={handleChange}
                        type={undefined}
                    />
                </Box>

            </Grid>
            <Typography variant='h4' fontSize={18} fontWeight={600}>Deductions</Typography>
            <Grid className={styles.deductionsContainer}>
                <Box>
                    <InputField
                        label={'PF Employee'}
                        name={'pf'}
                        placeholder={''}
                        value={inputValue.pf}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Salary Advance '}
                        name={'salaryAdvance'}
                        placeholder={''}
                        value={inputValue.salaryAdvance}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Total Deduction'}
                        name={'totalDeduction'}
                        placeholder={''}
                        value={inputValue.totalDeduction}
                        handleChange={handleChange}
                        type={undefined}
                    />
                </Box>
                <Box>
                    <InputField
                        label={'ESI Employee'}
                        name={'esi'}
                        placeholder={''}
                        value={inputValue.esi}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Professional tax'}
                        name={'tax'}
                        placeholder={''}
                        value={inputValue.tax}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Amount in Words'}
                        name={'amountInWord'}
                        placeholder={''}
                        value={inputValue.amountInWord}
                        handleChange={handleChange}
                        type={undefined}
                    />
                </Box>

            </Grid>
            <Grid className={styles.action}>
                <CommonButton name={"Cancel"} onClick={(() => navigation('/'))} />
                <CommonButton name={"Continue"} onClick={handleContinue} />
            </Grid>
        </Grid>
    )
}

export default PaySlipForm