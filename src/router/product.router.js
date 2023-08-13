const express = require("express");
const upload = require("../middleware/upload.img.middleware")
const productValidator = require("../helpers/product.helper.validator")
const productController= require("../controller/product.controller");
const router = express.Router();
router.post("/add-product",[upload.single("image"), productValidator()], productController.addProduct)
router.get("/add-product",productController.showFormProduct)
router.delete("/delete-product/:idProduct/:idPhoto",productController.deleteProduct) 
router.get("/decription/:idProduduct",productController.descriptionProduct )
 

module.exports= router;