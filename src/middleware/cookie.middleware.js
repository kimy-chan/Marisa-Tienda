const jwt = require("jsonwebtoken");
const ModelAuth = require("../model/model.auth");



async function VerifyCookie(req, res, next) {
    const cookie = req.cookies.jwt
    if (cookie) {
        const tokenDecode = jwt.verify(cookie, process.env.JWT_SECRET)
        const [user] = await ModelAuth.VerificaUsuarioRol(tokenDecode.idUser)
        if (!user) {
            return res.redirect("/")
        }
        req.user = user
        return next()

    }
    return res.redirect("/")



}

module.exports = VerifyCookie