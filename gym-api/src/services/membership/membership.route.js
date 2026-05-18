const express = require("express");
const router = express.Router();
const membershipController = require('./membership.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { requireAdmin } = require('../../middlewares/role.middleware');

router.post("/", authenticate, membershipController.createMembership);
router.get("/me", authenticate, membershipController.getMyMemberships);
router.get("/all", authenticate, requireAdmin, membershipController.getAllMemberships);
router.put("/:id/cancel", authenticate, membershipController.cancelMembership);



module.exports = router;