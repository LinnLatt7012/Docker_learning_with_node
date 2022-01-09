var express = require("express");
var router = express.Router();
var authController = require("../controller/authcontroller");

router.post("/signup",authController.Signup)
router.post("/login",authController.Login)
module.exports = router;