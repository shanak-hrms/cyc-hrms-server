const express = require('express');
const { appyLeaveRequest, updateLeaveRequest, deleteLeaveRequest, getemployeeLeave } = require('../controller/empLeaveCtrl');
const router = express.Router();

router.post('/create',appyLeaveRequest);
router.put('/update/:userId',updateLeaveRequest);
router.delete('/delete/:userId',deleteLeaveRequest);
router.get('/get',getemployeeLeave);

module.exports = router;   


