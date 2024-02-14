import React, { Fragment, useEffect, useState } from 'react'
import styles from './PaySlip.module.scss'
import { Box, Divider, Grid, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography, ListItemButton, ListItemText, ListItem } from '@mui/material'
import logo from '../../asserst/images/LOGO_CYC2.png'
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
            console.log(payrollData.month, "payrollDataStr")
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
                <SearchBox setQuery={setQuery} />
            </Grid>
            <Grid id="userData" className={styles.payslip}>
                <Grid className={styles.payslipField}>
                    <Box>
                        <Typography variant='h2' fontSize={25} fontWeight={600}>Company Name</Typography>
                        <img src={logo} alt='logo' />
                    </Box>
                    <Grid className={styles.addressSection}>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Address:</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Mail:hr@cycevents.in</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Phone No: 033-3580-6414</Typography>
                    </Grid>
                    <Typography textAlign={"center"} variant='h4' fontSize={22} fontWeight={600}>Pay Slip for Month of {data?.month},2024</Typography>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>Employee Name :{data?.employeeId?.name}</Typography>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>| Emp Code: </Typography>
                    </Box>
                    <Typography variant='h4' fontSize={15} fontWeight={600}>Department :</Typography>

                    <Grid className={styles.designationSection} display={"flex"} justifyContent={"space-between"}>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Designation:</Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>| Emp Band: </Typography>
                        <Typography variant='h4' fontSize={15} fontWeight={600}>Status: Permanent</Typography>
                    </Grid>
                    <Typography variant='h4' fontSize={15} fontWeight={600}>Payment Mode :</Typography>
                    <Typography variant='h4' fontSize={15} fontWeight={600}>Present Days:</Typography>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>UAN :</Typography>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>| ESIC / Group Medical Ref No: </Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}>Bank Name: </Typography>
                        <Typography sx={{ width: "50%" }} variant='h4' fontSize={15} fontWeight={600}> Bank Account Number:
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
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Incentives (If applicable)
                                    </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Gross Salary</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Net Salary(Payable)</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Amount</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.basic}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.hra}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>12 </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.travelAllowanceDeduction}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Incentives (If applicable)
                                    </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>{data?.totalGrossPay}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>{data?.netPay}</Typography>
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
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Salary Advance </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Professional tax</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Incentives (If applicable)
                                    </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Total Deduction</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}></Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>Amount</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.pfDeductionEmployee}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.esiDeduction}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>12 </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>{data?.ptax}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={500}>Incentives (If applicable)
                                    </Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}>{data?.totalDeductions}</Typography>
                                    <Typography variant='h5' fontSize={15} fontWeight={600}></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
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