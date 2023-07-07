
const {validationResult}= require("express-validator"); 
class ProductoController{

    async addProduct(req,res){
      const result = validationResult(req)
        if(!result.isEmpty()){
            return res.send(result)
        }
        
  
        console.log(req.body);      
       
      //  const {nameProduct,modelProduc,description,imagen,amout,price,outstanding,color,size}=req.body;
        return res.send("hola")
        

    }

}

const productoController = new ProductoController()
module.exports=productoController