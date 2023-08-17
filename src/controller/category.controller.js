const ModelProduct = require("../model/model.products");

class CategoryController {
  static async showProduct(req, res) {
    try {
      let { nameProduct } = req.params;
      const product = await ModelProduct.getPorductCategory({ nameProduct });
      console.log(product);
      return res.render("category", {
        product: product.product,
        category: product.category,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CategoryController;
