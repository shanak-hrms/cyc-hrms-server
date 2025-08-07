import React, { useEffect, useState } from 'react';
import styles from './CreatePayrollModal.module.scss';
import { Box, Divider, Grid, Modal, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import axios from 'axios';
import { baseURL } from '../../../utils/baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export interface ICreatePayrollModal {
    open: boolean;
    heading: string;
    name?: string;
    selectedEmpId: string,
    handleClose: () => void;
    setPayrollModal: (open: boolean) => void;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const CreatePayrollModal = ({ open, heading, name, handleClose, selectedEmpId, setPayrollModal }: ICreatePayrollModal) => {
      const navigation = useNavigate()
    const [previewData, setPreviewData] = useState<any>(null);
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken;
   console.log("selectedEmpId",selectedEmpId)
    const [payrollVal, setPayrollVal] = useState({
        employeeId: selectedEmpId,
        month: "",
        year: "",
        tds: 0,
        pfContributionEmployer: 0,
        pfContributionEmployee: 0,
        esiDeduction: 0,
        bonusOrOT: 0,
        adminCharges: 0,
        edliCharges: 0,
        gratuity: 0
    });

    useEffect(() => {
        setPayrollVal(prev => ({ ...prev, employeeId: selectedEmpId }))
    }, [selectedEmpId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: any; value: unknown }>) => {
        const { name, value } = e.target;
        setPayrollVal((prev: any) => ({
            ...prev,
            [name as string]: value,
        }));
    };


    const fetchPayrollPreview = async () => {
        try {
            const res = await axios.post(`${baseURL}/payroll/preview-pay-roll`, {
                employeeId: selectedEmpId,
                month: payrollVal.month,
                year: payrollVal.year
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPreviewData(res.data.preview);
        } catch (err) {
            console.error("Error fetching preview", err);
            setPreviewData(null);
        }
    };

    useEffect(() => {
        if (selectedEmpId && payrollVal.month && payrollVal.year) {
            fetchPayrollPreview();
        }
    }, [payrollVal.month, payrollVal.year, selectedEmpId]);

    useEffect(() => {
        if (previewData) {
            const {
                grossSalaryWithoutTA = 0,
            } = previewData;

            const tds = parseFloat(String(payrollVal.tds || 0));
            const pfEmployee = parseFloat(String(payrollVal.pfContributionEmployee || 0));
            const esi = parseFloat(String(payrollVal.esiDeduction || 0));
            const bonusOrOT = parseFloat(String(payrollVal.bonusOrOT || 0));
            const adminCharges = parseFloat(String(payrollVal.adminCharges || 0));
            const edliCharges = parseFloat(String(payrollVal.edliCharges || 0));
            const gratuity = parseFloat(String(payrollVal.gratuity || 0));

            const totalDeductions = tds + pfEmployee + esi;
            const adjustment = 0;
            const netSalary = grossSalaryWithoutTA + bonusOrOT - totalDeductions + adjustment;
            const totalCTC = grossSalaryWithoutTA + adminCharges + edliCharges + gratuity;

            setPreviewData((prev: any) => ({
                ...prev,
                netSalary,
                totalDeductions,
                totalCTC
            }));
        }
    }, [
        payrollVal.tds,
        payrollVal.pfContributionEmployee,
        payrollVal.esiDeduction,
        payrollVal.bonusOrOT,
        payrollVal.adminCharges,
        payrollVal.edliCharges,
        payrollVal.gratuity
    ]);

    const handleCreatePayroll = async () => {
        const loginedUserString: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserString)
        const { token } = loginedUser
        if (payrollVal.month === "") {
            toast.error("Please fill month");
            return;
        } else if (payrollVal.year === "") {
            toast.error("Please fill year")
            return;
        }

        if (!payrollVal.employeeId) {
            toast.error("Employee ID is missing");
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/payroll/create`, payrollVal,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success("Payroll created successfuly")
                setPayrollModal(false);
                setPayrollVal({
                    employeeId: "",
                    month: "",
                    year: "",
                    tds: 0,
                    pfContributionEmployer: 0,
                    pfContributionEmployee: 0,
                    esiDeduction: 0,
                    bonusOrOT: 0,
                    adminCharges: 0,
                    edliCharges: 0,
                    gratuity: 0
                })
            }
        }
        catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || "")
        }
    }


    const handleCancel = async () => {
        await handleClose();
        setPayrollVal({
            employeeId: "",
            month: "",
            year: "",
            tds: 0,
            pfContributionEmployer: 0,
            pfContributionEmployee: 0,
            esiDeduction: 0,
            bonusOrOT: 0,
            adminCharges: 0,
            edliCharges: 0,
            gratuity: 0
        });
        setPreviewData(null)
    }

      const handleDownload = async () => {
        try {
          const response = await axios.get(`${baseURL}/payroll/download/monthly-payroll/${selectedEmpId}?month=${payrollVal?.month}&year=${payrollVal?.year}`
          )
          if (response.status === 200) {
            toast.success("success")
            const payrollData = response.data.payroll;
            localStorage.setItem("payrollData", JSON.stringify(payrollData))
            navigation('/pay-slip-preview')
          }
        }
        catch (error:any) {
          console.log(error)
          toast.error(error?.response?.data?.message || "")
        }
      }
    return (
        <Modal open={open} className={styles.createPayrollModal}>
            <Grid className={styles.createPayroll}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2} className={styles.createField}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="month-label">Month</InputLabel>
                            <Select
                                labelId="month-label"
                                id="month"
                                name="month"
                                value={payrollVal.month}
                                label="Month"
                                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)}
                            >
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField label="Year" name="year" placeholder="Enter year" value={payrollVal.year} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="TDS" name="tds" placeholder="Enter TDS" value={payrollVal.tds} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="Employer PF Contribution" name="pfContributionEmployer" placeholder="Enter employer PF contribution" value={payrollVal.pfContributionEmployer} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="Employee PF Contribution" name="pfContributionEmployee" placeholder="Enter employee PF contribution" value={payrollVal.pfContributionEmployee} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="ESI Deduction" name="esiDeduction" placeholder="Enter ESI deduction" value={payrollVal.esiDeduction} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="Bonus / OT" name="bonusOrOT" placeholder="Enter bonus or OT" value={payrollVal.bonusOrOT} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="Admin Charges" name="adminCharges" placeholder="Enter admin charges" value={payrollVal.adminCharges} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="EDLI Charges" name="edliCharges" placeholder="Enter EDLI charges" value={payrollVal.edliCharges} handleChange={handleChange} type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField label="Gratuity" name="gratuity" placeholder="Enter gratuity" value={payrollVal.gratuity} handleChange={handleChange} type="number" />
                    </Grid>
                </Grid>

                {previewData && (
                    <Box className={styles.previewBox} mt={3} mb={2}>
                        <Typography variant="h6" mb={1}>Payroll Preview</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><strong>Paid Days:</strong> {previewData.paidDays}</Grid>
                            <Grid item xs={6}><strong>Unpaid Days:</strong> {previewData.unpaidDays}</Grid>
                            <Grid item xs={6}><strong>Total No. Of Days In Month:</strong> {previewData.totalDaysInMonth}</Grid>
                            <br />
                            <Grid item xs={6}><strong>Basic Salary:</strong> ₹{previewData.basicSalary}</Grid>
                            <Grid item xs={6}><strong>HRA:</strong> ₹{previewData.hra}</Grid>
                            <Grid item xs={6}><strong>SpecialAllowance:</strong> ₹{previewData.specialAllowance}</Grid>
                            <br />

                            <Grid item xs={6}><strong>Gross Salary WithoutTA:</strong> ₹{previewData.grossSalaryWithoutTA}</Grid>
                            <Grid item xs={6}><strong>Travel Allowance:</strong> ₹{previewData.travelAllowance}</Grid>
                            <Grid item xs={6}><strong>Gross Salary With TA:</strong> ₹{previewData.grossSalaryWithTA}</Grid>
                            <br />

                            <Grid item xs={6}><strong>PF Contribution Employee:</strong> ₹{previewData.pfContributionEmployee}</Grid>
                            <Grid item xs={6}><strong>PF Contribution Employer:</strong> ₹{previewData.pfContributionEmployer}</Grid>
                            <br />

                            <Grid item xs={6}><strong>P Tax:</strong> ₹{previewData.ptax}</Grid>
                            <Grid item xs={6}><strong>TDS:</strong> ₹{previewData.tds}</Grid>
                            <Grid item xs={6}><strong>Adjustment:</strong> ₹{previewData.adjustment}</Grid>
                            <Grid item xs={6}><strong>Total Deductions:</strong> ₹{previewData.totalDeductions?.toFixed(2)}</Grid>
                            <br />
                            <Grid item xs={6}><strong>Bonus Or OT:</strong> ₹{previewData.bonusOrOT?.toFixed(2)}</Grid>
                            <br />
                            <Grid item xs={6}><strong>Net Salary:</strong> ₹{previewData.netSalary?.toFixed(2)}</Grid>
                            <br />
                            <Grid item xs={6}><strong>Admin Charges:</strong> ₹{previewData.adminCharges?.toFixed(2)}</Grid>
                            <Grid item xs={6}><strong>EDLI Charges:</strong> ₹{previewData.edliCharges?.toFixed(2)}</Grid>
                            <Grid item xs={6}><strong>Gratuity:</strong> ₹{previewData.gratuity?.toFixed(2)}</Grid>

                            <Grid item xs={6}><strong>Total CTC:</strong> ₹{previewData.totalCTC?.toFixed(2)}</Grid>
                        </Grid>
                    </Box>
                )}

                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleCancel} />
                   {heading==="Create Payroll" && <CommonButton name={name ?? "Submit"} onClick={handleCreatePayroll} disabled={!previewData} />}
                    {heading === "Download Pay Slip" && <CommonButton name={name ?? "Submit"} onClick={handleDownload} disabled={!previewData} />}
                </Grid>
            </Grid>
        </Modal>
    );
};

export default CreatePayrollModal;
