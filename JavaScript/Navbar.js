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
                        placeholder="Search products (iPhone, MacBook, AirPods...)"
                        onkeyup="searchProducts()">
                    <ul id="searchResults" class="search-results"></ul>
                </div>
            </div>

            <div class="profile-wrapper">
                <div class="profile-icon" onclick="toggleProfile()">👤</div>

                <div class="profile-dropdown" id="profileDropdown">
                    <p id="profileEmail"></p>
                    <hr>
                    <button onclick="logout()">Logout</button>
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
});
