const express = require("express");
const indexController = require("../controller/index.controller");

const router = express.Router();

router.get("/index", indexController.index);

router.get("/", indexController.portadaIndex);
router.get("/cant-cart", indexController.cartCantidad);

module.exports = router;
