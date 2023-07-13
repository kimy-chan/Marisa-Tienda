
const {validationResult}= require("express-validator"); 
const getConecction= require("../model/db")
const cloudinary= require("cloudinary")
const path= require("path")
const fs= require("fs");
class ProductoController{

    constructor(){
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
      }); //configuracion de la credencciales de cloudinary

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
          await fs.unlinkSync(ruta)
          return res.send(result.array()) 
        }
      try {
          conn = await getConecction()
          const {nameProduct,modelProduct,description,amount,price,color,size,outstanding,category}=req.body;
          const imgCloud = await cloudinary.v2.uploader.upload(img.path)
          const sqlProduct="insert into Product(nameProduct,modelProduct,description,image,amount,price,date,size,color,outstanding,idCategory)values(?,?,?,?,?,?,now(),?,?,?,?)"
          await conn.query(sqlProduct,[nameProduct,modelProduct,description,imgCloud.secure_url,amount,price,size,color,outstanding,category]) 
          const ruta = path.join(__dirname,`../public/upload/${img.filename}`)
          if(fs.existsSync(ruta)){
            await fs.unlinkSync(ruta)
          }
          return res.send("recivido")           
  } catch (error) {
      console.log(error);

  }finally{
    if(conn){
      await conn.release()
    }

  }
}

//---------------------------------------------------
  

    
    async showProductRopa(req,res){
      let conn;
      try {
        conn= await  getConecction()
        const sql="select * from Product where idCategory = ?"
        const [result]= await conn.query(sql,[1])
        return res.send(result)

      } catch (error) {
       
        console.log(error);
        
      }finally{
        if(conn){
          await conn.release()
        }

      }
    }

//---------------------------------------------------
  
    async showProductAccessories(req,res){
      let conn;
      try {
        conn = await getConecction()
        const sql = "select * from Product where idCategory = ?"
        const [result]= await conn.query(sql,[2])
        return res.send(result)

      } catch (error) {
        console.log(error);
        
      }finally{
        if(conn){
          await conn.release()
        }
      }
    }

    showFormProduct(req,res){//temporal
      return res.render('registerProduct')
      
    }

    
//---------------------------------------------------
    async updateProduct(){


    }

   async  deleteProduct(){

    }
  

}

const productoController = new ProductoController()
module.exports=productoController