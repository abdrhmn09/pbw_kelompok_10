
// Fetch and insert navbar
    fetch("/component/userNavbar.html")
    .then((response) => response.text())
    .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink(); // Call function to mark active link after navbar is loaded
    setupNavbarInteractions(); // Setup navbar interactions after navbar is loaded
    })
function ajukanPeminjaman() {
    

    let nama = document.getElementById("namaPeminjam").value;
    let barang = document.getElementById("barangDipinjam").value;
    let jumlah = document.getElementById("jumlahBarang").value;
    let tglPinjam = document.getElementById("tanggalPeminjaman").value;
    let tglKembali = document.getElementById("tanggalPengembalian").value;
    let tujuan = document.getElementById("tujuanPeminjaman").value;
    
    if (nama && barang !== "Pilih Barang" && jumlah && tglPinjam && tglKembali && tujuan) {
        alert("Peminjaman berhasil diajukan!");
        let totalPeminjaman = document.getElementById("totalPeminjaman");
        totalPeminjaman.innerText = parseInt(totalPeminjaman.innerText) + 1;
    } else {
        alert("Harap isi semua kolom!");
    }
}