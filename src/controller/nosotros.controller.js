const ModelCategory = require("../model/model.category")

class NosotrosController {

    static async nosotros(req, res) {
        const title = "Nosotros"
        ModelCategory
        const categories = await ModelCategory.showCategory();
        return res.render("nosotros", { categories: categories, title })

    }

}

module.exports = NosotrosController