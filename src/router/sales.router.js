const express = require("express");
const  SalesController = require("../controller/sales.controller")

const router = express.Router();

router.get("/ventas" ,SalesController.getSales)


module.exports= router;