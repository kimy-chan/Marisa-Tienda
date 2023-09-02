const CartAux = require("./auxiliar.controler");


class PedidosController{

    static async pedido(req,res){
        
      try {
        if(req.session.idProduct){
        let product = await CartAux.getProdcut(req.session.idProduct)
            return res.render("pedidoForm",{products:product.productUnique, totalPrice:product.totalPrice})
        }
        return res.send("productos vasios")
      } catch (error) {
        
      }
      
    }

    

    static async pedidoFinal(req,res){
      console.log(req.body);
      const {nombre,apellidos,celular,Ciudad,direccion}=req.body
       try {
        if(req.session.idProduct){

          let product = await CartAux.getProdcut(req.session.idProduct)

         

     
          return res.send("resivido")
          
        }

        return res.send("errror")
      } catch (error) {
        
      }
          return res.send("resvido")
      }

 

    




}

module.exports = PedidosController