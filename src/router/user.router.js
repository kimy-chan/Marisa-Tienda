const express = require("express");
const userController = require("../controller/user.controller")
const userValidator = require("../helpers/register.user.helper.validator")

const router = express.Router();
router.post("/register", [userValidator()], userController.registerUser);
router.get("/user", userController.getUserPanel); //obtener todos los usuarios disponibles
router.get("/register", userController.getUserPanelForm);

router.get("/register-delete/:idPerson", userController.deleteUserPanel); //borrar un usuario




module.exports = router;