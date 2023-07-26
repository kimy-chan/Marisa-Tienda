const express = require("express");
const cartController=require("../controller/cart.controller")
const router = express.Router();

router.get("/add-cart/:idCart/:idCategory",cartController.addCart)
router.get("/cart",cartController.cart)






module.exports= router;