# 📦 Barang Kita — Proyek Web Statis Kelompok 10

**Barang Kita** adalah proyek web statis yang dikembangkan sebagai bagian dari tugas mata kuliah *Pemrograman Berbasis Web (PBW)* oleh **Kelompok 10**.

Aplikasi ini dirancang untuk memperkenalkan layanan jual beli barang secara digital dengan antarmuka yang sederhana dan fungsional. Proyek ini menekankan pengalaman pengguna melalui fitur-fitur yang mendukung peminjaman dan pengelolaan barang.

---

## 📁 Struktur Proyek

```
pbw_kelompok_10/
├── index.html              # Halaman utama
├── style.css               # Gaya dan tema tampilan
├── script.js               # Interaktivitas dan logika antarmuka
├── /pages                  # Halaman tambahan (login, register, dll.)
├── /asset                  # Logo, gambar, dan ikon
└── .git/                   # Direktori git (versi kontrol)
```

---

## 🔑 Fitur-Fitur Utama

### 👤 Halaman Pengguna

- **Dashboard Pengguna** (`Userdashboard.html`)  
  Menampilkan informasi dan status barang yang dipinjam, serta ringkasan aktivitas terakhir pengguna.

- **Inventaris Barang** (`userInventory.html`)  
  Daftar barang yang tersedia untuk dipinjam, dilengkapi dengan fitur pencarian dan filter.

- **Peminjaman Barang** (`html-peminjamanUser.html`)  
  Formulir peminjaman barang yang terintegrasi dengan sistem admin untuk persetujuan.

- **Riwayat Peminjaman** (`riwayatUser.html`)  
  Tabel histori barang yang pernah dipinjam dan dikembalikan.

- **Profil Pengguna** (`profil.html`)  
  Menampilkan informasi pengguna dan opsi untuk mengedit data diri.

- **Autentikasi**
  - **Login** (`login.html`)
  - **Register** (`registeruser.html`)

---

### 🛠️ Halaman Admin

- **Dashboard Admin** (`adminDashboard.html`)  
  Menampilkan statistik sistem, fitur CRUD untuk barang, serta jumlah transaksi dan barang aktif.

- **Manajemen Transaksi** (`html-transaksiAdmin.html`)  
  - **Kolom Peminjaman**: Daftar peminjaman aktif dan statusnya.  
  - **Kolom Pengembalian**: Daftar barang yang dikembalikan beserta konfirmasi kondisi.

- **Manajemen Sistem** (`adminConfigMenu.html`)  
  Menambahkan pengguna baru, mengatur peran (user/admin), serta mengelola hak akses dan keamanan.

- **Profil Admin** (`adminprofil.html`)  
  Informasi pribadi admin, dengan fitur edit profil dan ubah password.

---

> Proyek ini dikembangkan untuk tujuan akademik dan pembelajaran.  
> Hak cipta © 2025 - Kelompok 10, Pemrograman Berbasis Web - Universitas Syiah Kuala.
