document.addEventListener("DOMContentLoaded", function () {
  // Navbar Load
  fetch("/component/userNavbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
    });

  // GSAP Animations
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

  // Update nama pada profil (misalnya pada elemen dengan class .user-name)
  const storedName = localStorage.getItem("username");
  if (storedName) {
    const nameElements = document.querySelectorAll(".user-name");
    nameElements.forEach(el => {
      el.textContent = storedName;
    });
  }

  // Profile Picture Change
  document
    .getElementById("changeProfilePic")
    .addEventListener("click", function () {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            gsap.to("#profileImage", {
              duration: 0.3,
              scale: 0.8,
              opacity: 0.5,
              onComplete: function () {
                document.getElementById("profileImage").src =
                  event.target.result;
                gsap.to("#profileImage", {
                  duration: 0.5,
                  scale: 1,
                  opacity: 1,
                  ease: "elastic.out(1, 0.5)",
                });
              },
            });
          };
          reader.readAsDataURL(file);
        }
      });
      fileInput.click();
    });

  // Edit Profile
  document
    .getElementById("editProfileBtn")
    .addEventListener("click", function () {
      document
        .querySelectorAll(".profile-info .info-item span")
        .forEach((item) => {
          const field = item.id;
          if (field !== "status") {
            const input = document.createElement("input");
            input.value = item.textContent;
            input.id = field;
            item.replaceWith(input);
          }
        });
      this.textContent = "Save Changes";
      this.addEventListener("click", saveProfileChanges);
    });

  function saveProfileChanges() {
    document.querySelectorAll(".profile-info input").forEach((input) => {
      const span = document.createElement("span");
      span.id = input.id;
      span.textContent = input.value;
      input.replaceWith(span);
    });
    document.getElementById("editProfileBtn").textContent = "Edit Profile";
  }

  // Logout Animation
  document.getElementById("logoutBtn").addEventListener("click", function () {
    gsap.to(".profile-container", {
      duration: 0.6,
      opacity: 0,
      y: 50,
      ease: "power2.in",
      onComplete: function () {
        window.location.href = "login.html";
      },
    });
  });
});
