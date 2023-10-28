async function addCart(link, idCart) {
  try {
    await axios.get(`/add-cart/${idCart}`);
    mensaje(link);
  } catch (error) {
    console.log(error);
  }
}

function mensaje(link) {
  setTimeout(() => {
    const iconElement = link.querySelector("i");
    iconElement.classList.remove("ri-shopping-cart-fill");
    iconElement.classList.add("ri-check-line");
  }, 500);
}





