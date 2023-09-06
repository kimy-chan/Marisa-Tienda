const express = require("express");
const productController = require("../controller/product.controller");
const CategoryController = require("../controller/category.controller");
const AdministrationController = require("../controller/administration.controller");
const productValidator = require("../helpers/product.helper.validator");


const router = express.Router();

router.get("/products-panel", [productValidator()], (req,res)=>{ productController.getProductAllPanel(req,res)});
router.get("/category-panel",  CategoryController.categoryPanel);
router.get("/administration-panel",AdministrationController.Administration)
module.exports = router;
