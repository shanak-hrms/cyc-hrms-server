const express = require('express');
const {auth} = require('../middleware/auth');
const { addSalaryStructure, getAllSalaryStructures } = require('../controller/salaryCtrl');
const router = express.Router();

router.post('/create/structure',auth,addSalaryStructure);
router.get('/download/all-users-salary',auth,getAllSalaryStructures);


module.exports = router;


