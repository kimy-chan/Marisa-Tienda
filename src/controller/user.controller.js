const { validationResult } = require("express-validator");
const ModelUser = require("../model/model.user")
const bcrypt = require("bcrypt");
class UserController {

    async registerUser(req, res) {
        const result = validationResult(req)
        const { name, lastNames, email, password, role } = req.body
        const lastName = lastNames.split(' ')
        const newPassword = bcrypt.hashSync(password, 10)
        const valuesBody = req.body
        console.log(valuesBody);
        if (!result.isEmpty()) {
            console.log(result.array());
            return res.render("registroUserPanel", { errors: result.array(), valuesBody, alertMensaje: '' })
        }
        try {
            const user = await ModelUser.addUser({ name, lastName, email, newPassword, role })
            if (user.code === 'ER_DUP_ENTRY') {
                const alertMensaje = "existe"
                return res.render("registroUserPanel", { errors: [], valuesBody, alertMensaje })
            }
            const alertMensaje = "registrado"
            return res.render("registroUserPanel", { errors: [], valuesBody: '', alertMensaje })

        } catch (error) {
            console.log(error);

        }



    }

    async getUserPanel(req, res) {//trae los usuarios para e panel
        const mensaje = req.query.mensaje
        try {

            const user = await ModelUser.getUser()
            return res.render("usuarios", { user, mensaje })
        } catch (error) {

        }

    }
    getUserPanelForm(req, res) {//panel para registrar usuarios formulario
        return res.render("registroUserPanel", { valuesBody: '', errors: [], alertMensaje: '' })
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