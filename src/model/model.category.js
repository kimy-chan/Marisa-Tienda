
const getConecction = require("./db/db")


class ModelCategory{

    
    static async addCategory(nameCategory, image){
        let conn;
        try {
            conn = await getConecction()
            const sqlQueryCategory = "INSERT INTO Category(nameCategory,image)values(?,?)"
            await conn.query(sqlQueryCategory,[nameCategory, image])
            
        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
                conn.release()
            }
        }

    }

    static async showCategory(){
        let conn
        try {
            conn = await getConecction() 
            const sqlQueryCategory = "SELECT * FROM Category"
            const [categories] = await conn.query(sqlQueryCategory)
            return categories

        } catch (error) {
            console.log( error);
            
        }finally{
            if(conn){
                conn.release()
            }
        }

    }


}

module.exports= ModelCategory