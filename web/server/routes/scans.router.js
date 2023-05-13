const express = require('express');
const ScanCtrl = require('../controllers/scans.ctrl');

const router = express.Router();

router.post('/scan', ScanCtrl.createScan);
router.delete('/scan/:id', ScanCtrl.deleteScan);
router.get('/scan/:id', ScanCtrl.getScanById);
router.get('/scans', ScanCtrl.getScans);
router.post('/scans', ScanCtrl.getScansByBoxes);

module.exports = router;
