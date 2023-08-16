const getConecction = require("./db/db")
class ModelAuth{

    static async login({email}){
        let conn;
        try {
            conn = await getConecction()
            const query= "select * from VerifyUser where email=?"
            const [result]= await conn.query(query,[email]);
            return result
        } catch (error) {
            console.log(error);
            
        }finally{
            if(conn){
                conn.release()
            }
        }
    }
}

module.exports = ModelAuth