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

    const profileIcon = document.getElementById("profileIcon");
    const dropdown = document.getElementById("profileDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    if (profileIcon && dropdown) {
        profileIcon.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdown.classList.toggle("show");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "Login.html";
        });
    }

    document.addEventListener("click", function (e) {
        const profileWrapper = document.querySelector(".profile-wrapper");

        if (!profileWrapper || !dropdown) return;

        if (!profileWrapper.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });

});
