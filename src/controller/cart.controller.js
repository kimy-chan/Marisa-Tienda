
const getConecction = require("../model/db/db")
const CartModel = require("../model/model.cart")

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
      let cart=[]
        let totaPrice=0
        let cantidad=1

     try {
        if(req.session.idProduct){
            for(let productId of req.session.idProduct){
               const product =  await CartModel.cardProduct({productId})
               product[0].cantidad=cantidad   
                cart.push(...product)
                
            }
        }

        if(cart.length>0){
           for (let index = 0; index <cart.length; index++) {
               totaPrice += parseFloat(cart[index].price)
           } 
     
            return res.render("cart",{product:cart,totaPrice:totaPrice})

        }
      
        return res.render("cart",{product:cart})

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