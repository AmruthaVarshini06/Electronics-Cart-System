document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("User already registered. Please login.");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
});
