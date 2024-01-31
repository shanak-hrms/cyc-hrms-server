const express = require('express');
const { createAttandance, updateAttandance, deleteAttandance, getAttandance } = require('../controller/attendanceCtrl');
const router = express.Router();

router.post('/create',createAttandance);
router.put('/update/:userId',updateAttandance);
router.delete('/delete/:userId',deleteAttandance);
router.get('/get',getAttandance);

module.exports = router;


