const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const sepController = require('../controller/sep');

router.get('/', checkAuth, sepController.sep_get_all);
router.post('/', checkAuth, sepController.sep_post);
router.get('/:userID', checkAuth, sepController.sep_get_one);
router.patch('/:userID', checkAuth, sepController.sep_update);
router.delete('/:userID', checkAuth, sepController.sep_delete);

module.exports = router;