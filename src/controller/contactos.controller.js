const ModelCategory = require("../model/model.category")
class ContactoController {

    static async contacto(req, res) {
        const categories = await ModelCategory.showCategory();
        return res.render("contacto", { categories: categories })

    }

}

module.exports = ContactoController