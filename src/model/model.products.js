const getConecction = require("./db/db");
class ModelProduct {
  static async descriptionProduct({ idProduduct }) {
    let conn;
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
  static async getProductCategory({ nameProduct }) {
    let conn;
    const sqlQueryProduct =
      "SELECT *  FROM ViewsProduct where nameCategory = ?";
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
  static async addPorduct({nombre,descripcion,cantidad,precio,colores,tallas,pathImgCloud,categorias,destacado}){
    let conn
    const sqlQueryPorduct="INSERT INTO Product(nameProduct,description, amount, price,date,color,size,outstanding, idCategory)VALUES(?,?,?,?,now(),?,?,?,?)"
    const sqlQueryProductDate="INSERT INTO ProductDate(image, idProduct)values(?,?)"
    try {
      conn = await getConecction();
      await conn.beginTransaction()

      const [product]= await conn.query(sqlQueryPorduct,[nombre,descripcion,cantidad,precio,colores,tallas,destacado,categorias])
      for(let urlImg of pathImgCloud){
        await conn.query(sqlQueryProductDate,[urlImg,product.insertId])
      }
      await conn.commit()
      
    } catch (error) {
      console.log(error);
      conn.rollback()
      
    }



  }



}

module.exports = ModelProduct;
