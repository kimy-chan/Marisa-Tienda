const {body}= require("express-validator");


function loginValidator(){
    return [
        body("email").notEmpty().isEmail(),
        body("password").notEmpty()
    ]

}



module.exports ={
    loginValidator
}