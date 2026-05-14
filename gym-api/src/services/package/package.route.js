const express = require("express");
const router = express.Router()
const packageController = require('./package.controller.js');
const {authenticate} = require('../../middlewares/auth.middleware.js');
const {requireAdmin} = require('../../middlewares/role.middleware.js');
const { createPackageValidator, updatePackageValidator } = require('./package.validator');
const validate = require('../../middlewares/validate.middleware');

router.get("/", authenticate, packageController.getAllPackages);
router.post("/", authenticate, requireAdmin, createPackageValidator, validate, packageController.createPackage);
router.put("/:id", authenticate, requireAdmin, updatePackageValidator,validate, packageController.updatePackage);
router.delete("/:id", authenticate, requireAdmin, packageController.deletePackage);

module.exports = router;