
const { validationResult } = require("express-validator");
const ModelProduct = require("../model/model.products")
const ModelCategory = require("../model/model.category")
const cloudinary = require("cloudinary")
const path = require("path")
const fs = require("fs");




class ProductController {

  constructor() {
    this.data = []
    this.productPanel = []
    this.newProdcut = false
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
    })

  }
  async formProdcut(req, res) {
    let values = []
    let error = []
    const mensaje = req.query.productoAgregado === 'true';
    const categories = await ModelCategory.showCategory()
    return res.render("formProductPanel", { values, error, categories: categories, productoAgregado: mensaje })

  }

  async addProduct(req, res) {
    const img = req.files
    let pathImgCloud = []


    const result = validationResult(req)
    if (!result.isEmpty()) {
      const values = req.body
      const categories = await ModelCategory.showCategory()
      return res.render("formProductPanel",
        {
          error: result.array(),
          values, categories: categories,
          productoAgregado: false

        })
    }


    try {

      const { nombre, cantidad, colores, descripcion, tallas, categorias, precio, destacado } = req.body
      for (let imgCloud of img) {
        const pathCloud = await cloudinary.v2.uploader.upload(imgCloud.path)
        let infoImg = {}
        infoImg.urlImg = pathCloud.secure_url
        infoImg.idImg = pathCloud.public_id
        pathImgCloud.push(infoImg)
      }
      await ModelProduct.addPorduct({ nombre, descripcion, cantidad, precio, colores, tallas, pathImgCloud, categorias, destacado })
      return res.redirect("/add-product?mensaje=true")

    } catch (error) {
      console.log(error);

    }
  }


  //---------------------------------------------------





  async descriptionProduct(req, res) {
    const { idProduct } = req.params
    try {

      if (this.data.length == 0 || this.data[0].idProduct != idProduct) {
        const product = await ModelProduct.descriptionProduct({ idProduct })
        this.data = [...product]
      }
      return res.render("descriptionProduct", { product: this.data })
    } catch (error) {
      console.log(error);

    }
  }

  //-------panel

  async getProductAllPanel(req, res) {
    try {
      let result = [];
      const product = await ModelProduct.getAllProduct()
      return res.render("productPanel", { showModal: false, error: result, values: '', product: product });

    } catch (error) {
      console.log(error);

    }
  }
  async deleteProduct(req, res) {
    try {
      const { idProduct } = req.params
      const dataImg = await ModelProduct.deleteProduct({ idProduct })
      if (dataImg) {
        for (let data of dataImg) {
          await cloudinary.v2.uploader.destroy(data.imagenId)
        }
      }
      return res.redirect("/products-panel")
    } catch (error) {
      console.log(error);

    }


  }

  async formUpdateProdcut(req, res) {
    const { idProduct } = req.params

    let values = []
    const categoriaP = []
    let dataCategoria = {}


    try {
      const product = await ModelProduct.getAllProductId({ idProduct })
      const categories = await ModelCategory.showCategory()
      for (let categoria of categories) {
        if (categoria.idCategory == product.productos[0].idCategory) {
          dataCategoria.idCategory = categoria.idCategory
          dataCategoria.nombreCategoria = categoria.nameCategory
          categoriaP.push(dataCategoria)
        }

      }
      return res.render("formProductPanelUpdate", {
        product: product.productos,
        img: product.dataImgPro, values, error: [],
        categories: categories,
        categoriaP: categoriaP


      })
    } catch (error) {

    }


  }
  async updateProduct(req, res) {
    const val = validationResult(req)
    const categoriaP = []
    let pathImgCloud = []
    let dataCategoria = {}
    const { idProduct } = req.params
    const img = req.files
    try {
      if (!val.isEmpty()) {
        const product = await ModelProduct.getAllProductId({ idProduct })
        const categories = await ModelCategory.showCategory()
        for (let categoria of categories) {
          if (categoria.idCategory == product.productos[0].idCategory) {
            dataCategoria.idCategory = categoria.idCategory
            dataCategoria.nombreCategoria = categoria.nameCategory
            categoriaP.push(dataCategoria)
          }

        }
        return res.render("formProductPanelUpdate", {
          error: val.array(), product: product.productos, img: product.dataImgPro,
          categories, categoriaP
        })

      }
      const { nombre, cantidad, colores, descripcion, tallas, categorias, precio, destacado } = req.body

      if (img.length > 0) {
        for (let i of img) {
          const cloudImg = await cloudinary.v2.uploader.upload(i.path)
          const dataImge = {}
          dataImge.urlImage = cloudImg.secure_url
          dataImge.idImg = cloudImg.public_id
          pathImgCloud.push(dataImge)

        }
        await ModelProduct.updateImage({ pathImgCloud, idProduct })
      }
      await ModelProduct.updateProduct({ nombre, descripcion, cantidad, precio, colores, tallas, categorias, destacado, idProduct })
      return res.send("l")


    } catch (error) {
      console.log(error);

    }

  }


}

const productController = new ProductController()
module.exports = productController