const express = require("express");
const categoryController= require("../controller/category.controller")


const router = express.Router();

router.get("/blusas",categoryController.showProductBlusa)
router.get("/vestidos",categoryController.showProductVestidos)
router.get("/accesorios",categoryController.showProductAccesorios)



module.exports= router;


