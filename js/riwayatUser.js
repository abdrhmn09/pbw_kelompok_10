document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk update navbar
    function updateNavbarProfile() {
        const userData = JSON.parse(localStorage.getItem("currentUser"));
        if (!userData) return;

        // Update nama lengkap
        document.querySelectorAll(".user-profile span, .mobile-user span").forEach(el => {
            el.textContent = userData.fullname || userData.username;
        });

        // Update username khusus
        document.querySelectorAll("#username").forEach(el => {
            el.textContent = userData.username;
        });
    }

    // Fungsi untuk navigasi aktif
    function markActiveNavLink() {
        const currentPage = window.location.pathname.split("/").pop();
        document.querySelectorAll(".nav-links a").forEach(link => {
            const linkPage = link.getAttribute("href").split("/").pop();
            link.classList.toggle("active", linkPage === currentPage);
        });
    }

    // Fungsi untuk interaksi navbar
    function setupNavbarInteractions() {
        // Implementasi notifikasi real-time
        setInterval(() => {
            document.querySelectorAll(".badge").forEach(badge => {
                const count = parseInt(badge.textContent) + 1;
                badge.textContent = count > 9 ? "9+" : count;
            });
        }, 10000);
    }

    // Load navbar
    fetch("/component/userNavbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            markActiveNavLink();
            setupNavbarInteractions();
            updateNavbarProfile();
        })
        .catch(error => console.error("Gagal memuat navbar:", error));

    console.log("Halaman Aktivitas Terbaru dimuat.");
});