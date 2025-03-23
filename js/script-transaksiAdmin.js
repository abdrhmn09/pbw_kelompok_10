document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    dropdownToggle.addEventListener("click", function () {
        dropdownMenu.classList.toggle("show");
    });

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