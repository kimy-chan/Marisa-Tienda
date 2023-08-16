
const {validationResult}= require("express-validator"); 
const ModelAuth = require("../model/model.auth")
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
 class AuthController{
    static async login(req,res){
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.render("login",{error:result.array(),alertMsg:""})
        }  
        try {
        const {email,password}=req.body;
        const dataUser = await ModelAuth.login({email})
        console.log(dataUser);
            if(dataUser.length ===0){
               const mgsCuenta="La cuenta no existe"
               return res.render("login",{error:{},alertMsg:mgsCuenta})
            }
            if(email === dataUser[0].email && await bcrypt.compare(password,dataUser[0].password)){
                const token = jwt.sign({idUser:dataUser[0].idUser},process.env.JWT_SECRET)
                return res.send(token)
            }else{
                const msgPassword ="Contraseña incorrecta" 
                return res.render("login",{error:{},alertMsg:msgPassword})
            }          
    }catch (error){
        console.log(error);
                
    }
}

    static formLogin(req,res){

        return res.render("login",{error:{},alertMsg:""})

    }

    
}

module.exports = AuthController

