const getConecction = require("../model/db")

class CategoryController{

    async showProductBlusa(req,res){
        
        let {nameProduct} = req.params|| "blusas"
        console.log(nameProduct);
    
        let conn;
        const sqlQueryProduct = 'SELECT *  FROM ViewsPorduct where nameCategory = ?'
        const sqlQueryCategory = "SELECT * FROM category"
        try {
            conn = await getConecction()
            const [category]= await conn.query(sqlQueryCategory)  
            const [product]= await conn.query(sqlQueryProduct,[nameProduct])            
            return res.render("category",{product:product, category:category})
            
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