document.addEventListener("DOMContentLoaded", function () {
    // Fetch and insert navbar
    fetch("../component/adminNavbar.html")
    .then((response) => response.text())
    .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink(); // Call function to mark active link after navbar is loaded
    setupNavbarInteractions(); // Setup navbar interactions after navbar is loaded
    })
.catch((err) => console.error("Error mengambil navbar:", err));

    // Fungsi untuk menangani verifikasi peminjaman
    document.querySelectorAll('.verifikasi-btn').forEach(button => {
        button.addEventListener('click', function () {
            let row = this.closest('tr');
            row.querySelector('.status').innerText = 'Disetujui';
            row.querySelector('.status').classList.add('approved');
            alert('Peminjaman telah disetujui.');
        });
    });

    // Fungsi untuk menangani pengembalian barang
    document.querySelectorAll('.pengembalian-btn').forEach(button => {
        button.addEventListener('click', function () {
            let row = this.closest('tr');
            row.querySelector('.status').innerText = 'Dikembalikan';
            row.querySelector('.status').classList.add('returned');
            alert('Barang telah dikembalikan.');
        });
    });
});