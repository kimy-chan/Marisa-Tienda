const {body}= require("express-validator");
function pedidosValidator(){
    return [
    body("nombre","nombre invalido").matches(/^[a-zA-Z\s]+$/),
    body("apellidos","apellidos invalido").matches(/^[a-zA-Z\s]+$/),
    body("celular","celular invalido").isNumeric(),
    body("Ciudad","ciudad invalido").matches(/^[a-zA-Z\s]+$/), 
    body("direccion","direccion invalido").matches(/^[a-zA-Z\s]+$/), 
]
}

module.exports = pedidosValidator