// Get the burger checkbox, nav links, and list items
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const navItems = navLinks.getElementsByTagName("li");

// Add event listener to toggle the nav-links display
burger.addEventListener("change", () => {
  if (burger.checked) {
    navLinks.style.display = "block"; // Show nav-links when burger is checked
  } else {
    navLinks.style.display = "none"; // Hide nav-links when burger is unchecked
  }
});

// Add event listeners to each nav item to hide the nav-links when clicked
Array.from(navItems).forEach((item) => {
  item.addEventListener("click", () => {
    burger.checked = false; // Uncheck the burger checkbox
    navLinks.style.display = "none"; // Hide nav-links
  });
});
