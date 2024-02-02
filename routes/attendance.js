const express = require('express');
const { updateAttandance, deleteAttandance, getAttandance, markAttendance, requestApproval, approveRequest, checkOut } = require('../controller/attendanceCtrl');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.post('/checkIn',markAttendance);
router.post('/request/approval',requestApproval);
router.patch('/approve/attendance-request/:requestId',auth,approveRequest);
router.patch('/checkOut/:requestId',auth,checkOut);
router.delete('/delete/:userId',deleteAttandance);
router.get('/get',getAttandance);

module.exports = router;


