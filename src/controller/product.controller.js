
const {validationResult}= require("express-validator"); 
const getConecction= require("../model/db")
const cloudinary= require("cloudinary")
const path= require("path")
const fs= require("fs");
const { log } = require("console");
class ProductController{

    constructor(){
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
      });

    }
    async addProduct(req,res){
      let conn;
      const img = req.file
        const result = validationResult(req)
        if(!result.isEmpty()){
          if(!img){
            return res.send(result.array())
          }
          const ruta = path.join(__dirname,`../public/upload/${img.filename}`)   
          fs.unlinkSync(ruta)
          return res.send(result.array()) 
        }
      try {
          conn = await getConecction()
          const {nameProduct,modelProduct,description,amount,price,color,size,outstanding,category}=req.body;
          const imgCloud = await cloudinary.v2.uploader.upload(img.path)
          console.log(imgCloud.public_id);
          const sqlProduct="insert into Product(nameProduct,modelProduct,description,image,amount,price,date,size,color,outstanding,idCategory)values(?,?,?,?,?,?,now(),?,?,?,?)"
          await conn.query(sqlProduct,[nameProduct,modelProduct,description,imgCloud.secure_url,amount,price,size,color,outstanding,category]) 
          const ruta = path.join(__dirname,`../public/upload/${img.filename}`)
          if(fs.existsSync(ruta)){
            fs.unlinkSync(ruta)
          }
          return res.send("recivido")           
  } catch (error) {
      console.log(error);

  }finally{
    if(conn){
      conn.release()
    }

  }
}

//---------------------------------------------------
  
    showFormProduct(req,res){//temporal
      return res.render('registerProduct')
      
    }

    
//---------------------------------------------------
    async updateProduct(){


    }

   async  deleteProduct(req,res){
    const {idProduct,idPhoto}=req.params;
    let conn;
    try {
      conn =await  getConecction()
      const sqlQuery = "DELETE FROM Product where idProduct=?"
      const productDelete = await conn.query(sqlQuery,[idProduct])
      if(productDelete[0].affectedRows ===1){
         await cloudinary.v2.uploader.destroy(idPhoto)     
      }
      return res.send("borrado")
    } catch (error) {
      console.log(error)
      
    }finally{
      if(conn){
        conn.release()
      }
    }
   
    
    }
  

}

const productController = new ProductController()
module.exports=productController