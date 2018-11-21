const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/admin-auth');
const adminController = require('../controller/admin');

router.get('/', checkAuth, adminController.getAllAdmin);
router.post('/register',checkAuth, adminController.createAdmin);
router.post('/login', adminController.adminLogin);
router.get('/:userID', checkAuth, adminController.getOneAdmin);
router.patch('/:userID', checkAuth, adminController.updateAdmin);
router.delete('/:userID', checkAuth, adminController.deleteAdmin);

module.exports = router;