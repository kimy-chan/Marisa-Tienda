const ModelCategory = require("../model/model.category")
class ContactoController {

    static async contacto(req, res) {
        const title = "Contactos"
        const categories = await ModelCategory.showCategory();
        return res.render("contacto", { categories: categories, title })

    }

}

module.exports = ContactoController