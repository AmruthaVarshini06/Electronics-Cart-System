function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsBox = document.getElementById("searchResults");

  // Clear old results
  resultsBox.innerHTML = "";

  // If input is empty → stop
  if (!input) {
    resultsBox.style.display = "none";
    return;
  }

  let found = false;

  // Loop through ALL products
  Object.values(products).forEach(product => {
    if (product.name.toLowerCase().includes(input)) {
      found = true;

      const li = document.createElement("li");
      li.textContent = product.name;

      li.onclick = () => {
        window.location.href = product.page;
      };

      resultsBox.appendChild(li);
    }
  });

  // Show / hide result box
  resultsBox.style.display = found ? "block" : "none";

  // If nothing found
  if (!found) {
    const li = document.createElement("li");
    li.textContent = "No products found";
    li.style.cursor = "default";
    resultsBox.appendChild(li);
    resultsBox.style.display = "block";
  }
}
