const express = require('express');
const { updateAttandance, deleteAttandance, getAttandance, markAttendance } = require('../controller/attendanceCtrl');
const router = express.Router();

router.post('/checkIn',markAttendance);
router.put('/update/:userId',updateAttandance);
router.delete('/delete/:userId',deleteAttandance);
router.get('/get',getAttandance);

module.exports = router;


