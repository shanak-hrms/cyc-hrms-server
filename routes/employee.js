const express = require('express');
const { createNewEmployee, updateEmployeeRecords, deleteEployeeRecord, employeeList, employeeLogin } = require('../controller/employeeCtrl');
const router = express.Router();

router.post('/create',createNewEmployee);
router.post('/login',employeeLogin);
router.put('/update/:userId',updateEmployeeRecords);
router.delete('/delete/:userId',deleteEployeeRecord);
router.get('/get',employeeList);

module.exports = router;


