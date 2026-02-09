document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const image = document.getElementById("productImage").value;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
        id: Date.now(), 
        name,
        price,
        category,
        image
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added successfully!");
    document.getElementById("addProductForm").reset();
});

function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    window.location.href = "Login.html";
}
