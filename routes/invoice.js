const express = require('express');
const { createInvoice, getInvoices } = require('../controller/invoiceCtrl');
const router = express.Router();

router.post('/create',createInvoice);
router.put('/update/:userId');
router.delete('/delete/:userId');
router.get('/get',getInvoices);

module.exports = router;


