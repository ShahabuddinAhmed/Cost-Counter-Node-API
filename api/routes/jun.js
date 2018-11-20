const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const junController = require('../controller/jun');

router.get('/', checkAuth, junController.jun_get_all);
router.post('/', checkAuth, junController.jun_post);
router.get('/:userID', checkAuth, junController.jun_get_one);
router.patch('/:userID', checkAuth, junController.jun_update);
router.delete('/:userID', checkAuth, junController.jun_delete);

module.exports = router;