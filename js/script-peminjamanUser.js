document.addEventListener("DOMContentLoaded", function () {
    // Fetch and insert navbar
    fetch("/component/userNavbar.html")
    .then((response) => response.text())
    .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink(); // Call function to mark active link after navbar is loaded
    setupNavbarInteractions(); // Setup navbar interactions after navbar is loaded
    })

.catch((err) => console.error("Error mengambil navbar:", err));
    document.getElementById('formPeminjaman').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let nama = document.getElementById('nama').value;
        let barang = document.getElementById('barang').value;
        let jumlah = document.getElementById('jumlah').value;
        let tanggal = document.getElementById('tanggal').value;
        
        if (nama && barang && jumlah && tanggal) {
            alert('Peminjaman sedang diproses...');
            
            setTimeout(() => {
                let riwayatData = document.getElementById('riwayatData');
                let newRow = riwayatData.insertRow();
                newRow.innerHTML = `<td>${nama}</td><td>${barang}</td><td>${jumlah}</td><td>${tanggal}</td><td>Diproses</td>`;
                
                document.getElementById('formPeminjaman').reset();
                alert('Peminjaman berhasil diajukan!');
            }, 2000); // Simulasi pemrosesan 2 detik
        } else {
            alert('Harap lengkapi semua data.');
        }
    });
});