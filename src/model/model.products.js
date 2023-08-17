const getConecction = require("./db/db");
class ModelProduct {
  static async descriptionProduct({ idProduduct }) {
    let conn;
    console.log(idProduduct);
    try {
      conn = await getConecction();

      const sqlQuery =
        "select * from Product inner join ProductDate on Product.idProduct = ProductDate.idProduct where Product.idProduct=?";
      const [product] = await conn.query(sqlQuery, [idProduduct]);
      console.log(product);
      return product;
    } catch (error) {
      console.log(error);
    }
    if (conn) {
      conn.release();
    }
  }
  static async productDestacado() {
    let conn;
    try {
      conn = await getConecction();
      const sqlQuery = "SELECT * FROM Outstanding where amount > 0";

      const [product] = await conn.query(sqlQuery);
      return product;
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  static async getPorductCategory({ nameProduct }) {
    let conn;
    const sqlQueryProduct =
      "SELECT *  FROM ViewsPorduct where nameCategory = ?";
    const sqlQueryCategory = "SELECT * FROM category";
    try {
      conn = await getConecction();
      const [category] = await conn.query(sqlQueryCategory);
      const [product] = await conn.query(sqlQueryProduct, [nameProduct]);
      const data = { category: category, product: product };
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
}

module.exports = ModelProduct;
