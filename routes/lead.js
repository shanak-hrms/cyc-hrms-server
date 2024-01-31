const express = require('express');
const { createLead, updateLeadRecords, deleteLeadRecords, getLeadBusinessList } = require('../controller/leadBusiness');
const router = express.Router();

router.post('/create',createLead);
router.put('/update/:userId',updateLeadRecords);
router.delete('/delete/:userId',deleteLeadRecords);
router.get('/get',getLeadBusinessList);

module.exports = router;


