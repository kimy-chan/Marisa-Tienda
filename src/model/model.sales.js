const getConecction = require("./db/db");


class ModelSales{

    static async getSales(){
        let conn 
        const sqlSales = "SELECT * FROM SalesProduct"
        try {
            conn = await getConecction()
            
            const [sales]= await conn.query(sqlSales)
            return sales


        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
                conn.release()
            }
        }

    }

}

module.exports =ModelSales