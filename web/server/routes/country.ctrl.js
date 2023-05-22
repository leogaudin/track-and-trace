const express = require('express');
const CountryCtrl = require('../controllers/country.ctrl');

const router = express.Router();

router.post('/country', CountryCtrl.getCountryName);

module.exports = router;
