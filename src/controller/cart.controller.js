const getConecction = require("../model/db")

class CartController{

    addCart(req,res){
        const {idCart} = req.params
        const {idCategory} =req.params
        if(!req.session.idProduct){
            req.session.idProduct = []
        }
        req.session.idProduct.push(idCart)
    
        switch(idCategory){
            case '1': return res.redirect("/blusas")
            case '2': return res.redirect("/vestidos")
            case '3': return res.redirect("/accesorios")
            default: return res.redirect("/blusas") 
        }
    }

    async cart(req,res){
      let cart=[]
        let totaPrice=0
        let cantidad=1
        let conn;        
        const sqlQueryProduct="SELECT idProduct,nameProduct,image,price  FROM Product where idProduct=?"
     try {
        conn = await getConecction()
        if(req.session.idProduct){
            for(let productId of req.session.idProduct){
               const [product] =  await conn.query(sqlQueryProduct,[productId])
               product[0].cantidad=cantidad    
                cart.push(...product)
                
            }
        }

        if(cart.length>0){
           for (let index = 0; index <cart.length; index++) {
               totaPrice += parseFloat(cart[index].price)
           } 
            return res.json({cart:cart,total:totaPrice})

        }
    

        return res.send("carrito basio")

     } catch (error) {
        console.log(error);
        
     }finally{
        if(conn){
            conn.release()
        }

     }
    }

    deleteCartProduct(req,res){
        const {idProduct}= req.params
        if(req.session.idProduct && req.session.idProduct.length > 0){{
            console.log(req.session.idProduct);
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