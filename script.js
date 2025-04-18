document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
    { id: 4, name: "Product 4", price: 79.99 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const prodctId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === prodctId);
      addCart(product);
    }
  });

  function addCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product");
        cartItem.id = item.id;
        cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button data-id="${item.id}"> Remove </button>
                `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const prodctId = parseInt(e.target.getAttribute("data-id"));

      // find index of array to Remove from product
      const index = cart.findIndex((p) => p.id === prodctId);
      
      if (index !== -1) {
        cart.splice(index, 1); // Remove from cart array
      }

      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    alert("CheckOut Successfully");
    cart.length = 0;
    renderCart();
  });
});
