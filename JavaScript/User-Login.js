document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === email && u.password === password && u.role === "user"
    );

    if (!user) {
        alert("Invalid user credentials");
        return;
    }

    localStorage.setItem("loggedInUser", user.email);
    localStorage.setItem("role", "user");

    window.location.href = "index.html";
});
