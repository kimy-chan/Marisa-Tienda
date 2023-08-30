
document.addEventListener('DOMContentLoaded',()=>{
    var cantidadCarrito = document.getElementById('cantidadCarrito');
    function updateCart(cantidad){
        cantidadCarrito.textContent= cantidad.length
    }
    getCartCant()
   async function getCartCant() {
       try {
            let data = await axios.get('/cant-cart')
            updateCart(data.data.cantidaCart);
       } catch (error) {
        console.log(error);
        
       }
      }
      setInterval(getCartCant, 2000)
    

})