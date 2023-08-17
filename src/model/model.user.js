const getConecction = require("./db/db");

class ModelUser {
  static async addUser({ name, lastName, email, newPassword }) {
    let conn;
    const sqlQueryPerson =
      "INSERT INTO Person(firstName,lastName,motherLastName,dateRegister)VALUES(?,?,?,now())";
    const sqlQueryUser =
      "INSERT INTO User(email,password,idPerson)VALUES(?,?,?)";
    const sqlQueryRole = "INSERT INTO role(idUser)VALUES(?)";
    try {
      conn = await getConecction();
      await conn.beginTransaction();
      const [person] = await conn.query(sqlQueryPerson, [
        name,
        lastName[0],
        lastName[1],
      ]);
      const [user] = await conn.query(sqlQueryUser, [
        email,
        newPassword,
        person.insertId,
      ]);
      await conn.query(sqlQueryRole, [user.insertId]);
      conn.commit();
    } catch (error) {
      if (error) {
        conn.rollback();
        return error;
      }
    } finally {
      conn.release();
    }
  }
}

module.exports = ModelUser;
