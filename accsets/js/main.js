// Truy cap phan tu
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const cart = document.querySelector(".cart-btn");
const close = document.querySelector("#close-btn");

// Khai bao Function setup du lieu LocalStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Khai bao Function Lay du lieu tu LocalStorage
const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

// Tao bien lay du lieu card LocalStorage
let cartItems = getCartFromLocalStorage();


// TN1: Open-Close Popup
cart.addEventListener('click', () => {
  cartModalOverlay.style.transform = "translateX(0px)";
});

close.addEventListener('click', () => {
  cartModalOverlay.style.transform = "translateX(-200%)";
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay') == true) {
    cartModalOverlay.style.transform = "translateX(-200%)";
  }
});

//TN2: Add cart product
const addToCart = document.querySelectorAll(".add-to-cart");
addToCart.forEach((item) => {
  item.addEventListener('click', () => {
    cartModalOverlay.style.transform = "translateX(0px)";
    addToCartClicked(item);
  });

});

// Funtion trung gian de lay gia tri thong tin them popup cart
const addToCartClicked = (item) => {
  //Cha cai nut button vua bam
  let carItem = item.parentElement;

  let price = carItem.querySelector('.product-price').innerHTML;
  let imageSrc = carItem.querySelector('.product-image').src;


  // khoi tao gia tri sp trong cart -> Save LocalStorage
  let isDuplicate = false;
  cartItems.forEach((value) => {
    if (value.price === price && value.imageSrc === imageSrc) {
      alert("San pham da ton tai roi!");
      isDuplicate = true;
    }
  });
  if (isDuplicate == false) {
    cartItems.push({
      price: price,
      imageSrc: imageSrc,
      quantity: 1
    });
  }
  saveCartToLocalStorage(cartItems);


  // Hien thi ra ngoai giao dien
  addItemToCart(cartItems);
}


// Funtion them san pham vao trong popup
const addItemToCart = (cartItems) => {
  const productRows = document.querySelector('.product-rows');
  productRows.innerHTML = ''; //reset lai toan bo gio hang

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      // Tao ma HTML (DOM ao) them vao productRows
      let productRow = document.createElement('div');
      productRow.classList.add('product-row');

      // Them content hinh anh, gia sp, so luong vao trong no
      productRow.innerHTML = `
      <img class="cart-image" src="${item.imageSrc}" alt="">
      <span class ="cart-price">${item.price}</span>
      <input class="product-quantity" type="number" value="${item.quantity}">
      <button class="remove-btn">Remove</button>
    `;

      // Hien thi ra ngoai
      productRows.appendChild(productRow);

    });
  }

  removeProduct(); // xoa

  changeProductValue(); //Thay doi so luong

  updatePrice(); //cap nhat gia
}


// Delete Product Item add
const removeProduct = () => {

  let btnRemove = document.querySelectorAll(".remove-btn");
  btnRemove.forEach((item) => {
    let imageSrc = item.parentElement.querySelector('.cart-image').src;

    item.addEventListener('click', () => {
      item.parentElement.remove();


      // Update LocaStorage trong nay
      cartItems = cartItems.filter((val) => val.imageSrc !== imageSrc);
      // console.log(cartItems);

      saveCartToLocalStorage(cartItems);

      updatePrice();
    });
  });
}

// Thay doi so luong phan tu
const changeProductValue = () => {
  const inputQuality = document.querySelectorAll('.product-quantity');

  inputQuality.forEach((item, index) => {
    // console.log(item);
    item.addEventListener('change', () => {


      // Cập nhật số lượng mới vào mảng cartItems
      cartItems[index].quantity = item.value;
      // Lưu lại giỏ hàng vào localStorage
      saveCartToLocalStorage(cartItems);


      updatePrice();
    });

  });
}

// Update Price and count Product
const updatePrice = () => {
  // const productRowEle = document.querySelectorAll('.product-row');

  let total = 0;
  cartItems.forEach((item) => {
    console.log(item);
    // const priceEl = item.querySelector('.cart-price').innerHTML;
    const priceCount = parseFloat(item.price.replace('$', ' '));
    total = total + (priceCount * item.quantity);

    // Ghi ra popup
    document.querySelector('.total-price').innerHTML = total;
    document.querySelector('.cart-quantity').innerHTML = cartItems.length;
  });
}



// Loading luon luon kiem tra du lieu LocalStorage hien thi
window.addEventListener('DOMContentLoaded', () => {
  const cartItems = getCartFromLocalStorage();
  addItemToCart(cartItems);
});