const API = "http://localhost:5000/api/cart";

async function addToCart(productId, name, price, image){

  try {

    const res = await fetch(`${API}/add`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        productId,
        name,
        price,
        image
      })
    });

    const data = await res.json();

    console.log("Cart Response:", data);

    if(res.ok){
      alert("Product added to cart 🛒");
      loadCart();
    }else{
      alert(data.message || "Failed to add product");
    }

  } catch(error){
    console.error(error);
    alert("Server error");
  }

}

async function loadCart(){

  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if(!container) return;

try {

  const res = await fetch(API);
  if(!res.ok){
    throw new Error("Cart fetch failed");
  }
  const items = await res.json();

  container.innerHTML = "";

    let total = 0;

    if(!items || items.length === 0){
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add products to start shopping.</p>
        <a href="index.html" class="button">Shop Now</a>
      </div>
    `;
    if(totalElement) totalElement.innerText = "₹0";
    return;
  }

  let html = "";

  items.forEach(item => {

    const subtotal = item.price * item.quantity;

    total += subtotal;

    html += `
      <div class="cart-item">

        <div class="cart-left">
          <img src="${item.image.includes('Photos') ? '../' + item.image : '../Photos/' + item.image}" alt="${item.name}">
        </div>

        <div class="cart-center">

          <h3>${item.name}</h3>

          <p class="price">₹${item.price}</p>

          <div class="qty-box">

            <button class="qty-btn" onclick="decreaseQty('${item._id}')">-</button>

            <span>${item.quantity}</span>

            <button class="qty-btn" onclick="increaseQty('${item._id}')">+</button>

          </div>

          <p class="subtotal">Subtotal: ₹${subtotal}</p>

        </div>

        <div class="cart-right">

          <button class="remove-btn" onclick="removeItem('${item._id}')">
          Remove
          </button>

        </div>

      </div>
    `;

  });

  container.innerHTML = html;

  if(totalElement){
    totalElement.innerText = `₹${total.toLocaleString()}`;
  }
    } catch (error){
      console.error("Load Cart Error:",error);
      container.innerHTML = `
        <div class="empty-cart">
          <h2>Failed to load cart</h2>
          <p>Please try again later.</p>
        </div>
      `;
      }
}

function setupAddToCart(){

  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {

    button.addEventListener("click", function(){

      const productId = this.dataset.id;
      const name = this.dataset.name;
      const price = Number(this.dataset.price);
      const image = this.dataset.image;

      if (!productId) {
        console.error("Product ID missing!");
        return;
      }
      
      addToCart(productId, name, price, image);

    });

  });

}

window.increaseQty = async function(id){

  try{
    
  await fetch(`${API}/increase/${id}`,{
    method:"PUT"
  });
  loadCart();
  } catch(error){
    console.error("Increase failed", error);
  }

}

window.decreaseQty = async function(id){

  try{

  await fetch(`${API}/decrease/${id}`,{
    method:"PUT"
  });
  loadCart();
  } catch(error){
    console.error("Decrease failed", error);
  }

}

window.removeItem = async function(id){

  try{

  await fetch(`${API}/${id}`,{
    method:"DELETE"
  });
  loadCart();
  } catch(error){
    console.error("Remove Item failed", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupAddToCart();
  loadCart();
});