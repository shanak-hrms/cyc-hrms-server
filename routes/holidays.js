const express = require('express');
const { createHoliday, getAllHolidaysOfYear, getAllHolidaysOfMonth } = require('../controller/holidayCtrl');
const {auth}=require("../middleware/auth")
const router = express.Router();

router.post('/add-to-list',auth,createHoliday);
router.put('/');
router.delete('/delete/:userId');
router.get('/get/all-holidays-of-the-year',getAllHolidaysOfYear);
router.get('/get/all-holidays-of-the-month',getAllHolidaysOfMonth);

module.exports = router;