const {body}= require("express-validator");
function categoryValidator(){
    return [
    body("categoria","nombre invalido").matches(/^[a-zA-Z\s]+$/),
    body("image").custom((value,{req})=>{
        if(!req.file){
            throw new Error("archivo invalido")
        }
        return true
    }
    
    )
]
}

module.exports = categoryValidator