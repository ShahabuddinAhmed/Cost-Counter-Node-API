const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const aprController = require('../controller/apr');

router.get('/', checkAuth, aprController.apr_get_all);
router.post('/', checkAuth, aprController.apr_post);
router.get('/:userID', checkAuth, aprController.apr_get_one);
router.patch('/:userID', checkAuth, aprController.apr_update);
router.delete('/:userID', checkAuth, aprController.apr_delete);

module.exports = router;