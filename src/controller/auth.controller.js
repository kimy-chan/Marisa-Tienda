
const {validationResult}= require("express-validator"); 
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
const  getConecction=  require("../model/db")
 class AuthController{

    constructor(){

    }

    async login(req,res){
        let conn;
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.render("login",{error:result.array(),alertMsg:""})
        }
        const {email,password}=req.body;
        try {
            conn = await getConecction()
            const query= "select * from VerifyUser where email=?"
            const [result]= await conn.query(query,[email]);
            if(result.length ===0){
               const mgsCuenta="La cuenta no existe"
               return res.render("login",{error:{},alertMsg:mgsCuenta})
            }
            if(email === result[0].email && await bcrypt.compare(password,result[0].password)){
                const token = jwt.sign({idUser:result[0].idUser},process.env.JWT_SECRET)
                return res.send(token)
            }else{
                const msgPassword ="Contraseña incorrecta" 
                return res.render("login",{error:{},alertMsg:msgPassword})
            }
        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
                conn.release()
            }
            
            
        }
    }
    
    formLogin(req,res){

        return res.render("login",{error:{},alertMsg:""})

    }

    

    
   
    
}

const authController = new AuthController();

module.exports = authController;