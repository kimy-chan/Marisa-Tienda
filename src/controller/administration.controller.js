const ModelProduct = require("../model/model.products")

class AdministrationController{

     static async  Administration(req,res){
        const products =await  ModelProduct.getAllProduct()
        return res.render("adminstracionPanel",{products:products.length})

    }

}
module.exports = AdministrationController