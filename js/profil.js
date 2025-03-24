document.addEventListener("DOMContentLoaded", function () {
  // Load navbar
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
      // After navbar loads, mark active link
      markActiveNavLink();
    })
    .catch((error) => console.error("Error loading navbar:", error));

  // DOM Elements
  const profileImage = document.getElementById("profileImage");
  const changeProfilePicBtn = document.getElementById("changeProfilePic");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Animation on page load
  function animatePageLoad() {
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

    gsap.from(".btn-logout", {
      duration: 0.5,
      y: 20,
      opacity: 0,
      delay: 0.8,
      ease: "bounce.out",
    });
  }

  // Initialize animations
  animatePageLoad();

  // Change profile picture functionality
  changeProfilePicBtn.addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
          // Add image change animation
          gsap.to(profileImage, {
            duration: 0.3,
            scale: 0.8,
            opacity: 0.5,
            ease: "power2.in",
            onComplete: function () {
              profileImage.src = event.target.result;
              gsap.to(profileImage, {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                ease: "elastic.out(1, 0.5)",
              });

              // Show success notification
              showNotification(
                "Profile picture updated successfully!",
                "success"
              );
            },
          });
        };

        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
  });

  // Edit profile functionality
  editProfileBtn.addEventListener("click", function () {
    // Convert info items to editable fields
    const infoItems = document.querySelectorAll(
      ".profile-info .info-item span"
    );

    infoItems.forEach((item) => {
      const currentValue = item.textContent;
      const fieldName = item.id;

      // Skip status field from editing
      if (fieldName === "status") return;

      // Replace span with input
      const input = document.createElement("input");
      input.type = fieldName === "email" ? "email" : "text";
      input.value = currentValue;
      input.id = fieldName + "-edit";
      input.className = "edit-input";

      // Add animation to the transition
      gsap.to(item, {
        duration: 0.3,
        opacity: 0,
        onComplete: function () {
          item.replaceWith(input);
          gsap.fromTo(
            input,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        },
      });
    });

    // Change button to save button
    editProfileBtn.textContent = "Save Changes";
    editProfileBtn.removeEventListener("click", arguments.callee);
    editProfileBtn.addEventListener("click", saveProfileChanges);
  });

  function saveProfileChanges() {
    const editedFields = document.querySelectorAll(".edit-input");
    const updates = {};

    // Collect all changes
    editedFields.forEach((field) => {
      const fieldName = field.id.replace("-edit", "");
      updates[fieldName] = field.value;

      // Create new span element
      const newSpan = document.createElement("span");
      newSpan.id = fieldName;
      newSpan.textContent = field.value;

      // Animate the transition back to span
      gsap.to(field, {
        duration: 0.3,
        opacity: 0,
        onComplete: function () {
          field.replaceWith(newSpan);
          gsap.fromTo(
            newSpan,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        },
      });
    });

    // Here you would typically send updates to the server
    console.log("Profile updates:", updates);

    // Change button back to edit button
    editProfileBtn.textContent = "Edit Profile";
    editProfileBtn.removeEventListener("click", saveProfileChanges);
    editProfileBtn.addEventListener("click", arguments.callee);

    // Show success notification
    showNotification("Profile updated successfully!", "success");
  }

  // Logout functionality
  logoutBtn.addEventListener("click", function () {
    // Add logout animation
    gsap.to(".profile-container", {
      duration: 0.6,
      opacity: 0,
      y: 50,
      ease: "power2.in",
      onComplete: function () {
        // Here you would typically redirect to logout endpoint
        console.log("User logged out");
        window.location.href = "/login.html";
      },
    });
  });

  // Inventory count animation
  function animateInventoryCounts() {
    const totalItems = 30;
    const availableItems = 25;
    const borrowedItems = 5;

    // Animate total items count
    animateValue("totalItems", 0, totalItems, 1000);

    // Animate available items count with slight delay
    setTimeout(() => {
      animateValue("availableItems", 0, availableItems, 800);
    }, 200);

    // Animate borrowed items count with more delay
    setTimeout(() => {
      animateValue("borrowedItems", 0, borrowedItems, 600);
    }, 400);
  }

  // Helper function to animate numeric values
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Show notification function
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate notification in
    gsap.fromTo(
      notification,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }
    );

    // Auto-remove after 3 seconds
    setTimeout(() => {
      gsap.to(notification, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => notification.remove(),
      });
    }, 3000);
  }

  // Mark active nav link
  function markActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href").split("/").pop();
      if (linkHref === currentPage) {
        link.classList.add("active");
      }
    });
  }

  // Initialize inventory animations
  animateInventoryCounts();
});
