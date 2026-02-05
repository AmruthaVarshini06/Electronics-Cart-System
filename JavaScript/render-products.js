const container = document.getElementById("productsContainer");

// Read category from HTML attribute
const category = container.dataset.category;

Object.values(products).forEach(product => {
  if (product.category !== category) return;

  const article = document.createElement("article");
  article.className = "product-card";

  article.innerHTML = `
    <a href="${product.page}">
      <div class="product-image-box">
        <img src="Photos/${getImageName(product.page)}"
             alt="${product.name}"
             loading="lazy">
      </div>
      <h2>${product.name}</h2>
      <div class="price">
        <span class="current">₹${product.price.toLocaleString()}</span>
      </div>
    </a>
    <button class="button">Add To Cart</button>
  `;

  container.appendChild(article);
});

// Image mapping (temporary – OK for now)
function getImageName(page) {
  const map = {
    "product-items/Apple-MacBook-M2.html": "Apple MacBook AIR M2.webp",
    "product-items/Dell-13th-gen.html": "DELL 13th Gen.webp",
    "product-items/Dell-15-AMD.html": "DELL 15 AMD.webp",
    "product-items/HP-15-AMD.html": "HP 15 AMD.webp",
    "product-items/Lenovo-Chrome-Book.html": "Lenovo Chrome Book.webp",

    "product-items/Apple-iPhone-14.html": "Apple iPhone 14 Starlight.webp",
    "product-items/Apple-iPhone-16.html": "Apple iPhone 16 Teal.webp",
    "product-items/Samsung-galaxy.html": "Samsung Galaxy A35 5G Awesome Navy Blue.webp",
    "product-items/CMF-By-Nothing.html": "CMF by Nothing Phone 2 Pro Black.webp",
    "product-items/Vivo-T4-Lite.html": "Vivo T4 Lite 5G.webp",

    "product-items/Apple-Watch-10.html": "Apple Watch Series 10.webp",
    "product-items/Boat-Smartwatch.html": "Boat SmartWatch.webp",
    "product-items/Fire-Boltt-Smartwatch.html": "Fire Boltt.webp",
    "product-items/Noise-Crew-Smartwatch.html": "Noise Crew.webp",
    "product-items/Fastrack-Smartwatch.html": "Fastrack.webp",

    "product-items/Apple-AirPods.html": "Apple AirPods.webp",
    "product-items/Boat-AirPods.html": "Boat AirPods.webp",
    "product-items/Noise-AirPods.html": "Noise AirPods.webp",
    "product-items/One-Roar.html": "One Roar.webp",
    "product-items/Zebronics.html": "Zebronics.webp"
  };

  return map[page] || "placeholder.webp";
}
