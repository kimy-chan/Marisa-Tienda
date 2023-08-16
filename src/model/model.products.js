const getConecction= require("./db/db")
 class  ModelProduct{

    static async descriptionProduct({idProduduct}){
        let conn;
        console.log(idProduduct);
       try {
        conn = await getConecction()
        
        const sqlQuery = 'select * from Product inner join ProductDate on Product.idProduct = ProductDate.idProduct where Product.idProduct=?'
        const [product] = await conn.query(sqlQuery,[idProduduct])
        console.log(product);
        return product
       } catch (error) {
        console.log(error);
        
       }if(conn){
         conn.release()
       }
    }

}

module.exports= ModelProduct