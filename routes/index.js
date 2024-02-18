const express = require('express');
const router = express.Router();

const office = require('./office')
router.use('/office',office)

const announcement = require('./announcement')
router.use('/announcement',announcement)

const attendance = require('./attendance')
router.use('/attendance', attendance)

const claimsRequest= require('./claimsRequest')
router.use('/claim', claimsRequest)

const salary = require('./salaryStructure')
router.use('/salary',salary)

const initialSequence = require('./initialSequenceId')
router.use('/initialSequence',initialSequence)

const assign = require('./assignStaffRole')
router.use('/assign',assign)

const holiday = require('./holidays')
router.use('/holiday',holiday)

const compOff = require('./compOff')
router.use('/compoff',compOff)

const common = require('./common')
router.use('/common',common)

const userAgreement = require('./userAgreement')
router.use('/userAgreement',userAgreement)

const payroll = require('./payroll')
router.use('/payroll',payroll)

const empLeave = require('./empLeave')
router.use('/empLeave',empLeave)

const invoice = require('./invoice')
router.use('/invoice',invoice)

const lead = require('./lead')
router.use('/lead',lead)

const user = require('./user')
router.use('/user',user)

module.exports = router;
