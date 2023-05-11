const express = require('express');
const AuthCtrl = require('../controllers/auth.ctrl');

const router = express.Router();

router.post('/login', AuthCtrl.handleLogin);
router.post('/register', AuthCtrl.handleRegister);

module.exports = router;
