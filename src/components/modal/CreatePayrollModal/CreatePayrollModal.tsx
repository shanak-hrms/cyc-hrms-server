import React, { useEffect, useState } from 'react';
import styles from './CreatePayrollModal.module.scss';
import {
    Box,
    Divider,
    Grid,
    Modal,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import axios from 'axios';
import { baseURL } from '../../../utils/baseURL';

export interface ICreatePayrollModal {
    open: boolean;
    heading: string;
    name?: string;
    payrollVal: any;
    handleCreate: () => void;
    handleClose: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const CreatePayrollModal = ({ open, heading, name, payrollVal, handleCreate, handleClose, handleChange }: ICreatePayrollModal) => {

    const [previewData, setPreviewData] = useState<any>(null);
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken;

    const fetchPayrollPreview = async () => {
        try {
            const res = await axios.post(`${baseURL}/payroll/preview-pay-roll`, {
                employeeId:payrollVal.employeeId,
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
        if (payrollVal.employeeId && payrollVal.month && payrollVal.year) {
            fetchPayrollPreview();
        }
    }, [payrollVal.employeeId, payrollVal.month, payrollVal.year]);

    useEffect(() => {
        if (previewData) {
            const {
                grossSalaryWithoutTA = 0,
            } = previewData;

            const tds = parseFloat(payrollVal.tds || 0);
            const pfEmployee = parseFloat(payrollVal.pfContributionEmployee || 0);
            const esi = parseFloat(payrollVal.esiDeduction || 0);
            const bonusOrOT = parseFloat(payrollVal.bonusOrOT || 0);
            const adminCharges = parseFloat(payrollVal.adminCharges || 0);
            const edliCharges = parseFloat(payrollVal.edliCharges || 0);
            const gratuity = parseFloat(payrollVal.gratuity || 0);

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
                            <Grid item xs={6}><strong>Basic Salary:</strong> ₹{previewData.basicSalary}</Grid>
                            <Grid item xs={6}><strong>HRA:</strong> ₹{previewData.hra}</Grid>
                            <Grid item xs={6}><strong>SpecialAllowance:</strong> ₹{previewData.specialAllowance}</Grid>
                            <Grid item xs={6}><strong>Paid Days:</strong> {previewData.paidDays}</Grid>
                            <Grid item xs={6}><strong>Unpaid Days:</strong> {previewData.unpaidDays}</Grid>
                            <Grid item xs={6}><strong>Total No. Of Days In Month:</strong> {previewData.totalDaysInMonth}</Grid>
                            <Grid item xs={6}><strong>Gross Salary:</strong> ₹{previewData.grossSalaryWithoutTA}</Grid>
                            <Grid item xs={6}><strong>Net Salary:</strong> ₹{previewData.netSalary?.toFixed(2)}</Grid>
                            <Grid item xs={6}><strong>Total Deductions:</strong> ₹{previewData.totalDeductions?.toFixed(2)}</Grid>
                            <Grid item xs={6}><strong>Total CTC:</strong> ₹{previewData.totalCTC?.toFixed(2)}</Grid>
                        </Grid>
                    </Box>
                )}

                <Grid className={styles.action}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={name ?? "Submit"} onClick={handleCreate} disabled={!previewData} />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default CreatePayrollModal;
