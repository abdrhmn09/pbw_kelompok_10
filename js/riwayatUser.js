document.addEventListener("DOMContentLoaded", function () {
    // Fetch and insert navbar
    fetch("/component/userNavbar.html")
    .then((response) => response.text())
    .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink(); // Call function to mark active link after navbar is loaded
    setupNavbarInteractions(); // Setup navbar interactions after navbar is loaded
    })
});