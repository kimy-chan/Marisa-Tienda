const express = require("express");
const SuscriptorController = require("../controller/suscriptores.controller");
const suscriptorValidator = require("../helpers/suscriptor.helper.validator");
const VerifyCookie = require("../middleware/cookie.middleware");
const rolesUser = require("../middleware/roles.middleware")


const router = express.Router();

router.post("/suscribirse", [suscriptorValidator()], SuscriptorController.addSuscriptor)
router.get("/suscriptores", [VerifyCookie, rolesUser], SuscriptorController.getSuscriptores)


module.exports = router;