const getConecction = require("../model/db")

class CartController{

    addCart(req,res){
        const {idCart} = req.params
        const {idCategory} =req.params
        if(!req.session.cart){
            req.session.cart = []
        }
        req.session.cart.push(idCart)
    
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
        let conn;        
        const sqlQueryProduct="SELECT nameProduct,image,price  FROM Product where idProduct=?"
     try {
        conn = await getConecction()
        if(req.session.cart){
            for(let productId of req.session.cart){
               const [product] =  await conn.query(sqlQueryProduct,[productId])
                cart.push(...product)

            }
        }
        if(cart.length >=1){
           for (let index = 0; index <cart.length; index++) {
               totaPrice += parseFloat(cart[index].price)
           
           } 
            return res.json({cart:cart,tota:totaPrice})

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
    
}

const cartController=new CartController()

module.exports = cartController