const { validationResult } = require("express-validator");
const ModelUser = require("../model/model.user")
const bcrypt = require("bcrypt");
class UserController {

    async registerUser(req, res) {
        const nombreUser = req.user.firstName
        const apellidoUser = req.user.lastName
        const emailUser = req.user.email
        const rolUser = req.user.nameRole
        const result = validationResult(req)
        const { name, lastNames, email, password, role } = req.body
        const lastName = lastNames.split(' ')
        const newPassword = bcrypt.hashSync(password, 10)
        const valuesBody = req.body
        console.log(valuesBody);
        if (!result.isEmpty()) {
            console.log(result.array());
            return res.render("registroUserPanel", {
                errors: result.array(), valuesBody, alertMensaje: '',
                nombreUser,
                apellidoUser,
                emailUser,
                rolUser
            })
        }
        try {
            const user = await ModelUser.addUser({ name, lastName, email, newPassword, role })
            if (user.code === 'ER_DUP_ENTRY') {
                const alertMensaje = "existe"
                return res.render("registroUserPanel", {
                    errors: [], valuesBody, alertMensaje,
                    nombreUser,
                    apellidoUser,
                    emailUser,
                    rolUser
                })
            }
            const alertMensaje = "registrado"
            return res.render("registroUserPanel", {
                errors: [], valuesBody: '', alertMensaje,
                nombreUser,
                apellidoUser,
                emailUser,
                rolUser
            })

        } catch (error) {
            console.log(error);

        }



    }

    async getUserPanel(req, res) {//trae los usuarios para e panel
        const nombreUser = req.user.firstName
        const apellidoUser = req.user.lastName
        const emailUser = req.user.email
        const rolUser = req.user.nameRole

        const mensaje = req.query.mensaje
        try {

            const user = await ModelUser.getUser()
            return res.render("usuarios", {
                user, mensaje,
                nombreUser,
                apellidoUser,
                emailUser,
                rolUser
            })
        } catch (error) {

        }

    }
    getUserPanelForm(req, res) {//panel para registrar usuarios formulario
        const nombreUser = req.user.firstName
        const apellidoUser = req.user.lastName
        const emailUser = req.user.email
        const rolUser = req.user.nameRole
        return res.render("registroUserPanel", {
            valuesBody: '', errors: [], alertMensaje: '',
            nombreUser,
            apellidoUser,
            emailUser,
            rolUser,

        })
    }

    async deleteUserPanel(req, res) {//borrar usuario del panel
        const { idPerson } = req.params
        try {
            const delteUser = await ModelUser.deleteUser({ idPerson })
            if (delteUser.affectedRows == 1) {
                return res.redirect("/user?mensaje=borrado")
            }
            return res.redirect("/user")
        } catch (error) {
            console.log(error);

        }

    }

}










const userController = new UserController()

module.exports = userController