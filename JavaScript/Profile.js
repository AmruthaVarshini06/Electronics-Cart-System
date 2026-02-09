document.addEventListener("DOMContentLoaded", function () {

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    const emailEl = document.getElementById("profileEmail");
    if (emailEl) {
        emailEl.innerText = loggedInUser;
    }

    window.toggleProfile = function () {
        const dropdown = document.getElementById("profileDropdown");
        if (!dropdown) return;

        dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
    };

    window.logout = function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    };

    document.addEventListener("click", function (e) {
        const profile = document.querySelector(".profile-wrapper");
        const dropdown = document.getElementById("profileDropdown");

        if (!profile || !dropdown) return;

        if (!profile.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });

});
