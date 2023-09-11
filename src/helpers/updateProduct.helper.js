const { body } = require("express-validator");
function productValidatorUpdate() {
    return [
        body("nombre").matches(/^[a-zA-Z\s]+$/),
        body("descripcion").matches(/^[a-zA-Z\s]+$/),
        body("cantidad").isNumeric(),
        body("precio").notEmpty().isNumeric(),
        body("tallas").matches(/^(?:[a-zA-Z\s]*)$/),
        body("colores").matches(/^[a-zA-Z\s]+$/)
    ]
}
module.exports = productValidatorUpdate;