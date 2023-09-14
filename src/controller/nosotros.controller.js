const ModelCategory = require("../model/model.category")

class NosotrosController {

    static async nosotros(req, res) {
        ModelCategory
        const categories = await ModelCategory.showCategory();
        return res.render("nosotros", { categories: categories })

    }

}

module.exports = NosotrosController