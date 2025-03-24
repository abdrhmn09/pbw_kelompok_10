// Form submission handler
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const loginType = document.getElementById("login-type").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Here you would normally handle authentication
  console.log("Login attempt:", { loginType, username, password });

  // For demo purposes, redirect based on login type
  if (loginType === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "user-dashboard.html";
  }
});

// You can keep any other existing login.js code below if needed
