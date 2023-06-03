const express = require('express');
const BoxCtrl = require('../controllers/boxes.ctrl');

const router = express.Router();

router.post('/box', BoxCtrl.createBox);
router.post('/boxes', BoxCtrl.createBoxes);
router.delete('/box/:id', BoxCtrl.deleteBox);
router.delete('/boxes', BoxCtrl.deleteBoxes);
router.get('/box/:id', BoxCtrl.getBoxById);
router.get('/boxes', BoxCtrl.getBoxes);
router.get('/boxes/:adminId', BoxCtrl.getBoxesByAdminId);

module.exports = router;
