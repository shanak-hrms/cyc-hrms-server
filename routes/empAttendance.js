const express = require('express');
const { getEmpAttandance, updateEmployeeAttandance, clockIN } = require('../controller/empAttandanceCtrl');
const router = express.Router();

router.post('/create',clockIN);
router.put('/update/:userId',updateEmployeeAttandance);
router.delete('/delete/:userId',);
router.get('/get',getEmpAttandance);

module.exports = router;


