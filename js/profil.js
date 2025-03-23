// Fetch and insert navbar
fetch("/component/userNavbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink();
    setupNavbarInteractions();
  })
  .catch((err) => console.error("Error mengambil navbar:", err));

// Function to edit profile
document
  .getElementById("editProfileBtn")
  ?.addEventListener("click", function () {
    const phone = prompt(
      "Masukkan nomor telepon baru:",
      document.getElementById("phone").textContent
    );
    const status = prompt(
      "Masukkan status baru:",
      document.getElementById("status").textContent
    );
    const username = prompt(
      "Masukkan username baru:",
      document.getElementById("username").textContent
    );

    if (phone) document.getElementById("phone").textContent = phone;
    if (status) document.getElementById("status").textContent = status;
    if (username) document.getElementById("username").textContent = username;
  });

// Function to change profile picture
document
  .getElementById("changeProfilePic")
  ?.addEventListener("click", function () {
    const newImageUrl = prompt("Masukkan URL gambar baru:");
    if (newImageUrl) {
      document.getElementById("profileImage").src = newImageUrl;
    }
  });

// Function to mark active nav link based on current URL
function markActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").split("/").pop();
    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Function to setup navbar interactions (e.g., real-time notifications)
function setupNavbarInteractions() {
  setInterval(() => {
    const badges = document.querySelectorAll(".badge");
    badges.forEach((badge) => {
      const count = parseInt(badge.textContent) + 1;
      badge.textContent = count > 9 ? "9+" : count;
      badge.style.animation = "none";
      void badge.offsetWidth;
      badge.style.animation = "pulsate 1.5s infinite";
    });
  }, 10000);
}

// Logout functionality
document.getElementById("logoutBtn")?.addEventListener("click", function () {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    // Hapus token atau session (opsional)
    localStorage.removeItem("token"); // Contoh menghapus token dari localStorage

    // Redirect ke index.html
    window.location.href = "loginuser.html"; // Pastikan path ini benar
  }
});
