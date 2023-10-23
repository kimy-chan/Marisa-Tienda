const { body } = require("express-validator");
function pedidosValidator() {
    return [
        body("nombre", "nombre invalido").matches(/^[a-zA-Z\s]+$/),
        body("apellidos", "apellidos invalido").matches(/^[a-zA-Z\s]+$/),
        body("celular", "celular invalido").isNumeric(),
        body("Ciudad", "ciudad invalido").matches(/^[a-zA-Z\s]+$/),
        body("direccion", "Direccion invalida").notEmpty()
            .custom(value => {
                if (value && !/^[a-zA-Z0-9\s.,°]+$/.test(value)) {
                    throw new Error('Dreccion  inválido: calle n° 12');
                }
                return true;
            }),
    ]
}

module.exports = pedidosValidator