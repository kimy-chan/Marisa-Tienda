const express = require("express");
const upload = require("../middleware/upload.img.middleware")
const productValidator = require("../helpers/product.helper.validator")
const productoController= require("../controller/product.controller")

const router = express.Router();

router.post("/add-product",[productValidator(), upload.single("image")], productoController.addProduct)






module.exports= router;