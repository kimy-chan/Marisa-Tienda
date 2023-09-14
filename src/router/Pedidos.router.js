const express = require("express");
const pedidosValidator = require("../helpers/pedidos.helper.validator")
const PedidosController = require("../controller/pedidos.controller")


const router = express.Router();

router.get("/pedido", PedidosController.pedido)
router.post("/pedido", [pedidosValidator()], PedidosController.pedidoFinal)
router.get("/get-order", PedidosController.getAllOrder)
router.get("/vender/:idOrder", PedidosController.stateOrder)
router.get("/delete-pedido/:idPersonOrder", PedidosController.deteleOrder)

module.exports = router;