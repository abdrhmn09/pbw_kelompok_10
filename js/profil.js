document.addEventListener("DOMContentLoaded", function () {
  // Cek session dan redirect jika belum login
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/pages/login.html";
    return;
  }

  // Load navbar
  fetch("/component/userNavbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
      updateNavbarProfile();
      markActiveNavLink();
    });

  // Function to mark active nav link based on current URL


  // Animasi GSAP
  gsap.from(".profile-header h1", {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".profile-picture", {
    duration: 0.8,
    x: -50,
    opacity: 0,
    delay: 0.2,
    ease: "back.out(1.2)",
  });

  gsap.from(".profile-info .info-item", {
    duration: 0.6,
    x: 50,
    opacity: 0,
    stagger: 0.1,
    delay: 0.4,
    ease: "power2.out",
  });

  // Ambil data user
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const profileElements = {
    fullname: document.getElementById("profile-fullname"),
    fullname: document.getElementById("profile-fullname-info"),
    username: document.getElementById("profile-username"),
    phone: document.getElementById("profile-phone")
  };

  // Isi data profil
  function loadProfileData() {
    if (user) {
      profileElements.fullname.textContent = user.fullname || "-";
      profileElements.username.textContent = user.username || "-";
      profileElements.phone.textContent = user.phone || "-";
      document.querySelector(".user-name").textContent = user.fullname || "Pengguna";
    }
  }
  loadProfileData();

  // Fungsi untuk navigasi aktif
  function markActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        link.classList.toggle("active", linkPage === currentPage);
    });
  }
  markActiveNavLink();

  // Update navbar
  function updateNavbarProfile() {
    const navbarUser = document.querySelectorAll(".user-profile span, .mobile-user span");
    navbarUser.forEach(el => {
      el.textContent = user.fullname || user.username;
    });
  }

  // Ganti foto profil
  document.getElementById("changeProfilePic").addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    
    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          animateProfilePictureChange(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  });

  function animateProfilePictureChange(newSrc) {
    gsap.to("#profileImage", {
      duration: 0.3,
      scale: 0.8,
      opacity: 0.5,
      onComplete: () => {
        document.getElementById("profileImage").src = newSrc;
        gsap.to("#profileImage", {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          ease: "elastic.out(1, 0.5)",
        });
      }
    });
  }

  // Edit profil
  let isEditing = false;
  document.getElementById("editProfileBtn").addEventListener("click", function () {
    if (!isEditing) {
      startEditing();
    } else {
      saveProfileChanges();
    }
  });

  function startEditing() {
    const editableFields = {
      "profile-fullname": "fullname",
      "profile-username": "username",
      "profile-phone": "phone"
    };

    Object.entries(editableFields).forEach(([elementId, field]) => {
      const span = document.getElementById(elementId);
      const input = document.createElement("input");
      input.type = "text";
      input.value = user[field] || "";
      input.id = `edit-${field}`;
      input.classList.add("edit-input");
      span.replaceWith(input);
    });

    document.getElementById("editProfileBtn").textContent = "Simpan Perubahan";
    isEditing = true;
  }

  function saveProfileChanges() {
    const updatedUser = { ...user };
    
    // Ambil nilai dari input
    updatedUser.fullname = document.getElementById("edit-fullname").value;
    updatedUser.username = document.getElementById("edit-username").value;
    updatedUser.phone = document.getElementById("edit-phone").value;

    // Validasi input
    if (!updatedUser.fullname || !updatedUser.username) {
      alert("Nama lengkap dan username harus diisi!");
      return;
    }

    // Update localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Update tampilan
    loadProfileData();
    updateNavbarProfile();
    
    // Kembalikan ke mode tampil
    document.getElementById("editProfileBtn").textContent = "Edit Profil";
    isEditing = false;
  }

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", function () {
    gsap.to(".profile-container", {
      duration: 0.6,
      opacity: 0,
      y: 50,
      ease: "power2.in",
      onComplete: () => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
      }
    });
  });
});