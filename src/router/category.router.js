const express = require("express");
const categoryController = require("../controller/category.controller")
const upload = require("../middleware/upload.img.middleware")
const categoryValidator = require("../helpers/category.helper.validator")
const updateCategoriaVali = require("../helpers/update.category.helepr")
const router = express.Router();

router.get("/products/:nameProduct", categoryController.showProduct)
router.get("/update-category/:idCategory", categoryController.updateCategoryForm)
router.post("/update-category/:idCategory", [upload.single("images"), updateCategoriaVali()], categoryController.updateCategory)
router.get("/delete-category/:idCategory/:idImagen", categoryController.deleteCategory)
router.post("/add-category", [upload.single("images"), categoryValidator()], categoryController.addCategory)


module.exports = router;