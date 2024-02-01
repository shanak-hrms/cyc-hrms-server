const express = require('express');
const { createLead, updateLeadRecords, deleteLeadRecords, getLeadBusinessList, updateLeadStatus, getParticularLeadDetails } = require('../controller/leadBusiness');
const router = express.Router();

router.post('/create/new',createLead);
router.patch('/update/record/:leadId',updateLeadRecords);
router.patch('/newstatus/:leadId',updateLeadStatus);
router.delete('/delete/particular/:leadId',deleteLeadRecords);
router.get('/all/leads',getLeadBusinessList);
router.get('/particular/record/:leadId',getParticularLeadDetails);

module.exports = router;


