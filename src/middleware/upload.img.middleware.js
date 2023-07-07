
const multer = require("multer")
const path= require("path")
const storage= multer.diskStorage({
    destination:path.join(__dirname,'../public/upload'),
    filename:(req,file,cb)=>{
       return cb(null,new Date().getTime() + path.extname(file.originalname))
    }
})


const upload =multer({
    storage:storage,

    dest:path.join(__dirname,'../public/upload'),
    fileFilter:(req,file,cb)=>{
        const extensions= path.extname(file.originalname)
        //falta validar las extenciones
        cb(null,true)
    }
 


})


module.exports=upload