const {validationResult}= require("express-validator"); 
const getConecction = require("../model/db")
const bcrypt= require("bcrypt")
class UserController{

     async registerUser(req,res){
        const result = validationResult(req)
        const {name,lastNames,email,password} = req.body
        const lastName = lastNames.split(' ') 
        const newPassword =await bcrypt.hashSync(password,10)
        let conn
        const sqlQueryPerson = "INSERT INTO Person(firstName,lastName,motherLastName,dateRegister)VALUES(?,?,?,now())"
        const sqlQueryUser = "INSERT INTO User(email,password,idPerson)VALUES(?,?,?)"
        const sqlQueryRole ="INSERT INTO role(idUser)VALUES(?)"
        if(!result.isEmpty()){
            const alertMensaje=''
            return res.render("register",{errors:result.array(),alertMensaje})
        }
        try {
            conn = await getConecction()
            await  conn.beginTransaction()
            const [person]= await conn.query(sqlQueryPerson,[name,lastName[0],lastName[1]])
            const [user]= await conn.query(sqlQueryUser,[email,newPassword,person.insertId])
            await conn.query(sqlQueryRole,[user.insertId])
            conn.commit()
            return res.redirect("/login")
            
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                const alertMensaje= "El email ya existe"
                return res.redirect("/register?alertMensaje="+ encodeURIComponent(alertMensaje))
            }
            if(conn){
                conn.rollback()
            }
           
            
        }finally{
            conn.release()
        }
    
        

    }
    register(req,res){
        const alertMensaje = req.query.alertMensaje || ''
        return res.render("register",{errors:{},alertMensaje:alertMensaje} )

    }
    

}




const userController=new UserController()

module.exports=userController