const ModelSales = require("../model/model.sales")

class SalesController {
  constructor() {
    this.data = []
  }


  static async getSales(req, res) {
    try {

      const sales = await ModelSales.getSales()
      return res.render("ventasPanel", { venta: sales })
    } catch (error) {
      console.log(error);

    }

  }
  static async deleteSales(req, res) {
    const { idSales } = req.params
    console.log(idSales);
    try {
      await ModelSales.deleteSales({ idSales })
      return res.send("venta borrada")

    } catch (error) {
      console.log(error);

    }


  }

}

module.exports = SalesController