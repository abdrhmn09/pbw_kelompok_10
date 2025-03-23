// Ambil elemen-elemen yang dibutuhkan
const loginForm = document.querySelector(".login-form form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.querySelector(".login-button");

// Fungsi untuk menampilkan pesan error
function showError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  loginForm.appendChild(errorElement);

  // Hapus pesan error setelah 3 detik
  setTimeout(() => {
    errorElement.remove();
  }, 3000);
}

// Fungsi untuk menampilkan animasi loading
function showLoading() {
  loginButton.textContent = "Loading...";
  loginButton.disabled = true;
}

// Fungsi untuk menyembunyikan animasi loading
function hideLoading() {
  loginButton.textContent = "LOGIN";
  loginButton.disabled = false;
}

// Fungsi untuk toggle password visibility
function togglePasswordVisibility() {
  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.textContent = "👁️"; // Teks default
  toggleButton.className = "toggle-password";

  // Tambahkan tombol toggle ke dalam container input password
  const passwordContainer = passwordInput.parentNode;
  passwordContainer.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "👁️‍🗨️"; // Teks saat password ditampilkan
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "👁️"; // Teks saat password disembunyikan
    }
  });
}

// Event listener untuk form login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah form submit default

  // Validasi input
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showError("Username dan password tidak boleh kosong!");
    return;
  }

  // Tampilkan animasi loading
  showLoading();

  // Simulasi proses login (bisa diganti dengan AJAX/Fetch API)
  setTimeout(() => {
    hideLoading();

    // Contoh validasi sederhana
    if (username === "admin" && password === "admin123") {
      alert("Login berhasil! Redirecting...");
      window.location.href = "dashboard.html"; // Redirect ke halaman dashboard
    } else {
      showError("Username atau password salah!");
    }
  }, 2000); // Simulasi delay 2 detik
});

// Panggil fungsi toggle password visibility
togglePasswordVisibility();
