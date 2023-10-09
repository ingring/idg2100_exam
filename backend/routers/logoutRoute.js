const express = require('express');
const router = express.Router();
const logout = require('../controllers/logoutController');

//Logging out a user
router.get('/', logout);

module.exports = router;