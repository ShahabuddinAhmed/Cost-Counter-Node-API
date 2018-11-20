const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const julController = require('../controller/jul');

router.get('/', checkAuth, julController.jul_get_all);
router.post('/', checkAuth, julController.jul_post);
router.get('/:userID', checkAuth, julController.jul_get_one);
router.patch('/:userID', checkAuth, julController.jul_update);
router.delete('/:userID', checkAuth, julController.jul_delete);

module.exports = router;