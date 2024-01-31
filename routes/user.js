const express = require('express');
const { findUserList, register, Login, deleteUserReocrds, updateUserRecords } = require('../controller/userCtrl');
const router = express.Router();

router.post('/signUp',register);
router.post('/login',Login);
router.put('/update/:userId',updateUserRecords);
router.delete('/delete/:userId',deleteUserReocrds);
router.get('/get',findUserList);

module.exports = router;


  