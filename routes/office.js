const express = require('express');
const { addLocation, getLocation } = require('../controller/officeLocationCtrl');
const router = express.Router();

router.post('/add/new/location',addLocation);
router.patch('/update/record/:leadId',);
router.patch('/newstatus/:leadId',);
router.delete('/delete/particular/:leadId',);
router.get('/get/location/:locationId',getLocation);
router.get('/particular/record/:leadId',);

module.exports = router;


