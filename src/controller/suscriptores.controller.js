const { validationResult } = require("express-validator");
const ModelSuscripcion = require("../model/modelSuscripcion")
const emailsend = require("../helpers/email.helper");


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
        const mensage = req.query.mensage
        const title = 'Suscriptores'
        const nombreUser = req.user.firstName
        const apellidoUser = req.user.lastName
        const emailUser = req.user.email
        const rolUser = req.user.nameRole
        const mensaje = req.query.mensaje

        try {
            const suscriptores = await ModelSuscripcion.getSuscriptores()
            console.log(suscriptores);
            return res.render("suscriptoresPanel", {
                mensaje: mensaje,
                user: suscriptores,
                nombreUser,
                apellidoUser,
                emailUser,
                rolUser,
                title,
                mensage
            })

        } catch (error) {
            console.log(error);

        }
    }


    static async deleteSuscriptorPanel(req, res) {//borrar suscriptores
        const { idPerson } = req.params
        try {
            console.log(idPerson);
            const [resultDelete] = await ModelSuscripcion.deleteSuscriptor({ idPerson })
            if (resultDelete.affectedRows === 1) {
                return res.redirect("/suscriptores?mensaje=success")
            }
            return res.redirect("/suscriptores?mensaje=error")
        } catch (error) {
            console.log(error);

        }

    }


    static async sendEmail(req, res) {
        const { email, data } = req.body
        const mailOptions = {
            from: process.envEMAILEMPRESA,
            to: email,
            subject: 'Novedades',
            text: data
        };

        try {
            const info = await emailsend.sendMail(mailOptions);
            if (info.response) {
                return res.redirect("/suscriptores?mensage=success")

            }
            return res.redirect("/suscriptores")


        } catch (error) {
            console.log(error);

        }

    }

}

module.exports = SuscriptorController


