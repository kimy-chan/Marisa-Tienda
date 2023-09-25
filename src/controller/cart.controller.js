
const CartAux = require("./auxiliar.controler")
const ModelCategory = require("../model/model.category")

class CartController {

    addCart(req, res) {
        const { idCart } = req.params
        if (!req.session.idProduct) {
            req.session.idProduct = []
        }
        req.session.idProduct.push(idCart)
        return res.redirect("/cart")
    }




    async cart(req, res) {

        let product
        let cantidadMaximaNameProduct
        const maximoProduct = []
        try {
            const categories = await ModelCategory.showCategory();
            if (req.session.idProduct) {
                product = await CartAux.getProdcut(req.session.idProduct)
                for (let cantidadP of product.productUnique) {
                    if (cantidadP.cantidad > cantidadP.amount) {
                        cantidadMaximaNameProduct = {
                            prodcut: cantidadP.nameProduct,
                            cantidadMaxima: cantidadP.amount
                        }
                        maximoProduct.push(cantidadMaximaNameProduct)
                    }
                }
                return res.render("cart", { product: product.productUnique, totalPrice: product.totalPrice, categories: categories, maximoProduct })

            }
            return res.render("cart", { product: '', totalPrice: '', categories: categories })


        } catch (error) {
            console.log(error);

        }
    }


    deleteCartProduct(req, res) {
        const { idProduct } = req.params
        if (req.session.idProduct && req.session.idProduct.length > 0) {
            {
                const index = req.session.idProduct.findIndex(item => item == idProduct) //BUSCA EL INDICE DE CADA PRODUCTO
                if (index != -1) {
                    req.session.idProduct.splice(index, 1) //BORRa cada producto
                }
            }
        }
        return res.redirect("/cart")



    }


}






const cartController = new CartController()

module.exports = cartController