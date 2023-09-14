const express = require("express");
const SalesController = require("../controller/sales.controller")

const router = express.Router();

router.get("/ventas", SalesController.getSales)
router.get("/delete-sales/:idSales", SalesController.deleteSales)


module.exports = router;