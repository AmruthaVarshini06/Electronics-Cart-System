const API = "http://localhost:5000/api/cart";
const ORDER_API = "http://localhost:5000/api/orders/create";

let cart = [];
let total = 0;

// 🔄 Load checkout data
async function loadCheckout() {
  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    const items = await res.json();

    // ❗ If cart empty
    if (!items || items.length === 0) {
      alert("Your cart is empty!");
      window.location.href = "cart.html";
      return;
    }

    cart = items;
    total = 0;

    const summaryDiv = document.getElementById("order-summary");
    const totalElement = document.getElementById("total");

    if (summaryDiv) summaryDiv.innerHTML = "";

    items.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      if (summaryDiv) {
        summaryDiv.innerHTML += `
          <p>${item.name} x ${item.quantity} - ₹${subtotal}</p>
        `;
      }
    });

    if (totalElement) {
      totalElement.innerText = `₹${total.toLocaleString()}`;
    }

  } catch (error) {
    console.error("Checkout load error:", error);
    alert("Failed to load checkout. Please try again.");
  }
}

// 🧾 Place Order
async function placeOrder() {
  try {
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // ❗ Validation
    if (!name || !address || !phone) {
      alert("Please fill all details!");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const items = cart.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const orderData = {
      items,
      totalAmount: total
    };

    const res = await fetch(ORDER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!res.ok) {
      throw new Error("Order failed");
    }

    await res.json();

    alert("🎉 Order placed successfully!");

    await fetch("http://localhost:5000/api/cart/clear", {
      method: "DELETE"
    });
    window.location.href = "index.html";

  } catch (error) {
    console.error("Order error:", error);
    alert("Something went wrong while placing order!");
  }
}

// 🚀 Init
document.addEventListener("DOMContentLoaded", loadCheckout);