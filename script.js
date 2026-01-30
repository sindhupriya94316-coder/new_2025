
document.addEventListener("DOMContentLoaded", function () {

  const products = [
    { id: 1, name: "Smart Watch", price: 1999, img: "https://via.placeholder.com/300" },
    { id: 2, name: "Wireless Headphones", price: 2999, img: "https://via.placeholder.com/300" },
    { id: 3, name: "Running Shoes", price: 1499, img: "https://via.placeholder.com/300" },
    { id: 4, name: "Backpack", price: 999, img: "https://via.placeholder.com/300" }
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
  }

  updateCartCount();

  /* ============================
     SHOW PRODUCTS ON SHOP PAGE
  ============================ */
  const productList = document.getElementById("product-list");
  if (productList) {
    productList.innerHTML = "";
    products.forEach(p => {
      productList.innerHTML += `
        <div class="card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `;
    });
  }

  /* ============================
     SHOW FEATURED ON HOME
  ============================ */
  const featured = document.getElementById("featured-products");
  if (featured) {
    featured.innerHTML = "";
    products.slice(0, 3).forEach(p => {
      featured.innerHTML += `
        <div class="card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `;
    });
  }

  /* ============================
     CART PAGE
  ============================ */
  const cartBox = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");

  if (cartBox && totalBox) {
    let total = 0;
    cartBox.innerHTML = "";
    cart.forEach((item, i) => {
      total += item.price;
      cartBox.innerHTML += `
        <p>${item.name} - ₹${item.price}
        <button onclick="removeItem(${i})">X</button></p>`;
    });
    totalBox.innerText = total;
  }

  /* ============================
     CHECKOUT
  ============================ */
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("🎉 Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }

  // Make functions global
  window.addToCart = function (id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(product.name + " added to cart");
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };

});
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    filtered.forEach(p => {
      productList.innerHTML += `
        <div class="card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `;
    });
  });
}
