function signup(role) {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        alert("Account already exists");
        return;
    }

    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("loggedInUser", email);
    localStorage.setItem("role", role);

    if (role === "admin") {
        window.location.href = "Admin-Home.html";
    } else {
        window.location.href = "index.html";
    }
}
