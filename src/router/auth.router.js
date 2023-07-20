const express = require("express");
const authController =require("../controller/auth.controller")
const {loginValidator}= require("../helpers/auth.helper.validator")



const router = express.Router();
router.post("/login", [loginValidator()],authController.login);
router.get("/login",authController.formLogin)





module.exports= router;