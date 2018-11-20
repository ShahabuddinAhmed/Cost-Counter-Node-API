const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mayController = require('../controller/may');

router.get('/', checkAuth, mayController.may_get_all);
router.post('/', checkAuth, mayController.may_post);
router.get('/:userID', checkAuth, mayController.may_get_one);
router.patch('/:userID', checkAuth, mayController.may_update);
router.delete('/:userID', checkAuth, mayController.may_delete);

module.exports = router;