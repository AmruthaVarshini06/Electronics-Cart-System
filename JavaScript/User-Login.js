document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
        user => user.email === email && user.password === password
    );

    if (validUser) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password. Please register first.");
    }
});
