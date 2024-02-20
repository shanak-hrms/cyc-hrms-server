const express = require('express');
const { addLocation, getLocation } = require('../controller/officeLocationCtrl');
const router = express.Router();

router.post('/add/new/location',addLocation);
router.get('/get/location/:locationId',getLocation);
router.get('/get/location/list',getLocation);

module.exports = router;


