const { validationResult } = require("express-validator");
const ModelSuscripcion = require("../model/modelSuscripcion")

class SuscriptorController {

    static async addSuscriptor(req, res) {//añade suscriptores
        const val = validationResult(req)
        const { email, texto } = req.body
        const nombreCompleto = req.body.names
        console.log(req.body);
        if (!val.isEmpty()) {
            return res.status(400).json({ error: val.array() })
        }
        const nombresCompletos = nombreCompleto.split(" ")
        const register = await ModelSuscripcion.addSuscripcion({ nombresCompletos, email, texto })
        console.log(register);
        if (register === 'success') {
            return res.json({ succes: true })

        }
        return res.redirect("/contacto")

    }

    static async getSuscriptores(req, res) {

        try {
            const suscriptores = await ModelSuscripcion.getSuscriptores()
            return res.render("suscriptoresPanel", { mensaje: '', user: suscriptores })

        } catch (error) {

        }
    }

}

module.exports = SuscriptorController


