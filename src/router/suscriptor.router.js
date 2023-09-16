const express = require("express");
const SuscriptorController = require("../controller/suscriptores.controller");
const suscriptorValidator = require("../helpers/suscriptor.helper.validator");


const router = express.Router();

router.post("/suscribirse", [suscriptorValidator()], SuscriptorController.addSuscriptor)
router.get("/suscriptores", SuscriptorController.getSuscriptores)


module.exports = router;