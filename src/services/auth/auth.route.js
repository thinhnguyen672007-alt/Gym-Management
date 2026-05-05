const authController = require('./auth.controller');
const express = require('express');
const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/create-admin', authController.createAdmin);

module.exports = router;