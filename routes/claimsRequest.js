const express = require('express');
const { createClaimsRequest, updateClaimRequest, deleteClaimsRequest, getClaimsRequest } = require('../controller/claimsRequestCtrl');
const router = express.Router();

router.post('/create',createClaimsRequest);
router.put('/update/:userId',updateClaimRequest);
router.delete('/delete/:userId',deleteClaimsRequest);
router.get('/get',getClaimsRequest);

module.exports = router;


