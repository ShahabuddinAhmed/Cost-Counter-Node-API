const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const decController = require('../controller/dec');

router.get('/', checkAuth, decController.dec_get_all);
router.post('/', checkAuth, decController.dec_post);
router.get('/:userID', checkAuth, decController.dec_get_one);
router.patch('/:userID', checkAuth, decController.dec_update);
router.delete('/:userID', checkAuth, decController.dec_delete);

module.exports = router;