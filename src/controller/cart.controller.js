
const CartModel = require("../model/model.cart")
const CartAux = require("./auxiliar.controler")


class CartController{

    addCart(req,res){
        const {idCart} = req.params
        if(!req.session.idProduct){
            req.session.idProduct = []
        }
        req.session.idProduct.push(idCart)
      return res.redirect("/")
    }
    



    async cart(req,res){
    
        let product
   
     try {
        if(req.session.idProduct){
            
           
         product = await CartAux.getProdcut(req.session.idProduct)
        
        return res.render("cart",{product:product.productUnique,totalPrice:product.totalPrice})

        }
        return res.render("cart",{product:product})

      

      /*  if(cart.length>0){
            const allPrice =  CartAux.totalPrice(cart)
            totalPrice = allPrice
          let product = CartAux.DeleteObjet(cart,'idProduct') // elimina los obejtos repetidos
          
          let cant = CartAux.catidadProduct(cart)
          cart.forEach(item => {
            const idProduct = item.idProduct;
            item.cantidad = cant[idProduct] || 1; // Asignar cantidad o 1 si no existe en cantidad
          });
          */


         

       


     } catch (error) {
        console.log(error);
        
     }
    }

      
    deleteCartProduct(req,res){
        const {idProduct}= req.params
        if(req.session.idProduct && req.session.idProduct.length > 0){{
            const index = req.session.idProduct.findIndex(item => item == idProduct) //BUSCA EL INDICE DE CADA PRODUCTO
            if(index != -1){
                req.session.idProduct.splice(index,1) //BORRa cada producto
            }
        }    
        }
       return res.redirect("/cart")
      


    }
  
    



    
}






const cartController=new CartController()

module.exports = cartController