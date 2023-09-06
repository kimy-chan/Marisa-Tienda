const ModelPedido = require("../model/model.Pedidos");
const CartAux = require("./auxiliar.controler");
const {validationResult}= require("express-validator"); 
const PediosMsg = require("./pedidos.msg.controller");
const e = require("express");


class PedidosController{


    static async pedido(req,res){    
      const error=[]
      try {

        if(req.session.idProduct){
        let product = await CartAux.getProdcut(req.session.idProduct)
            return res.render("pedidoForm",{products:product.productUnique,val:'', totalPrice:product.totalPrice,error:error})
        }
        return res.send("productos vasios")
      } catch (error) {
        
      }
      
    }

    

    static async pedidoFinal(req,res){
      const {nombre,apellidos,celular,Ciudad,direccion}=req.body
      const recoger = req.body.recoger === 'on' ? 0 : 0;
      const entrega = req.body.entrega === 'on' ? 1 : 0;

      const orderP ={
        recoger:recoger,
        entrega:entrega
      }


      const lastName = apellidos.split(' ') 
      const numeroTienda='72884186'
      const prodcutos ="hola"
      const value = validationResult(req)
      if(!value.isEmpty()){
         const error = value.array()
         const val =  req.body
         if(req.session.idProduct){
          let product = await CartAux.getProdcut(req.session.idProduct)
              return res.render("pedidoForm",{products:product.productUnique,val:val, totalPrice:product.totalPrice,error})
          }
      }
       try {
        if(req.session.idProduct){

         let product = await CartAux.getProdcut(req.session.idProduct)
       
        
         await ModelPedido.Pedido({nombre,lastName,celular,Ciudad,direccion,product,orderP})
       
         const urlWhatsApp = `https://wa.me/${numeroTienda}`;
         return res.redirect(urlWhatsApp);


   
      
        }

        return res.send("nada ")
      } catch (error) {
        console.log(error);
        
      }
         
      }

      static async getAllOrder(req,res){
        const state= 0
        try {
          
           const order = await ModelPedido.getAllOrder({state})
           return res.render("pedidoPanel",{pedido:order})
        } catch (error) {
          console.log(error);
          
        }

      }
      
      static async stateOrder(req,res){
        const {idOrder}= req.params
        const state = 1
  try {
    await ModelPedido.productEntregado({idOrder,state})
    return res.redirect("/get-order")

  } catch (error) {
    console.log(error);
    
  }

      }


 

    




}

module.exports = PedidosController