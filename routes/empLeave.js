const express = require('express');
const { appyLeaveRequest, updateLeaveRequest, deleteLeaveRequest, getemployeeLeave, applyForLeave, getPendingLeave, getApprovedLeave, approveLeaveRequest, getApprovedLeaveForUser, getRejectedLeaveForUSer, rejectLeaveRequest, getParticularLeaveByID } = require('../controller/empLeaveCtrl');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.post('/apply/request',auth,applyForLeave);
router.patch('/approve/request/:leaveRequestId',auth,approveLeaveRequest);
router.patch('/reject/request/:leaveRequestId',auth,rejectLeaveRequest);
router.delete('/delete/:userId',deleteLeaveRequest);
router.get('/pending/request/list',auth,getPendingLeave);
router.get('/approved/request/list',auth,getApprovedLeave);
router.get('/approved/request/list/foruser',auth,getApprovedLeaveForUser);
router.get('/rejected/request/list',auth,getApprovedLeave);
router.get('/rejected/request/list/foruser',auth,getRejectedLeaveForUSer);
router.get('/particular/request/byId/:requestId',auth,getParticularLeaveByID);

module.exports = router;   


