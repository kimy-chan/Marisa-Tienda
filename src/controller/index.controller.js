const ProductModel = require("../model/model.products");

class IndexController {
  async index(req, res) {
    try {
      const product = await ProductModel.productDestacado();
      return res.render("index", { product: product });
    } catch (error) {
      console.log(error);
    }
  }

  cartCantidad(req, res) {
    let cantidaCart;
    if (Array.isArray(req.session.idProduct)) {
      cantidaCart = req.session.idProduct;
    } else {
      cantidaCart = 0;
    }
    return res.json({ cantidaCart: cantidaCart });
  }
}

const indexController = new IndexController();

module.exports = indexController;
