// Fetch and insert navbar
fetch("/component/userNavbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink(); // Call function to mark active link after navbar is loaded
    setupNavbarInteractions(); // Setup navbar interactions after navbar is loaded
  })
  .catch((err) => console.error("Error mengambil navbar:", err));
// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Pastikan elemen search sudah ada di HTML dengan id "search-input"
    const searchInput = document.getElementById('search-input');
    const inventoryContainer = document.getElementById('inventory-container');
    
    // Ambil semua item inventaris
    const inventoryItems = Array.from(inventoryContainer.getElementsByClassName('inventory-item'));
  
    // Event listener untuk pencarian
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      
      inventoryItems.forEach(function (item) {
        // Cari teks judul inventaris, misalnya dari <h3> di dalam .inventory-info
        const title = item.querySelector('.inventory-info h3').textContent.toLowerCase();
        
        // Tampilkan item jika judul mengandung query, sebaliknya sembunyikan
        if (title.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  