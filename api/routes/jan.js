const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const janController = require('../controller/jan');

router.get('/', checkAuth, janController.jan_get_all);
router.post('/', checkAuth, janController.jan_post);
router.get('/:userID', checkAuth, janController.jan_get_one);
router.patch('/:userID', checkAuth, janController.jan_update);
router.delete('/:userID', checkAuth, janController.jan_delete);

module.exports = router;