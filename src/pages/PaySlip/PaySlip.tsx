import React, { Fragment, useEffect, useState } from 'react'
import styles from './PaySlip.module.scss'
import { Box, Divider, Grid, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography, ListItemButton, ListItemText, ListItem } from '@mui/material'
import logo from '../../asserst/images/CYC logo-01.png'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SearchBox from '../../components/common/searchBox/SearchBox'
import { errorMonitor } from 'events'
import axios from 'axios'

const PaySlip = () => {
    const navigation = useNavigate()
    const [query, setQuery] = useState("")
    const [data, setData] = useState<any>()

    const getEmployeeData = async () => {
        try {
            const payrollDataStr: any = localStorage.getItem("payrollData")
            const payrollData = JSON.parse(payrollDataStr)
            console.log(payrollData.month, "payrollDataStrgrigbr")
            setData(payrollData)
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getEmployeeData();

    }, [])
    const handleDownload = () => {
        const input: any = document.getElementById('userData');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save('userData.pdf');
            });

    }
    return (
        <Grid className={styles.payslipContainer}>
            <Grid className={styles.payslipHeading}>
                <Typography variant='h5' fontSize={25} fontWeight={600}>Pay Slip</Typography>
                {/* <SearchBox setQuery={setQuery} /> */}
            </Grid>
            <Grid id="userData" className={styles.payslip}>
                <Grid className={styles.payslipField}>
                    <Box>
                        <img src={logo} alt='logo' />
                    </Box>
                    <Box >
                        <Typography textAlign={"center"} fontSize={20} fontWeight={600}>COLOUR YOUR CANVAS </Typography>
                        {/* <Typography textAlign={"center"} fontSize={25} fontWeight={600}> Anytime Anywhere</Typography> */}
                    </Box>
                    <Grid className={styles.addressSection}>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Address:32/1 SAHAPUR , NEW ALIPORE, KOLKATA 700053</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Mail:hr@cycgroup.in</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Phone No: 033-3580-6414</Typography>
                    </Grid>
                    <Typography textAlign={"center"} variant='h4' fontSize={22} fontWeight={600}>Pay Slip</Typography>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>Employee Name :{data?.employeeId?.name}</Typography>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>| Emp Code: {data?.employeeId?.empCode}</Typography>
                    </Box>
                    <Typography variant='h4' fontSize={15} fontWeight={600}>Department :{data?.employeeId?.department}</Typography>

                    <Grid className={styles.designationSection} display={"flex"} justifyContent={"space-between"}>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Designation:{data?.employeeId?.name}</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Status: {data?.employeeId?.empStatus}</Typography>
                    </Grid>
                    <Grid className={styles.designationSection} display={"flex"} justifyContent={"space-between"}>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Month:{data?.month}</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Total Working Days:</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Present Days:</Typography>
                    </Grid>

                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>UAN :{data?.employeeId?.uanNumber}</Typography>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>| ESIC / Group Medical Ref No: {data?.employeeId?.esic}</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>Bank Name: {data?.employeeId?.bankName}</Typography>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}> Bank Account Number:{data?.employeeId?.bankAccount}
                        </Typography>
                    </Box>
                    <Grid className={styles.earningDeductionCOnatiner}>
                        <Grid className={styles.earning}>
                            <Typography textAlign={"center"} variant='h4' fontSize={15} fontWeight={600}>Earnings</Typography>
                            <Grid container>
                                <Grid item sm={6}>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Salary head</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Basic</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>H R A</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Special Allowances </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Transport Allowances</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Gross Salary</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>PF Employer</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>ESI Employer</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Medical</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Telephone</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Others</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Net Salary</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Amount</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.basic?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.hra?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.specialAllowance?.value?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.travelAllowanceDeduction?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>{data?.totalGrossPay?.toFixed(2)}
                                    </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.pfDeductionEmployer?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.esiDeductionEmployer?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>{data?.netPay?.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={styles.deduction}>
                            <Typography textAlign={"center"} variant='h4' fontSize={15} fontWeight={600}>Deductions </Typography>
                            <Grid container>
                                <Grid item sm={6}>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Salary head</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>PF Employee</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>ESI Employee</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Salary Advance</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Professional tax</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Total Deduction</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Amount</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.pfDeductionEmployee?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.esiDeduction?.toFixed(2)}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.ptax}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}></Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>{data?.totalDeductions?.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography>**This is a computer generated receipt and do not require signature**</Typography>
                </Grid>
            </Grid>
            <Grid className={styles.action}>
                <CommonButton name="Cancel" onClick={(() => navigation('/'))} />
                <CommonButton name="Download" onClick={handleDownload} />
            </Grid>
        </Grid>
    )
}

export default PaySlip