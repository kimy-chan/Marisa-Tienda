const getConecction = require("./db/db");


class ModelSuscripcion {

    static async addSuscripcion({ nombresCompletos, email, texto }) {
        let conn
        console.log(nombresCompletos[0]);
        const sqlPerson = "INSERT INTO Person(firstName,lastName ,motherLastName, dateRegister)values(?,?,?,now())"
        const sqlSuscripcion = "INSERT INTO Suscriptor(Email, textArea, idPerson)Values(?,?,?)"
        try {
            conn = await getConecction()
            conn.beginTransaction()
            const [person] = await conn.query(sqlPerson, [nombresCompletos[0], nombresCompletos[1], nombresCompletos[2]])
            await conn.query(sqlSuscripcion, [email, texto, person.insertId])
            conn.commit()
            return 'success'

        } catch (error) {
            conn.rollback
            return error

        } finally {
            if (conn) {
                conn.release()
            }
        }
    }


    static async getSuscriptores() {
        let conn
        const sqlSuscriptores = "SELECT * FROM Suscriptos "
        try {
            conn = await getConecction()
            const [suscriptores] = await conn.query(sqlSuscriptores)
            return suscriptores

        } catch (error) {
            console.log(error);

        } finally {
            if (conn) {
                conn.release()
            }
        }

    }

}

module.exports = ModelSuscripcion