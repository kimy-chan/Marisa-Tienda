const express = require("express");

const PedidosController = require("../controller/pedidos.controller")


const router = express.Router();

router.get("/pedido",PedidosController.pedido)

module.exports= router;