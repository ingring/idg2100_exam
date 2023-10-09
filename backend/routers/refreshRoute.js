const express = require('express');
const router = express.Router();
const handleRefreshToken = require('../controllers/refreshController');

//Refresh the accesstoken
router.get('/', handleRefreshToken);

module.exports = router;