// Load navbar terlebih dahulu
fetch("../component/adminNavbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink();
    setupNavbarInteractions();
  })
  .catch((err) => console.error("Error mengambil navbar:", err));

// Data barang awal (contoh dummy data)
let barangData = [
  { id: 1, namaBarang: "Printer", kategori: "Elektronik", stok: 5 },
  { id: 2, namaBarang: "Proyektor", kategori: "Elektronik", stok: 2 },
  { id: 3, namaBarang: "Meja Kantor", kategori: "Perabot", stok: 10 }
];

const barangTableBody = document.querySelector("#barangTable tbody");
const itemModal = document.getElementById("itemModal");
const closeModal = document.querySelector(".modal .close");
const addItemBtn = document.getElementById("addItemBtn");
const itemForm = document.getElementById("itemForm");
const modalTitle = document.getElementById("modalTitle");

// Render tabel barang
function renderTable() {
  barangTableBody.innerHTML = "";
  barangData.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.namaBarang}</td>
      <td>${item.kategori}</td>
      <td>${item.stok}</td>
      <td>
        <button class="btn edit" data-id="${item.id}"><i class="fas fa-edit"></i></button>
        <button class="btn delete" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    barangTableBody.appendChild(tr);
  });
}

// Membuka modal (untuk tambah/edit)
function openModal(edit = false, item = {}) {
  itemModal.style.display = "block";
  if (edit) {
    modalTitle.textContent = "Edit Barang";
    document.getElementById("itemId").value = item.id;
    document.getElementById("namaBarang").value = item.namaBarang;
    document.getElementById("kategori").value = item.kategori;
    document.getElementById("stok").value = item.stok;
  } else {
    modalTitle.textContent = "Tambah Barang";
    itemForm.reset();
    document.getElementById("itemId").value = "";
  }
}

function closeModalFunc() {
  itemModal.style.display = "none";
}

// Event listener untuk tombol Tambah Barang
addItemBtn.addEventListener("click", () => {
  openModal();
});

// Tutup modal saat klik ikon close
closeModal.addEventListener("click", closeModalFunc);

// Tutup modal saat klik di luar konten modal
window.addEventListener("click", function(event) {
  if (event.target == itemModal) {
    closeModalFunc();
  }
});

// Proses submit form (tambah/edit barang)
itemForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("itemId").value;
  const namaBarang = document.getElementById("namaBarang").value;
  const kategori = document.getElementById("kategori").value;
  const stok = parseInt(document.getElementById("stok").value);

  if (id) {
    // Edit barang
    barangData = barangData.map(item => {
      if (item.id == id) {
        return { id: item.id, namaBarang, kategori, stok };
      }
      return item;
    });
  } else {
    // Tambah barang baru
    const newId = barangData.length ? Math.max(...barangData.map(i => i.id)) + 1 : 1;
    barangData.push({ id: newId, namaBarang, kategori, stok });
  }
  renderTable();
  updateChart();
  closeModalFunc();
});

// Event listener untuk tombol edit dan delete pada tabel
barangTableBody.addEventListener("click", function(e) {
  if (e.target.closest(".edit")) {
    const id = e.target.closest(".edit").dataset.id;
    const item = barangData.find(i => i.id == id);
    openModal(true, item);
  }
  if (e.target.closest(".delete")) {
    const id = e.target.closest(".delete").dataset.id;
    if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      barangData = barangData.filter(item => item.id != id);
      renderTable();
      updateChart();
    }
  }
});

renderTable();

// Inisialisasi Chart menggunakan Chart.js
let chartCtx = document.getElementById("barangChart").getContext("2d");
let barangChart;

function updateChart() {
  const labels = barangData.map(item => item.namaBarang);
  const dataValues = barangData.map(item => item.stok);
  if (barangChart) {
    barangChart.data.labels = labels;
    barangChart.data.datasets[0].data = dataValues;
    barangChart.update();
  } else {
    barangChart = new Chart(chartCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stok Barang',
          data: dataValues,
          backgroundColor: 'rgba(20, 136, 204, 0.6)',
          borderColor: 'rgba(20, 136, 204, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}

updateChart();
