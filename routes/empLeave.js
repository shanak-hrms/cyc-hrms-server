const express = require('express');
const { appyLeaveRequest, updateLeaveRequest, deleteLeaveRequest, getemployeeLeave, applyForLeave } = require('../controller/empLeaveCtrl');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.post('/apply/request',auth,applyForLeave);
router.put('/update/:userId',updateLeaveRequest);
router.delete('/delete/:userId',deleteLeaveRequest);
router.get('/get',getemployeeLeave);

module.exports = router;   


