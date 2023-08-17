const express = require("express");
const indexController = require("../controller/index.controller");

const router = express.Router();

router.get("/", indexController.index);
router.get("/cant-cart", indexController.cartCantidad);

module.exports = router;
