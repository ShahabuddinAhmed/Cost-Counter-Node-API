const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controller/user');

router.get('/',checkAuth, userController.get_all_user);
router.post('/register', userController.user_register);
router.post('/login', userController.user_login);
router.get('/:userID', checkAuth, userController.get_one_user);
router.patch('/update/:userID', checkAuth, userController.update_user);
router.delete('/delete/:userID', checkAuth, userController.detelete_user);

module.exports = router;