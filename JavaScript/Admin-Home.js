document.getElementById("adminEmail").innerText =
    localStorage.getItem("loggedInUser");

function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    window.location.href = "Login.html";
}
