const ModelCategory= require("../model/model.category")

class CategoryController{

    static async showProduct(req,res){
        
      try {
        let {nameProduct} = req.params
        const  product = await  ModelCategory.getPorductCategory({nameProduct})
        return res.render("category",{product:product.product, category:product.category})
      } catch (error) {
        console.log(error);
        
      }
    }
     





}

module.exports = CategoryController