const express = require('express');
const {auth} = require('../middleware/auth');
const { createPayrollAndCalculateSalary, getPayrollById ,downloadPayrollMonthly, downloadPayrollMonthlyByUser, requestToDownloadPayroll, approvePayrollDownloadRequest, getPendingPayrollDownloadRequests} = require('../controller/payrollCtrl');
const router = express.Router();

router.post('/create',auth,createPayrollAndCalculateSalary);
router.patch('/request/to-download-payroll',auth,requestToDownloadPayroll);
router.patch('/approve/to-download-payroll-by-user/:payrollId',auth,approvePayrollDownloadRequest);

router.get('/view/:id',getPayrollById);
router.get('/download/monthly-payroll/:employeeId', downloadPayrollMonthly);
router.get('/download/monthly-payroll-by-user',auth,downloadPayrollMonthlyByUser);
router.get('/get/pending/payroll-download-request',auth,getPendingPayrollDownloadRequests);

module.exports = router;


