const ModelCategory = require("../model/model.category");
const ProductModel = require("../model/model.products");

class IndexController {
  async index(req, res) {
    try {
      const product = await ProductModel.productDestacado();
      const categories = await ModelCategory.showCategory();

      return res.render("index", { product: product, categories: categories });
    } catch (error) {
      console.log(error);
    }
  }

  cartCantidad(req, res) {// muestra la cantidad del carrito
    let cantidaCart;
    if (Array.isArray(req.session.idProduct)) {
      cantidaCart = req.session.idProduct;
    } else {
      cantidaCart = 0;
    }
    return res.json({ cantidaCart: cantidaCart });
  }
  portadaIndex(req, res) {
    return res.render("portada")
  }
}


const indexController = new IndexController();

module.exports = indexController;
