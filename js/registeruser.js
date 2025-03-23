// Fungsi untuk toggle password visibility
function togglePasswordVisibility(passwordInput) {
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

// Terapkan fungsi togglePasswordVisibility ke kedua input password
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

togglePasswordVisibility(passwordInput);
togglePasswordVisibility(confirmPasswordInput);

// Validasi form register
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      event.preventDefault();
    } else {
      alert("Registrasi berhasil!");
    }
  });
