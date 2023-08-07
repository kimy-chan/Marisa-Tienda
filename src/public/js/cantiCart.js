
document.addEventListener('DOMContentLoaded',()=>{
    var cantidadCarrito = document.getElementById('cantidadCarrito');
    
    function updateCart(cantidad){
        console.log(cantidad);
        cantidadCarrito.textContent= cantidad.length
    }
    getCartCant()
  
    function getCartCant() {
        axios.get('/cant-cart')
          .then(function(response) {
            if (response) {
                updateCart(response.data.cantidaCart);
            }
          })
          .catch(function(error) {
            console.error('Error al obtener la cantidad del carrito:', error);
          });
      }
      setInterval(getCartCant, 2000)

 

})