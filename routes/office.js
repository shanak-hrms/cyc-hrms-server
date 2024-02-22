const express = require('express');
const { addLocation, getLocation,getLocationById } = require('../controller/officeLocationCtrl');
const router = express.Router();

router.post('/add/new/location',addLocation);
router.get('/get/locationByID/:locationId',getLocationById);
router.get('/get/location/list',getLocation);

module.exports = router;


