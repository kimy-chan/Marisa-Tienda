
const {validationResult}= require("express-validator"); 
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
const  getConecction=  require("../model/db")
 class AuthController{

    constructor(){

    }

    async login(req,res){
        const result = validationResult(req)
        if(!result.isEmpty()){
            
            return res.send(result.array())
               
        }
        const {email,password}=req.body;
        try {
            const conn = await getConecction()
            const query= "select * from VerifyUser where email=?"
            const [result]= await conn.query(query,[email]);
            if(email === result[0].email && await bcrypt.compare(password,result[0].password)){
                
                const token = jwt.sign({idUser:result[0].idUser},process.env.JWT_SECRET)
                return res.send(token)
            }else{
                return res.send("contraseña incorrecat")
            }
        } catch (error) {
            console.log(error);
            
        }finally{
            
        }
        



        


     



    }
   
    
}

const authController = new AuthController();

module.exports = authController;