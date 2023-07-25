const getConecction = require("../model/db")

class CategoryController{

    async showProductBlusa(req,res){
        let conn;
        const sqlQueryBlusa = 'select * from Product where idCategory=1;'
        try {
            conn = await getConecction()
            const [blusa]= await conn.query(sqlQueryBlusa)
            console.log(blusa);
            

            return res.render("category",{product:blusa})
            
        } catch (error) {
            
        }finally{
            if(conn){
               conn.release()
            }
        }


      

    }



}

const categoryController =new CategoryController()
module.exports= categoryController