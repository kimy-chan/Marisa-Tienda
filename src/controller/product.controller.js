
const {validationResult}= require("express-validator"); 

const getConecction= require("../model/db/db")
const ModelProduct= require("../model/model.products")
const ModelCategory=require("../model/model.category")
const cloudinary= require("cloudinary")
const path= require("path")
const fs= require("fs");
const { error } = require("console");
class ProductController{

  constructor(){
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
    });

  }
    async addProduct(req,res){
    const img = req.files
    let pathImgCloud=[]
    
        const result = validationResult(req)
        if(!result.isEmpty()){
         const values =req.body
         const categories = await ModelCategory.showCategory()
        return res.render("productPanel",{ showModal:true,error:result.array(),values,categories:categories})
        }


      try {

        const {nombre,cantidad,colores,descripcion,tallas, categorias ,precio, destacado}= req.body
        for (let imgCloud of img){
          const pathCloud = await cloudinary.v2.uploader.upload(imgCloud.path)
          pathImgCloud.push(pathCloud.secure_url)
        } 
        await ModelProduct.addPorduct({nombre,descripcion,cantidad,precio,colores,tallas,pathImgCloud, categorias,destacado})
        return res.send("resivido")
         
  } catch (error) {
      console.log(error);

  }
}

    
    //---------------------------------------------------



    
    

    async descriptionProduct(req,res){
    try {
    const {idProduduct}= req.params
    const product= await  ModelProduct.descriptionProduct({idProduduct})
    console.log(product);
      return res.render("descriptionProduct",{product:product}) 
    } catch (error) {
      console.log(error);
      
    }
  }

  //-------panel

  async getProductAllPanel(req, res) {
 try {
  let result = [];
  const categories = await ModelCategory.showCategory()
  return res.render("productPanel", { showModal:false, error: result,values:'',categories:categories});
  
 } catch (error) {
  console.log(error);
  
 }
  }

}

const productController= new ProductController()
module.exports = productController