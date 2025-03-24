// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const registerForm = document.querySelector("#registerForm");
  const fullnameInput = document.getElementById("fullname");
  const phoneInput = document.getElementById("phone");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const registerButton = document.querySelector(".register-button");
  const formGroups = document.querySelectorAll(".form-group");
  const appInfo = document.querySelector(".app-info");
  const registerFormContainer = document.querySelector(".register-form");

  // Add initial animations
  initPageAnimations();

  // Setup form interactions
  setupFormInteractions();

  // Setup toggle password visibility
  setupPasswordToggle();

  // Setup phone number input to only accept numbers
  setupPhoneNumberInput();

  // Handle form submission
  handleFormSubmission();

  // Functions
  function initPageAnimations() {
    // Add animation classes after a small delay
    setTimeout(() => {
      appInfo.classList.add("app-info-fade-in");
      registerFormContainer.classList.add("form-fade-in");
    }, 100);

    // Create and add particles to the app-info section
    createParticles();
  }

  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;

      // Create unique animation for each particle
      const duration = Math.random() * 10 + 5;
      const keyframeName = `floatParticle${i}`;

      // Add keyframe animation
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes ${keyframeName} {
          0% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 50 - 25}px, ${
        Math.random() * 50 - 25
      }px); }
          50% { transform: translate(${Math.random() * 50 - 25}px, ${
        Math.random() * 50 - 25
      }px); }
          75% { transform: translate(${Math.random() * 50 - 25}px, ${
        Math.random() * 50 - 25
      }px); }
          100% { transform: translate(0, 0); }
        }
      `;
      document.head.appendChild(style);

      // Apply animation
      particle.style.animation = `${keyframeName} ${duration}s linear infinite`;

      particlesContainer.appendChild(particle);
    }

    appInfo.appendChild(particlesContainer);
  }

  function setupFormInteractions() {
    // Add focus and blur event listeners to inputs
    const inputs = document.querySelectorAll(".form-group input");

    inputs.forEach((input) => {
      // Focus effect
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      // Blur effect
      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          input.parentElement.classList.remove("focused");
        }
      });

      // Check if input has value on page load
      if (input.value.trim() !== "") {
        input.parentElement.classList.add("focused");
      }
    });

    // Add input animations
    animateFormAppearance();
  }

  function setupPhoneNumberInput() {
    // Only allow numbers in phone input
    if (phoneInput) {
      // Prevent non-numeric input
      phoneInput.addEventListener("keypress", function (e) {
        if (!/^\d$/.test(e.key) && e.key !== "+") {
          e.preventDefault();
        }
      });

      // Clean input on paste
      phoneInput.addEventListener("paste", function (e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData(
          "text"
        );
        const numericText = pastedText.replace(/[^\d+]/g, "");
        phoneInput.value += numericText;
      });

      // Add placeholder format for Indonesian phone numbers
      phoneInput.placeholder = "08xxxxxxxxxx";

      // Format the phone number as the user types
      phoneInput.addEventListener("input", function () {
        // Remove any non-numeric characters except for the first '+'
        let value = this.value.replace(/[^\d+]/g, "");

        // Ensure only one '+' at the beginning if present
        if (value.startsWith("+")) {
          value = "+" + value.substring(1).replace(/\+/g, "");
        } else {
          value = value.replace(/\+/g, "");
        }

        this.value = value;
      });
    }
  }

  function animateFormAppearance() {
    // Animate form groups one by one
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.style.opacity = "0";
        group.style.transform = "translateY(20px)";
        group.style.transition = "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {
          group.style.opacity = "1";
          group.style.transform = "translateY(0)";
        }, 100);
      }, index * 150);
    });

    // Animate button and login link
    setTimeout(() => {
      registerButton.style.opacity = "0";
      registerButton.style.transform = "translateY(20px)";
      registerButton.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        registerButton.style.opacity = "1";
        registerButton.style.transform = "translateY(0)";
      }, 100);
    }, formGroups.length * 150);

    const loginLink = document.querySelector(".login-link");
    setTimeout(() => {
      loginLink.style.opacity = "0";
      loginLink.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        loginLink.style.opacity = "1";
      }, 100);
    }, formGroups.length * 150 + 200);
  }

  function setupPasswordToggle() {
    // Create toggle buttons for both password fields
    const setupToggleForInput = (input) => {
      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.className = "toggle-password";
      toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';

      // Add button to password input container
      const inputContainer = input.parentElement;
      inputContainer.style.position = "relative";
      inputContainer.appendChild(toggleButton);

      // Toggle password visibility on click
      toggleButton.addEventListener("click", () => {
        if (input.type === "password") {
          input.type = "text";
          toggleButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        } else {
          input.type = "password";
          toggleButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        }
      });
    };

    // Setup toggle for both password fields
    setupToggleForInput(passwordInput);
    setupToggleForInput(confirmPasswordInput);
  }

  function handleFormSubmission() {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Reset any previous error messages
      removeErrorMessages();

      // Validate form
      if (validateForm()) {
        // Show loading state
        registerButton.classList.add("loading");

        // Simulate API call (replace with actual API call)
        setTimeout(() => {
          registerButton.classList.remove("loading");

          // Show success animation
          const successContainer = document.querySelector(".register-success");
          successContainer.classList.add("show");

          // Redirect to login page after delay
          setTimeout(() => {
            window.location.href = "login.html";
          }, 3000);
        }, 2000);
      }
    });
  }

  function validateForm() {
    let isValid = true;

    // Validate fullname (not empty)
    if (fullnameInput.value.trim() === "") {
      showError(fullnameInput, "Nama lengkap tidak boleh kosong");
      isValid = false;
    }

    // Validate phone number (Indonesian format)
    const phoneRegex = /^(\+62|62|0)[0-9]{8,15}$/;
    if (!phoneRegex.test(phoneInput.value)) {
      showError(
        phoneInput,
        "Format nomor HP tidak valid (contoh: 08xxxxxxxxxx)"
      );
      isValid = false;
    }

    // Validate username (alphanumeric and minimum 5 characters)
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    if (!usernameRegex.test(usernameInput.value)) {
      showError(
        usernameInput,
        "Username harus minimal 5 karakter dan hanya mengandung huruf dan angka"
      );
      isValid = false;
    }

    // Validate password (minimum 8 characters with at least one number and one letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
      showError(
        passwordInput,
        "Password harus minimal 8 karakter dan mengandung setidaknya 1 huruf dan 1 angka"
      );
      isValid = false;
    }

    // Validate password confirmation
    if (passwordInput.value !== confirmPasswordInput.value) {
      showError(confirmPasswordInput, "Konfirmasi password tidak sesuai");
      isValid = false;
    }

    return isValid;
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
  }

  function removeErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());
  }
});

function addUserToAdminConfig() {
  const user = {
    fullname: fullnameInput.value,
    phone: phoneInput.value,
    username: usernameInput.value,
    role: "Pengguna" // default role
  };
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  users.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

if (validateForm()) {
  registerButton.classList.add("loading");
  
  // Tambahkan data registrasi ke localStorage untuk AdminConfigMenu
  addUserToAdminConfig();

  setTimeout(() => {
    registerButton.classList.remove("loading");
    const successContainer = document.querySelector(".register-success");
    successContainer.classList.add("show");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);
  }, 2000);
}
