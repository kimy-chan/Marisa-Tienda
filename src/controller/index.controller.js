const getConecction = require("../model/db/db")
class IndexController{

   async index(req,res){
        let conn       
        try {
        conn = await getConecction()
            const sqlQuery = "SELECT * FROM Outstanding where amount > 0"

        
            const [product]= await conn.query(sqlQuery)
            console.log(product);
            return res.render("index",{product:product})
            
        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
                conn.release()
            }
        }


    }

    cartCantidad(req,res){
        let cantidaCart
        if (Array.isArray(req.session.idProduct)) {
            cantidaCart = req.session.idProduct
        
        }else {
            cantidaCart = 0
        }
        return res.json({cantidaCart:cantidaCart})
    }


    
}


const indexController= new IndexController

module.exports = indexController