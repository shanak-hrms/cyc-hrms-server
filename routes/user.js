const express = require('express');
const { findUserList, register, Login, deleteUserReocrds, updateUserRecords, updateUserByHRAdmin, updateUserPasswordByHRAdmin, getUserProfile, acceptAgreement } = require('../controller/userCtrl');
const {auth }= require('../middleware/auth');
const router = express.Router();

router.post('/signUp',register);
router.post('/login',Login);
router.patch('/update/profile',auth, updateUserRecords);
router.patch('/update/user-profile/byadmin-hr/:userId',auth, updateUserByHRAdmin);
router.patch('/new/user/password',auth, updateUserPasswordByHRAdmin);
router.patch('/accept/user-agreement',auth, acceptAgreement);
router.delete('/delete/:userId',deleteUserReocrds);
router.get('/get',findUserList);
router.get('/get/profile',auth,getUserProfile);

module.exports = router;


  