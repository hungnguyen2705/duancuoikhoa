// Khai bao Function Lay du lieu tu LocalStorage
const getCartFromLocalStorage = () => {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  };
  
  const cartItems = getCartFromLocalStorage();
  
  // Truy cap phan tu
  let buyProduct = document.querySelector(".name-product-js");
  
  let HTML = ``;
  if(cartItems.length > 0) {
    cartItems.forEach((item)=>{
      HTML += `
        <img src="${item.imageSrc}" width: "200px" >
      `;
    });
  }
  buyProduct.innerHTML = HTML;