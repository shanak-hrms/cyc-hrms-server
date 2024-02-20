const express = require('express');
const { assignManagerToEmployee, assignEmployeeToManager, assignEmployeeAsLineManager, assignAssetsToEmployee } = require('../controller/assignRoleStaffCtrl');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.patch('/manager-to-employee/:employeeId/:managerId',auth,assignManagerToEmployee);
router.patch('/employee-to-manager/:employeeId/:managerId',auth,assignEmployeeToManager);
router.patch('/employee-role-manager/:employeeId',auth,assignEmployeeAsLineManager);
router.patch('/assets/to-employee/:employeeId',auth,assignAssetsToEmployee);

module.exports = router;


