const ModelSales = require("../model/model.sales")

class SalesController {
  constructor() {
    this.data = []
  }


  static async getSales(req, res) {
    const mensaje = req.query.mensaje
    try {

      const sales = await ModelSales.getSales()
      return res.render("ventasPanel", { venta: sales, mensaje })
    } catch (error) {
      console.log(error);

    }

  }
  static async deleteSales(req, res) {
    const { idSales } = req.params

    try {
      await ModelSales.deleteSales({ idSales })
      return res.redirect("/ventas?mensaje=elimanada")
    } catch (error) {
      console.log(error);

    }


  }

}

module.exports = SalesController