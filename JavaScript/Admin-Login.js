document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const admin = users.find(
        u => u.email === email && u.password === password && u.role === "admin"
    );

    if (!admin) {
        alert("Invalid admin credentials");
        return;
    }

    localStorage.setItem("loggedInUser", admin.email);
    localStorage.setItem("role", "admin");

    window.location.href = "Admin-Home.html";
});
