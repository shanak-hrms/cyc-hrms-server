const express = require('express');
const {auth} = require('../middleware/auth');
const { createPayrollAndCalculateSalary } = require('../controller/payrollCtrl');
const router = express.Router();

router.post('/create',auth,createPayrollAndCalculateSalary);


module.exports = router;


