const express = require('express');
const BoxCtrl = require('../controllers/boxes.ctrl');

const router = express.Router();

router.post('/box', BoxCtrl.createBox);
router.put('/box/:id', BoxCtrl.updateBox);
router.delete('/box/:id', BoxCtrl.deleteBox);
router.get('/box/:id', BoxCtrl.getBoxById);
router.get('/boxs', BoxCtrl.getBoxes);

module.exports = router;
