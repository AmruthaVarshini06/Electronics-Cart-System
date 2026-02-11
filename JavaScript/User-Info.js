document.addEventListener("DOMContentLoaded", function () {

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "Login.html";
        return;
    }

    document.getElementById("userEmail").innerText = loggedInUser;
});
