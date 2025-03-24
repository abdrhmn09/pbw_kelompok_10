// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const loginForm = document.querySelector("#loginForm");
  const loginTypeSelect = document.getElementById("login-type");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.querySelector(".login-button");
  const formGroups = document.querySelectorAll(".form-group");
  const appInfo = document.querySelector(".app-info");
  const loginFormContainer = document.querySelector(".login-form");

  // Add initial animations
  initPageAnimations();

  // Setup form interactions
  setupFormInteractions();

  // Setup toggle password visibility
  setupPasswordToggle();

  // Create success animation elements
  createSuccessElements();

  // Handle form submission
  handleFormSubmission();

  // Functions
  function initPageAnimations() {
    // Add animation classes after a small delay
    setTimeout(() => {
      appInfo.classList.add("app-info-fade-in");
      loginFormContainer.classList.add("form-fade-in");
    }, 100);

    // Create and add particles to the app-info section
    createParticles();
  }

  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    particlesContainer.style.position = "absolute";
    particlesContainer.style.top = "0";
    particlesContainer.style.left = "0";
    particlesContainer.style.width = "100%";
    particlesContainer.style.height = "100%";
    particlesContainer.style.overflow = "hidden";
    particlesContainer.style.zIndex = "1";

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = "rgba(255, 255, 255, 0.5)";
      particle.style.borderRadius = "50%";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animation = `floatParticle ${
        Math.random() * 10 + 5
      }s linear infinite`;

      particlesContainer.appendChild(particle);
    }

    appInfo.appendChild(particlesContainer);

    // Add the keyframes for the particle animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(${Math.random() * 50 - 25}px, ${
      Math.random() * 50 - 25
    }px);
        }
        50% {
          transform: translate(${Math.random() * 50 - 25}px, ${
      Math.random() * 50 - 25
    }px);
        }
        75% {
          transform: translate(${Math.random() * 50 - 25}px, ${
      Math.random() * 50 - 25
    }px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setupFormInteractions() {
    // Add focus and blur event listeners to inputs
    const inputs = document.querySelectorAll(
      ".form-group input, .form-group select"
    );

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

    // Animate button and register link
    setTimeout(() => {
      loginButton.style.opacity = "0";
      loginButton.style.transform = "translateY(20px)";
      loginButton.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        loginButton.style.opacity = "1";
        loginButton.style.transform = "translateY(0)";
      }, 100);
    }, formGroups.length * 150);

    const registerLink = document.querySelector(".register-link");
    setTimeout(() => {
      registerLink.style.opacity = "0";
      registerLink.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        registerLink.style.opacity = "1";
      }, 100);
    }, formGroups.length * 150 + 200);
  }

  function setupPasswordToggle() {
    // Create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "toggle-password";
    toggleButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';

    // Add button to password input container
    const passwordContainer = passwordInput.parentElement;
    passwordContainer.style.position = "relative";
    passwordContainer.appendChild(toggleButton);

    // Toggle password visibility on click
    toggleButton.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
      } else {
        passwordInput.type = "password";
        toggleButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
    });
  }

  function createSuccessElements() {
    // Create success overlay
    const successOverlay = document.createElement("div");
    successOverlay.className = "login-success";

    // Create checkmark SVG
    successOverlay.innerHTML = `
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
      <h3 style="margin-top: 20px; font-size: 24px;">Login Berhasil!</h3>
      <p style="margin-top: 10px;">Redirecting...</p>
    `;

    // Append to login container
    document.querySelector(".login-container").appendChild(successOverlay);
  }

  function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Create error element
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;

    // Add to form
    loginForm.appendChild(errorElement);

    // Remove error after delay
    setTimeout(() => {
      errorElement.style.opacity = "0";
      errorElement.style.transform = "translateY(-10px)";
      errorElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";

      setTimeout(() => {
        errorElement.remove();
      }, 300);
    }, 4000);

    // Shake form on error
    loginForm.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";
    setTimeout(() => {
      loginForm.style.animation = "";
    }, 500);

    // Add shake keyframes if not already added
    if (!document.querySelector("#shake-keyframes")) {
      const style = document.createElement("style");
      style.id = "shake-keyframes";
      style.textContent = `
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function showLoading() {
    loginButton.classList.add("loading");
    loginButton.disabled = true;
  }

  function hideLoading() {
    loginButton.classList.remove("loading");
    loginButton.disabled = false;
  }

  function showSuccess(redirectUrl) {
    const successOverlay = document.querySelector(".login-success");
    successOverlay.classList.add("show");

    // Redirect after animation
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  }

  function handleFormSubmission() {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const loginType = loginTypeSelect.value;

      // Basic validation
      if (username === "") {
        showError("Username tidak boleh kosong");
        return;
      }

      if (password === "") {
        showError("Password tidak boleh kosong");
        return;
      }

      // Show loading state
      showLoading();

      // Simulate server request (replace with actual authentication)
      setTimeout(() => {
        hideLoading();

        // Check credentials based on login type
        if (loginType === "admin") {
          if (username === "admin" && password === "admin123") {
            showSuccess("../pages/adminDashboard.html");
          } else {
            showError("Username atau password admin salah!");
          }
        } else if (loginType === "user") {
          const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
          const user = users.find(u => u.username === username && u.password === password);
            if (user) {
              // Simpan data user yang login
              localStorage.setItem("currentUser", JSON.stringify(user));
              showSuccess("../pages/Userdashboard.html");
            } else {
              showError("Username atau password salah!");
            }
        }
      }, 1500);
    });
  }
});
