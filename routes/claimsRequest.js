const express = require('express');
const {auth} = require('../middleware/auth');
const { requestClaim, approveClaim, rejectClaim, getAllClaimsOfUser } = require('../controller/claimsRequestCtrl');
const router = express.Router();

router.post('/apply/request',auth,requestClaim);
router.patch('/approve/request/:claimId',auth,approveClaim);
router.patch('/reject/request/:claimId',auth,rejectClaim);
router.get('/all/request/list/ofuser',auth,getAllClaimsOfUser);


module.exports = router;   


