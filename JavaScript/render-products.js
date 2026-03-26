document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("productsContainer");
  if (!container) return;

  const category = container.dataset.category;

  try {

    const res = await fetch("http://localhost:5000/api/products");
    const products = await res.json();

    container.innerHTML = "";

    products.forEach(product => {

      if (product.category !== category) return;

      const article = document.createElement("article");
      article.className = "product-card";

      article.innerHTML = `
        <div class="product-image-box">
          <a href="product-items/${product.page}">
            <img src="Photos/${product.image}" alt="${product.name}" loading="lazy">
          </a>
        </div>

        <h2>
          <a href="product-items/${product.page}">
            ${product.name}
          </a>
        </h2>

        <div class="price">
          <span class="current">₹${Number(product.price).toLocaleString()}</span>
        </div>

        <button 
          class="button add-to-cart"
          data-id="${product._id}"
          data-name="${product.name}"
          data-price="${product.price}"
          data-image="Photos/${product.image}">
          Add To Cart
        </button>
      `;

      container.appendChild(article);

    });

  } catch (error) {

    console.error("Failed to load products:", error);

  }

  container.addEventListener("click", (e) => {

    const button = e.target.closest(".add-to-cart");
    if (!button) return;

    const productId = button.dataset.id;
    const name = button.dataset.name;
    const price = button.dataset.price;
    const image = button.dataset.image;

    addToCart(productId, name, price, image);

  });

});