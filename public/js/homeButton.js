window.onload = function () {
  const homeButton = document.getElementById("homeButton");
  const currentUrl = window.location.href;
  const homeUrl = "http://127.0.0.1:5500/public/";

  // Show the "Home" button if we're on a different page than the base URL
  if (currentUrl !== homeUrl) {
    homeButton.style.display = "flex";
  }
};
