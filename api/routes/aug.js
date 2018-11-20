const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const augController = require('../controller/aug');

router.get('/', checkAuth, augController.aug_get_all);
router.post('/', checkAuth, augController.aug_post);
router.get('/:userID', checkAuth, augController.aug_get_one);
router.patch('/:userID', checkAuth, augController.aug_update);
router.delete('/:userID', checkAuth, augController.aug_delete);

module.exports = router;