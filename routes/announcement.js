const express = require('express');
const router = express.Router();

const { create,updateAnnouncement, getAnnouncement, deleteAnnouncement } = require('../controller/announcementCtrl');
router.post('/create',create);
router.put('/update/:userId',updateAnnouncement);
router.delete('/delete/:userId',deleteAnnouncement);
router.get('/get',getAnnouncement);

module.exports = router;


