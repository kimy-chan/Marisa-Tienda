const express = require("express");
const upload = require("../middleware/upload.img.middleware")
const productValidator = require("../helpers/product.helper.validator")
const productController = require("../controller/product.controller")

const router = express.Router();

router.post("/add-product",[  upload.array("imagenes") ,productValidator()], productController.addProduct)
router.get("/decription/:idProduduct", productController.descriptionProduct)

module.exports= router;