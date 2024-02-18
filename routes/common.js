const express = require('express');
const { calculateAndCreditLeave } = require('../services/leaveCalculator');
const router = express.Router();

router.get('/calculate-attendance/credit-leave',calculateAndCreditLeave);

module.exports = router;