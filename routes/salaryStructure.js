const express = require('express');
const {auth} = require('../middleware/auth');
const { addSalaryStructure } = require('../controller/salaryCtrl');
const router = express.Router();

router.post('/create/structure',auth,addSalaryStructure);


module.exports = router;


