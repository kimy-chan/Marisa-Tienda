
async function addCart(link,idCart,idCategory){
    try {

      await axios.get(`/add-cart/${idCart}/${idCategory}`)
      mensaje(link)

    } catch (error) {
      console.log(error);
    }
}
function mensaje(link){
  setTimeout(()=>{
    const iconElement = link.querySelector("i");
    iconElement.classList.remove("ri-shopping-cart-fill");
    iconElement.classList.add("ri-check-line");
    iconElement.classList.add("added-to-cart");
  },500)
}