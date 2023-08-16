const getConecction = require("./db/db")
class ModelCategory{
    static async getPorductCategory({nameProduct}){
        let conn;
        const sqlQueryProduct = 'SELECT *  FROM ViewsPorduct where nameCategory = ?'
        const sqlQueryCategory = "SELECT * FROM category"
        try {
            conn = await getConecction()
            const [category]= await conn.query(sqlQueryCategory)  
            const [product]= await conn.query(sqlQueryProduct,[nameProduct]) 
            const data ={category: category, product:product }           
            return data
        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
               conn.release()
            }
        }
    }

}

module.exports = ModelCategory