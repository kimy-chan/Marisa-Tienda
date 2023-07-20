const {body}= require("express-validator");


function loginValidator(){
    return [
        body("email","Email invalido").notEmpty().isEmail(),
        body("password","contraseña invalida").notEmpty()
    ]

}



module.exports ={
    loginValidator
}