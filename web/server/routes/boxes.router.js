const express = require('express');
const BoxCtrl = require('../controllers/boxes.ctrl');

const router = express.Router();

router.post('/box', BoxCtrl.createBox);
router.delete('/box/:id', BoxCtrl.deleteBox);
router.get('/box/:id', BoxCtrl.getBoxById);
router.get('/boxes', BoxCtrl.getBoxes);

module.exports = router;
