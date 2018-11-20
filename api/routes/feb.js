const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const febController = require('../controller/feb');

router.get('/', checkAuth, febController.feb_get_all);
router.post('/', checkAuth, febController.feb_post);
router.get('/:userID', checkAuth, febController.feb_get_one);
router.patch('/:userID', checkAuth, febController.feb_update);
router.delete('/:userID', checkAuth, febController.feb_delete);

module.exports = router;