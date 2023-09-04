
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
         console.log(product);
        return res.render("cart",{product:product.productUnique,totalPrice:product.totalPrice})

        }
        return res.render("cart",{product:'',totalPrice:''})
       

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