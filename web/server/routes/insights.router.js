const express = require('express');
const InsightsCtrl = require('../controllers/insights.ctrl');

const router = express.Router();

router.post('/insights', InsightsCtrl.setInsights);
router.get('/insights/:id', InsightsCtrl.getInsights);

module.exports = router;
