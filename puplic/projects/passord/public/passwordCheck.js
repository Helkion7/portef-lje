function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const strengthIndicator = document.getElementById("passwordStrength");
    const result = zxcvbn(password);

    const strength = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["red", "orange", "yellow", "green", "lightgreen"];
    const text = ["white", "black", "black", "black", "black"];

    strengthIndicator.textContent = `Password Strength: ${strength[result.score]}`;
    strengthIndicator.style.backgroundColor = colors[result.score];
    strengthIndicator.style.color = text[result.score];
    strengthIndicator.style.textAlign = "center";
    strengthIndicator.style.marginTop = "10px";
  }

  document.getElementById("registerForm").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const result = zxcvbn(password);

    if (result.score < 3) {
      event.preventDefault();
      alert("Password is not strong enough. Please choose a stronger password.");
    }
  });