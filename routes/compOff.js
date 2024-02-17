const express = require('express');
const {auth}=require("../middleware/auth");
const { applyForCompOffDay, useCompOffDay, getCompOffCount, approveCompOff, getCompOffList, getCompOffEmployeeList } = require('../controller/compOffCtrl');
const router = express.Router();

router.post('/apply/for-a-day',auth,applyForCompOffDay);
router.patch('/approve/request/:compOffId',auth,approveCompOff);
router.patch('/use/for-a-day',auth,useCompOffDay);
router.get('/count/all-compoff-uses-for-month',auth,getCompOffCount);
router.get('/get/list',getCompOffList);
router.get('/get/employee-compoff-list',auth,getCompOffEmployeeList);

module.exports = router;