// Fetch and insert navbar
fetch("/component/userNavbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink(); // Call function to mark active link after navbar is loaded
    setupNavbarInteractions(); // Setup navbar interactions after navbar is loaded
  })
  .catch((err) => console.error("Error mengambil navbar:", err));
/*
// Function to mark active nav link based on current URL
function markActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page filename
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").split("/").pop(); // Get the filename from href
    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Function to setup navbar interactions (e.g., real-time notifications)
function setupNavbarInteractions() {
  // Simulate real-time notifications
  setInterval(() => {
    const badges = document.querySelectorAll(".badge");
    badges.forEach((badge) => {
      const count = parseInt(badge.textContent) + 1;
      badge.textContent = count > 9 ? "9+" : count;
      badge.style.animation = "none";
      void badge.offsetWidth; // Trigger reflow
      badge.style.animation = "pulsate 1.5s infinite";
    });
  }, 10000);
}

// Call the function to mark active nav link when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", markActiveNavLink);
*/
// Fetch inventory data from API
async function fetchInventory() {
  try {
      const response = await fetch('https://api.example.com/items');
      const data = await response.json();
      
      const container = document.getElementById('inventory-container');
      container.innerHTML = '';
      
      data.forEach(item => {
          const html = `
              <div class="inventory-item">
                  <img src="${item.imageUrl}" class="item-image" alt="${item.name}">
                  <h4>${item.name}</h4>
                  <small>Stok: ${item.stock}</small>
              </div>
          `;
          container.insertAdjacentHTML('beforeend', html);
      });
  } catch (error) {
      console.error('Error fetching inventory:', error);
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  fetchInventory();
  setInterval(fetchInventory, 300000); // Refresh every 5 minutes
});