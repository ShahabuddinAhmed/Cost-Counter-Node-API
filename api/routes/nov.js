const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const novController = require('../controller/nov');

router.get('/', checkAuth, novController.nov_get_all);
router.post('/', checkAuth, novController.nov_post);
router.get('/:userID', checkAuth, novController.nov_get_one);
router.patch('/:userID', checkAuth, novController.nov_update);
router.delete('/:userID', checkAuth, novController.nov_delete);

module.exports = router;