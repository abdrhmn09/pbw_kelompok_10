document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    dropdownToggle.addEventListener("click", function () {
        dropdownMenu.classList.toggle("show");
    });

    document.getElementById('formPeminjaman').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let nama = document.getElementById('nama').value;
        let barang = document.getElementById('barang').value;
        let tanggal = document.getElementById('tanggal').value;
        
        if (nama && barang && tanggal) {
            alert('Peminjaman sedang diproses...');
            
            setTimeout(() => {
                let riwayatData = document.getElementById('riwayatData');
                let newRow = riwayatData.insertRow();
                newRow.innerHTML = `<td>${nama}</td><td>${barang}</td><td>${tanggal}</td><td>Diproses</td>`;
                
                document.getElementById('formPeminjaman').reset();
                alert('Peminjaman berhasil diajukan!');
            }, 2000); // Simulasi pemrosesan 2 detik
        } else {
            alert('Harap lengkapi semua data.');
        }
    });
});