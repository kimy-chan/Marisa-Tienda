const ModelSales= require("../model/model.sales") 

class SalesController{
  constructor(){
    this.data =[]
  }


    static async getSales(req,res){
        try {
          
           const sales = await ModelSales.getSales()
           return res.render("ventasPanel",{venta:sales})
        
        } catch (error) {
          console.log(error);
          
        }

      }

}

module.exports = SalesController