const express = require("express");
const router = express.Router()
const packageController = require('./package.controller.js');
const {authenticate} = require('../../middlewares/auth.middleware.js')

router.get("/", authenticate, packageController.getAllPackages);

module.exports = router;