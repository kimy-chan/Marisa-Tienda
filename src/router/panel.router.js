const express = require("express");
const productController = require("../controller/product.controller");
const CategoryController = require("../controller/category.controller");
const AdministrationController = require("../controller/administration.controller");
const productValidator = require("../helpers/product.helper.validator");
const VerifyCookie = require("../middleware/cookie.middleware");
const rolesUser = require("../middleware/roles.middleware")


const router = express.Router();

router.get("/products-panel", [productValidator()], (req, res) => { productController.getProductAllPanel(req, res) });
router.get("/category-panel", CategoryController.categoryPanel);
router.get("/administration-panel", [VerifyCookie, rolesUser], AdministrationController.Administration)
module.exports = router;
