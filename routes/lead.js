const express = require('express');
const { createLead, updateLeadRecords, deleteLeadRecords, getLeadBusinessList, updateLeadStatus, getParticularLeadDetails, requestLeadUpdate, approveLeadUpdateRequest } = require('../controller/leadBusiness');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.post('/create/new',createLead);
router.patch('/update/record/:leadId',updateLeadRecords);
router.patch('/newstatus/:leadId',updateLeadStatus);
router.patch('/request/to-update-lead-status/:leadId',auth,requestLeadUpdate);
router.patch('/approve/to-requested-status/:leadId',auth,approveLeadUpdateRequest);
router.delete('/delete/particular/:leadId',deleteLeadRecords);
router.get('/all/leads',getLeadBusinessList);
router.get('/particular/record/:leadId',getParticularLeadDetails);

module.exports = router;


