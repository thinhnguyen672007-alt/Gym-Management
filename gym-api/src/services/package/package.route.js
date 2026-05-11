const express = require("express");
const router = express.Router()
const packageController = require('./package.controller.js');
const {authenticate} = require('../../middlewares/auth.middleware.js');
const {requireAdmin} = require('../../middlewares/role.middleware.js');

router.get("/", authenticate, packageController.getAllPackages);
router.post("/", authenticate, requireAdmin, packageController.createPackage);

module.exports = router;