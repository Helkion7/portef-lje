const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const navItems = navLinks.getElementsByTagName("li");

burger.addEventListener("change", () => {
  if (burger.checked) {
    navLinks.style.display = "block";
  } else {
    navLinks.style.display = "none";
  }
});

Array.from(navItems).forEach((item) => {
  item.addEventListener("click", () => {
    burger.checked = false;
    navLinks.style.display = "none";
  });
});

let lastScrollPosition = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollPosition = currentScrollPosition;
});
