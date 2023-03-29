const express = require('express');
const AdminCtrl = require('../controllers/admins.ctrl');

const router = express.Router();

router.post('/admin', AdminCtrl.addAdmin);
router.delete('/admin/:id', AdminCtrl.deleteAdmin);
router.get('/admin/:id', AdminCtrl.getAdminById);
router.get('/admins', AdminCtrl.getAdmins);

module.exports = router;
