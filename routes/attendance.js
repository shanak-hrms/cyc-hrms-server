const express = require('express');
const { updateAttandance, deleteAttandance, getAttandance, markAttendance, requestApproval, approveRequest, checkOut, getAttandanceForMonth, getPendingRegularizationRequestById, getAllPendingRegularizationRequests, checkINApprovedAttendance, autoClockout } = require('../controller/attendanceCtrl');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.post('/checkIn',auth,markAttendance);
router.patch('/Approved/attendance/checkIn/:requestId',auth,checkINApprovedAttendance);
router.post('/request/approval',auth,requestApproval);
router.patch('/approve/attendance-request/:requestId',auth,approveRequest);
router.patch('/checkOut/:requestId',auth,checkOut);
router.patch('/auto-clockout',autoClockout);
router.delete('/delete/:userId',auth,deleteAttandance);
router.get('/get',getAttandance);
router.get('/monthly',auth,getAttandanceForMonth);
router.get('/pendinding/request/list',auth,getAllPendingRegularizationRequests);
router.get('/particular/pendinding/request/:pendingId',auth,getPendingRegularizationRequestById);

module.exports = router;

