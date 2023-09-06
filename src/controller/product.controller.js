
const {validationResult}= require("express-validator"); 
const ModelProduct= require("../model/model.products")
const ModelCategory=require("../model/model.category")
const cloudinary= require("cloudinary")
const path= require("path")
const fs= require("fs");
const { log } = require("console");


class ProductController{

  constructor(){
     this.data=[]
     this.productPanel=[]
     this.newProdcut=false
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
    })
   
  }
  
    async addProduct(req,res){
    const img = req.files
    let pathImgCloud=[]
    
        const result = validationResult(req)
        if(!result.isEmpty()){
         const values =req.body
         const product = await ModelProduct.getAllProduct()
         const categories = await ModelCategory.showCategory()
        return res.render("productPanel",{ showModal:true,error:result.array(),values,categories:categories,product:product})
        }


      try {

        const {nombre,cantidad,colores,descripcion,tallas, categorias ,precio, destacado}= req.body
        for (let imgCloud of img){
          const pathCloud = await cloudinary.v2.uploader.upload(imgCloud.path)
          pathImgCloud.push(pathCloud.secure_url)
        } 
        await ModelProduct.addPorduct({nombre,descripcion,cantidad,precio,colores,tallas,pathImgCloud, categorias,destacado})
        return res.redirect("/products-panel")
         
  } catch (error) {
      console.log(error);

  }
  }

    
    //---------------------------------------------------




    
    async descriptionProduct(req,res){
      const {idProduct}= req.params

    try {  
      
      if(this.data.length ==0 || this.data[0].idProduct != idProduct){
      const product= await  ModelProduct.descriptionProduct({idProduct})
      this.data=[...product]
      }  
      return res.render("descriptionProduct",{product:this.data}) 
    } catch (error) {
      console.log(error);
      
    }
  }

  //-------panel

  async getProductAllPanel(req, res) {
 try {
  let result = [];
  const categories = await ModelCategory.showCategory()


      const product = await ModelProduct.getAllProduct()
  
  return res.render("productPanel", { showModal:false, error: result,values:'',categories:categories,product:product});
  
 } catch (error) {
  console.log(error);
  
 }
    }

}

const productController= new ProductController()
module.exports = productController