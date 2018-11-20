const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const marController = require('../controller/mar');

router.get('/', checkAuth, marController.mar_get_all);
router.post('/', checkAuth, marController.mar_post);
router.get('/:userID', checkAuth, marController.mar_get_one);
router.patch('/:userID', checkAuth, marController.mar_update);
router.delete('/:userID', checkAuth, marController.mar_delete);

module.exports = router;