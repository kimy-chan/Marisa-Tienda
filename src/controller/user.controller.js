const {validationResult}= require("express-validator"); 
const ModelUser = require("../model/model.user")
const bcrypt= require("bcrypt");
const { use } = require("../router/auth.router");
class UserController{

     async registerUser(req,res){
        const result = validationResult(req)
        const {name,lastNames,email,password} = req.body
        const lastName = lastNames.split(' ') 
        const newPassword = bcrypt.hashSync(password,10)
        if(!result.isEmpty()){
            const alertMensaje=''
            return res.render("register",{errors:result.array(),alertMensaje})
        }
        try {
            const user = await ModelUser.addUser({name,lastName,email,newPassword})
           if(user.code === 'ER_DUP_ENTRY'){
            const alertMensaje= "El email ya existe"
            return res.redirect("/register?alertMensaje="+ encodeURIComponent(alertMensaje))
           }
            return res.redirect("/login")
            
        } catch (error) {
            console.log(error);
            
        }
    
        

    }
    register(req,res){
        const alertMensaje = req.query.alertMensaje || ''
        return res.render("register",{errors:{},alertMensaje:alertMensaje} )

    }
    

}




const userController=new UserController()

module.exports=userController