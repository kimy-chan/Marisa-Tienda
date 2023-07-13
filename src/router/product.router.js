const express = require("express");
const upload = require("../middleware/upload.img.middleware")
const productValidator = require("../helpers/product.helper.validator")
const productoController= require("../controller/product.controller");
const router = express.Router();
router.post("/add-product",[upload.single("image"), productValidator()], productoController.addProduct)
router.get("/show-product-ropa",productoController.showProductRopa)
router.get("/show-product-accesories",productoController.showProductAccessories)
router.get("/add-product",productoController.showFormProduct)

module.exports= router;