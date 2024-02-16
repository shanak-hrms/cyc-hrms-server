const express = require('express');
const { createUserAgreement, updateUserAgreement, getAgreement } = require('../controller/userAgreementCtrl');
const router = express.Router();

router.post('/create',createUserAgreement);
router.patch('/update',updateUserAgreement);
router.get('/get/details',getAgreement);


module.exports = router;


