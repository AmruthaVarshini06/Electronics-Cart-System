document.getElementById("addProductForm").addEventListener("submit", async function (e) {

  e.preventDefault();

  const slug = document.getElementById("productSlug").value;
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const category = document.getElementById("productCategory").value;
  const image = document.getElementById("productImage").value;
  const page = document.getElementById("productPage").value;
  const stock = document.getElementById("productStock").value;

  const product = {
    slug,
    name,
    price,
    category,
    image,
    page,
    stock
  };

  try {

    const res = await fetch("http://localhost:5000/api/products", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(product)

    });

    const data = await res.json();

    alert("Product added successfully ✅");

    document.getElementById("addProductForm").reset();

  } catch (error) {

    console.error("Error adding product:", error);
    alert("Failed to add product ❌");

  }

});


function logout() {

  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("role");

  window.location.href = "Login.html";

}