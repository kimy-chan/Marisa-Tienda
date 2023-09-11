const express = require("express");
const upload = require("../middleware/upload.img.middleware")
const productValidator = require("../helpers/product.helper.validator")
const productController = require("../controller/product.controller")
const productValidatorUpdate = require("../helpers/updateProduct.helper")

const router = express.Router();

router.post("/add-product", [upload.array("imagenes"), productValidator()], productController.addProduct)
router.get("/add-product", productController.formProdcut)
router.get("/decription/:idProduct", (req, res) => { productController.descriptionProduct(req, res) })
router.get("/delete-product/:idProduct", productController.deleteProduct)
router.get("/update-product/:idProduct", productController.formUpdateProdcut)
router.post("/update-product/:idProduct", [upload.array("imagenes"), productValidatorUpdate()], productController.updateProduct)
module.exports = router;