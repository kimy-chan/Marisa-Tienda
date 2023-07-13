const {body}= require("express-validator");
function productValidator(){
    return [
        body("nameProduct").notEmpty(),
        body("modelProduct").notEmpty(),
        body("description").notEmpty(),
        body("image").custom((value,{req})=>{
            if(!req.file){
                throw new Error("Archivo invalido")
            }
            const allExtension = ['.png', '.jpg', '.jpeg']
            const fileExtension = req.file.originalname.substring(req.file.originalname.lastIndexOf('.')).toLowerCase(); //sacamos la extesion png. jpg
            if(!allExtension.includes(fileExtension)){
                throw new Error("solo se permiten png o jpg")
            }
            return true
        }),
        body("amount").notEmpty().isNumeric(),
        body("price").notEmpty().isNumeric(),
        body("size").notEmpty(),
        body("outstanding").notEmpty().isNumeric(),
        body("color").notEmpty()
    ]
}
module.exports=productValidator;