const bcrypt= require("bcrypt")
class UserController{

    addUser(req,res){
        const {prueba} = req.body
        
        const pass = bcrypt.hashSync(prueba,10)
        console.log(pass);

    }

}


const userController=new UserController()

module.exports=userController