// Load navbar terlebih dahulu
fetch("../component/adminNavbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    markActiveNavLink();
    setupNavbarInteractions();
  })
  .catch((err) => console.error("Error mengambil navbar:", err));

// Ambil data user dari localStorage, atau inisialisasi array kosong
// Di bagian atas file
let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

// Fungsi render tabel tetap sama karena sudah menggunakan data dari localStorage

// Fungsi untuk me-render tabel user
const userTableBody = document.querySelector("#userTable tbody");
function renderUserTable() {
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.fullname}</td>
      <td>${user.phone}</td>
      <td>${user.username}</td>
      <td>${user.role || "Pengguna"}</td>
      <td>
        <button class="btn edit" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="btn delete" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    userTableBody.appendChild(tr);
  });
}
renderUserTable();

// Modal dan form untuk tambah/edit user
const userModal = document.getElementById("userModal");
const closeModal = document.querySelector(".modal .close");
const addUserBtn = document.getElementById("addUserBtn");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");

addUserBtn.addEventListener("click", () => openModal());
closeModal.addEventListener("click", closeModalFunc);
window.addEventListener("click", (e) => {
  if (e.target == userModal) {
    closeModalFunc();
  }
});

function openModal(edit = false, user = {}, index = null) {
  userModal.style.display = "block";
  if(edit) {
    modalTitle.textContent = "Edit User";
    document.getElementById("userId").value = index;
    document.getElementById("fullname").value = user.fullname;
    document.getElementById("phone").value = user.phone;
    document.getElementById("username").value = user.username;
    document.getElementById("role").value = user.role || "Pengguna";
  } else {
    modalTitle.textContent = "Tambah User";
    userForm.reset();
    document.getElementById("userId").value = "";
  }
}

function closeModalFunc() {
  userModal.style.display = "none";
}

// Tangani submit form (tambah/edit user)
userForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const index = document.getElementById("userId").value;
  const fullname = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;
  
  if(index !== "") {
    // Edit user yang sudah ada
    users[index] = { fullname, phone, username, role };
  } else {
    // Tambah user baru
    users.push({ fullname, phone, username, role });
  }
  localStorage.setItem("registeredUsers", JSON.stringify(users));
  renderUserTable();
  closeModalFunc();
});

// Delegasi event untuk tombol edit dan delete
userTableBody.addEventListener("click", function(e) {
  if(e.target.closest(".edit")) {
    const index = e.target.closest(".edit").dataset.index;
    const user = users[index];
    openModal(true, user, index);
  }
  if(e.target.closest(".delete")) {
    const index = e.target.closest(".delete").dataset.index;
    if(confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      users.splice(index, 1);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      renderUserTable();
    }
  }
});
