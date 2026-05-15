const express = require("express");
const router = express.Router();
const membershipController = require('./membership.controller');
const { authenticate } = require('../../middlewares/auth.middleware');

router.post("/", authenticate, membershipController.createMembership)

module.exports = router;