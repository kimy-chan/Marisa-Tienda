const getConecction = require("../model/db")

class CategoryController{

    async showProductBlusa(req,res){
      /*  let cantidaCart =req.session.cart
        if (Array.isArray(cantidaCart)) {
            console.log(cantidaCart.length);
          } else {
           cantidaCart = 0
           console.log(cantidaCart);
          }*/ //para saber cuanto productos hay en el carrito

   
        let conn;
        const sqlQueryBlusa = 'select * from Product where idCategory=1 && amount > 0;'
        try {
            conn = await getConecction()
            const [blusa]= await conn.query(sqlQueryBlusa)            

            return res.render("category",{product:blusa})
            
        } catch (error) {
            
        }finally{
            if(conn){
               conn.release()
            }
        }
    }
    async showProductVestidos(req,res){
        let conn;
        const sqlQueryVestidos = 'select * from Product where idCategory=2 && amount > 0;'
        try {
            conn = await getConecction()
            const [vetidos]= await conn.query(sqlQueryVestidos)
            

            return res.render("category",{product:vetidos})
            
        } catch (error) {
            
        }finally{
            if(conn){
               conn.release()
            }
        }


      

    }

    async showProductAccesorios(req,res){
        let conn;
        const sqlQueryAccesorios = 'select * from Product where idCategory=3 && amount > 0;'
        try {
            conn = await getConecction()
            const [accesorios]= await conn.query(sqlQueryAccesorios)
            
            return res.render("category",{product:accesorios})
            
        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
               conn.release()
            }
        }      

    }



}

const categoryController =new CategoryController()
module.exports= categoryController