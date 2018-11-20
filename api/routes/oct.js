const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const octController = require('../controller/oct');

router.get('/', checkAuth, octController.oct_get_all);
router.post('/', checkAuth, octController.oct_post);
router.get('/:userID', checkAuth, octController.oct_get_one);
router.patch('/:userID', checkAuth, octController.oct_update);
router.delete('/:userID', checkAuth, octController.oct_delete);

module.exports = router;