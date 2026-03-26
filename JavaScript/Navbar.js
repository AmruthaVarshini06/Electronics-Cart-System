import { searchProducts } from "./search.js";

const CONFIG = {
  CART_API: "http://localhost:5000/api/cart"
};

function debounce(func, delay){
  let timer;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

document.addEventListener("DOMContentLoaded", () => {

    const navbarHTML = `
        <nav class="main-navi">
            <div class="logo">
                <a href="index.html">
                    <img src="Photos/logo.png" alt="Smart Store Logo">
                </a>
            </div>

            <div class="header-search">
                <div class="search-box">
                    <input type="text" id="searchInput"
                        placeholder="Search products (iPhone, MacBook, AirPods...)">
                    <ul id="searchResults" class="search-results"></ul>
                </div>
            </div>

            <div class="nav-right">
                <div class="cart-icon">
                    <a href="cart.html">
                        🛒 Cart <span class="cart-count">0</span>
                    </a>
                </div>

                <div class="profile-wrapper">
                    <div class="profile-icon" id="profileIcon">👤</div>

                    <div class="profile-dropdown" id="profileDropdown">
                        <p id="profileEmail"></p>
                        <hr>
                        <a href="User-Info.html" class="profile-link">Customer Profile</a>
                        <button id="logoutBtn">Logout</button>
                    </div>

                </div>
            </div>
        </nav>

        <nav class="main-nav">
            <a href="Laptop.html">Laptops</a>
            <a href="Mobile.html">Mobiles</a>
            <a href="SmartWatch.html">Smart Watches</a>
            <a href="Headphones-EarPods.html">Headphones & EarPods</a>
        </nav>
    `;

    if(!document.querySelector(".main-navi")){
        document.body.insertAdjacentHTML("afterbegin", navbarHTML);
    }

    const searchInput = document.getElementById("searchInput");

    if(searchInput){
        searchInput.addEventListener("input", debounce(searchProducts, 300));
    }

    const profileIcon = document.getElementById("profileIcon");
    const profileDropdown = document.getElementById("profileDropdown");

    if(profileIcon && profileDropdown){

      profileIcon.addEventListener("click", () => {
          profileDropdown.style.display =
              profileDropdown.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", (e) => {
          if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
              profileDropdown.style.display = "none";
          }
      });

    }

    const logoutBtn = document.getElementById("logoutBtn");

    if(logoutBtn){
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        sessionStorage.clear();
        window.location.href = "login.html";
    });
    }

    updateCartCount();

});

async function updateCartCount(){

  try{

    const res = await fetch(CONFIG.CART_API);

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const items = await res.json();

    const cartCount = Array.isArray(items)
      ? items.reduce((sum,item)=> sum + item.quantity ,0)
      : 0;

    const cartElement = document.querySelector(".cart-count");

    if(cartElement){
      cartElement.textContent = cartCount;
    }

  }
  catch(error){

    console.error("Error loading cart count:", error);

  }

}