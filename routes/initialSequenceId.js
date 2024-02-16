const express = require('express');
const { createInitialSequence } = require('../controller/nextSequenceId');
const router = express.Router();

router.post('/create',createInitialSequence);
router.get('/view/:id',);
router.get('/download/monthly-payroll/:employeeId', );

module.exports = router;


