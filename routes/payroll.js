const express = require('express');
const {auth} = require('../middleware/auth');
const { createPayrollAndCalculateSalary, getPayrollById ,downloadPayrollMonthly} = require('../controller/payrollCtrl');
const router = express.Router();

router.post('/create',auth,createPayrollAndCalculateSalary);
router.get('/view/:id',getPayrollById);
router.get('/download/monthly-payroll/:employeeId', downloadPayrollMonthly);

module.exports = router;


