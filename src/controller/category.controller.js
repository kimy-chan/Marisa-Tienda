const ModelProduct = require("../model/model.products");
const ModelCategory= require("../model/model.category")
const cloudinary= require("cloudinary")
const {  validationResult } = require('express-validator');


class CategoryController {
  constructor(){
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
    });

  }



     async showProduct(req, res) {
    try {
      let { nameProduct } = req.params;
      const product = await ModelProduct.getProductCategory({ nameProduct });
      return res.render("category", {
        product: product.product,
        category: product.category,
      });
    } catch (error) {
      console.log(error);
    }
    }

   async categoryPanel(req,res){
    try {
      const categories = await ModelCategory.showCategory()
      return res.render("categoriasPanel",{categories:categories,mensaje:''})
    } catch (error) {
      console.log(error);
      
    }
  }

    async  addCategory(req,res){
    const result = validationResult(req)
    const {categoria} =req.body
    const image = req.file


    if(!result.isEmpty()){
      console.log(result);
      return

    }
    try {
      const img = await  cloudinary.v2.uploader.upload(image.path)
      await ModelCategory.addCategory(categoria,img.secure_url)
      return res.redirect("/category-panel")
    } catch (error) {
      console.log(error);
     
    }}

    async deleteCategory(req,res){
      const {idCategory}=req.params
      try {
            const mensajesql=  await  ModelCategory.deleteCategory(idCategory)
            if(mensajesql){
              const mensaje ="Hay productos en las categorias"
                  const categories = await ModelCategory.showCategory()
                  return res.render("categoriasPanel",{categories:categories,mensaje:mensaje})
            }
            return res.redirect("/category-panel")
      } catch (error) {
        console.log(error);
        
      }

    }



  


}


const categoryController = new CategoryController()
module.exports = categoryController
