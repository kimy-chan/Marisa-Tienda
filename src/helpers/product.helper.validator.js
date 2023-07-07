const {body}= require("express-validator");
function productValidator(){
    return [
        body("nameProduct").notEmpty(),
        body("modelProduct").notEmpty(),
        body("description").notEmpty(),
        body("image").notEmpty(),
        body("amount").notEmpty().isNumeric(),
        body("price").notEmpty().isNumeric()
    ]
}
module.exports=productValidator