
const { body } = require("express-validator");
function updateCategoriaVali() {
    return [
        body("categoria").matches(/^[a-zA-Z\s,áéíóúÁÉÍÓÚñÑ]+$/)
    ]
}

module.exports = updateCategoriaVali