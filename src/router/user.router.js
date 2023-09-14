const express = require("express");
const userController = require("../controller/user.controller")
const userValidator = require("../helpers/register.user.helper.validator")

const router = express.Router();
router.post("/register", [userValidator()], userController.registerUser);
router.get("/register", userController.register);
router.get("/user", userController.getUserPanel);





module.exports = router;