const express = require("express");
const categoryController= require("../controller/category.controller")


const router = express.Router();

router.get("/products/:nameProduct",categoryController.showProductBlusa)


module.exports= router;