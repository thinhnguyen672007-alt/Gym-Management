const express = require("express");
const router = express.Router();
const membershipController = require('./membership.controller');
const { authenticate } = require('../../middlewares/auth.middleware');

router.post("/", authenticate, membershipController.createMembership);
router.get("/me", authenticate, membershipController.getMyMemberships);

module.exports = router;