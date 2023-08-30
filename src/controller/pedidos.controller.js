const CartModel = require("../model/model.cart")

class PedidosController{

    static async pedido(req,res){
        const products= []
        let totalPrice= 0
        
      try {
        if(req.session.idProduct){
       
          for(let productId of  req.session.idProduct){
            const product = await CartModel.cardProduct({productId}) 
            products.push(...product)

          }

       for (let index = 0; index < products.length; index++) {
          totalPrice += parseFloat(products[index].price)
        
       }
       console.log(totalPrice);
    
            return res.render("pedidoForm",{products:products,totalPrice:totalPrice})

        }
        return res.send("productos vasios")
      } catch (error) {
        
      }
      
    }

}

module.exports = PedidosController