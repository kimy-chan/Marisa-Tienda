const express = require("express");
const categoryController= require("../controller/category.controller")
const upload = require("../middleware/upload.img.middleware")
const categoryValidator = require("../helpers/category.helper.validator")

const router = express.Router();

router.get("/products/:nameProduct",categoryController.showProduct)
router.get("/delete-category/:idCategory", categoryController.deleteCategory)
router.post("/add-category", [ upload.single("images"), categoryValidator()], categoryController.addCategory)


module.exports= router;