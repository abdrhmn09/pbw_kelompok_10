document.addEventListener("DOMContentLoaded", function () {
  // Fetch and insert navbar
  fetch("component/userNavbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
      // Pastikan fungsi markActiveNavLink dan setupNavbarInteractions sudah didefinisikan (atau tambahkan definisinya di sini jika perlu)
      if (typeof markActiveNavLink === "function") {
        markActiveNavLink();
      }
      if (typeof setupNavbarInteractions === "function") {
        setupNavbarInteractions();
      }
      updateNavbarProfile(); // Update nama pengguna di navbar
    })
    .catch((err) => console.error("Error mengambil navbar:", err));
  
  // Fungsi untuk navigasi aktif
  function markActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        link.classList.toggle("active", linkPage === currentPage);
    });
  }
  markActiveNavLink();
  
  // Fungsi untuk update nama pengguna di navbar dari localStorage
  function updateNavbarProfile() {
    const userData = localStorage.getItem("currentUser"); // Data user disimpan sebagai JSON
    if (!userData) return;
    const user = JSON.parse(userData);
    // Update elemen di navbar yang menampilkan nama
    document.querySelectorAll(".user-profile span, .mobile-user span").forEach((el) => {
      el.textContent = user.fullname || user.username;
    });
    // Jika ada elemen spesifik dengan id "username"
    document.querySelectorAll("#username").forEach((el) => {
      el.textContent = user.username;
    });
  }

  // Setup inventory search functionality
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    const inventoryContainer = document.getElementById("inventory-container");
    if (inventoryContainer) {
      const inventoryItems = Array.from(inventoryContainer.getElementsByClassName("inventory-item"));
      searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        inventoryItems.forEach(function (item) {
          // Ambil teks judul dari <h3> di dalam .inventory-info
          const titleElem = item.querySelector(".inventory-info h3");
          if (titleElem) {
            const title = titleElem.textContent.toLowerCase();
            item.style.display = title.includes(query) ? "" : "none";
          }
        });
      });
    }
  }

  // Jika diperlukan, Anda dapat menambahkan fungsi untuk fetch data inventaris dari API
  async function fetchInventory() {
    try {
      const response = await fetch("https://api.example.com/items");
      const data = await response.json();
      const container = document.getElementById("inventory-container");
      if (container) {
        container.innerHTML = "";
        data.forEach((item) => {
          const html = `
            <div class="inventory-item">
              <div class="inventory-img-container">
                <img src="${item.imageUrl}" alt="${item.name}" class="inventory-img">
              </div>
              <div class="inventory-info">
                <h3>${item.name}</h3>
                <div class="inventory-details">
                  <p><i class="fas fa-cubes"></i> Stok: <span class="stock-value">${item.stock}</span></p>
                  <span class="status ${item.stock > 0 ? "available" : "not-available"}">
                    <i class="fas ${item.stock > 0 ? "fa-check-circle" : "fa-times-circle"}"></i> ${item.stock > 0 ? "Tersedia" : "Habis"}
                  </span>
                </div>
                <a href="#" class="borrow-btn ${item.stock > 0 ? "" : "disabled"}">Pinjam</a>
              </div>
            </div>
          `;
          container.insertAdjacentHTML("beforeend", html);
        });
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  }
  
  // Contoh pemanggilan fetchInventory, jika dibutuhkan
  // fetchInventory();
});
