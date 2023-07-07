const express = require("express");
const userController= require("../controller/user.controller")

const router = express.Router();
router.post("/add-user",userController.addUser);





module.exports= router;