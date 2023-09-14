const { validationResult } = require("express-validator");
const ModelUser = require("../model/model.user")
const bcrypt = require("bcrypt");
const { use } = require("../router/auth.router");
const { error } = require("qrcode-terminal");
class UserController {

    async registerUser(req, res) {
        const result = validationResult(req)
        const { name, lastNames, email, password } = req.body
        console.log(email);
        const lastName = lastNames.split(' ')
        const newPassword = bcrypt.hashSync(password, 10)
        if (!result.isEmpty()) {
            const valuesBody = req.body
            const alertMensaje = ''
            console.log(result.array());
            return res.render("register", { errors: result.array(), alertMensaje, valuesBody })
        }
        try {
            const user = await ModelUser.addUser({ name, lastName, email, newPassword })
            console.log(user);
            if (user.code === 'ER_DUP_ENTRY') {
                const alertMensaje = "El email ya existe"
                return res.redirect("/register?alertMensaje=" + encodeURIComponent(alertMensaje))
            }
            return res.redirect("/login")

        } catch (error) {
            console.log(error);

        }



    }
    register(req, res) {
        const alertMensaje = req.query.alertMensaje || ''
        return res.render("register", { errors: [], alertMensaje: alertMensaje, valuesBody: '' })

    }

    async getUserPanel(req, res) {
        try {
            const user = await ModelUser.getUser()
            return res.render("usuarios", { user })
        } catch (error) {

        }

    }





}




const userController = new UserController()

module.exports = userController