document.addEventListener("DOMContentLoaded", function () {

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

            <div class="profile-wrapper">
                <div class="profile-icon" id="profileIcon">👤</div>

                <div class="profile-dropdown" id="profileDropdown">
                    <p id="profileEmail"></p>
                    <hr>
                    <a href="User-Info.html" class="profile-link">Customer Profile</a>
                    <button id="logoutBtn">Logout</button>
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

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", searchProducts);
});

function searchProducts() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("searchResults");

    const products = ["iphone", "macbook", "airpods", "samsung", "lenovo"];

    resultsContainer.innerHTML = "";

    if (input === "") return;

    const filtered = products.filter(product =>
        product.toLowerCase().includes(input)
    );

    filtered.forEach(product => {
        const li = document.createElement("li");
        li.textContent = product;
        resultsContainer.appendChild(li);
    });
}
