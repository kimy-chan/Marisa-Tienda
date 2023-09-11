const ModelProduct = require("../model/model.products");
const ModelCategory = require("../model/model.category")
const cloudinary = require("cloudinary")
const path = require("path")
const fs = require("fs");
const { validationResult } = require('express-validator');
const { log } = require("console");


class CategoryController {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
    });

  }



  async showProduct(req, res) {
    try {
      let { nameProduct } = req.params;
      const product = await ModelProduct.getProductCategory({ nameProduct });
      return res.render("category", {
        product: product.product,
        category: product.category,
        categories: product.category
      });
    } catch (error) {
      console.log(error);
    }
  }

  async categoryPanel(req, res) {
    try {
      const categories = await ModelCategory.showCategory()
      return res.render("categoriasPanel", { categories: categories, mensaje: '' })
    } catch (error) {
      console.log(error);

    }
  }

  async addCategory(req, res) {
    const result = validationResult(req)
    const { categoria } = req.body
    const image = req.file


    if (!result.isEmpty()) {
      console.log(result);
      return

    }
    try {
      const img = await cloudinary.v2.uploader.upload(image.path)
      await ModelCategory.addCategory(categoria, img.secure_url, img.public_id)
      return res.redirect("/category-panel")
    } catch (error) {
      console.log(error);
    } finally {
      if (fs.existsSync(path.join(__dirname + `../../public/upload/${image.filename}`))) {
        fs.unlinkSync(path.join(__dirname + `../../public/upload/${image.filename}`))

      }
    }
  }

  async deleteCategory(req, res) {
    const { idCategory, idImagen } = req.params
    try {
      const mensajesql = await ModelCategory.deleteCategory(idCategory)
      if (mensajesql) {
        const mensaje = "Hay productos en las categorias"
        const categories = await ModelCategory.showCategory()
        return res.render("categoriasPanel", { categories: categories, mensaje: mensaje })
      }
      await cloudinary.v2.uploader.destroy(idImagen)
      return res.redirect("/category-panel")
    } catch (error) {
      console.log(error);

    }

  }
  async updateCategoryForm(req, res) {
    const { idCategory } = req.params
    try {

      const categoriasId = await ModelCategory.getCategoryId(idCategory)
      return res.render("updateCategoria", { categoriasId: categoriasId })


    } catch (error) {
      console.log(error);

    }


  }
  async updateCategory(req, res) {
    const { idCategory } = req.params
    const { categoria } = req.body
    const imageM = req.file
    const val = validationResult(req)
    if (!val.isEmpty()) {
      console.log(val.array());
      const categoriasId = await ModelCategory.getCategoryId(idCategory)
      return res.render("updateCategoria", { categoriasId: categoriasId })
    }
    try {
      if (typeof imageM === 'object') {
        const imgcloud = await cloudinary.v2.uploader.upload(imageM.path)
        console.log(imgcloud);
        const image = imgcloud.secure_url
        const idImg = imgcloud.public_id
        await ModelCategory.updateCategoryImage({ idCategory, image, idImg })

      }
      await ModelCategory.updateCategory({ categoria, idCategory })
      return res.send("actulizado")



    } catch (error) {
      console.log(error);

    }


    console.log("hola");



  }






}


const categoryController = new CategoryController()
module.exports = categoryController
