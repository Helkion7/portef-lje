const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const navItems = navLinks.getElementsByTagName("li");

const adjustNavDisplay = () => {
  if (window.innerWidth < 769) {
    if (burger.checked) {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
    } else {
      navLinks.style.display = "none";
    }
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "row";
  }
};

burger.addEventListener("change", adjustNavDisplay);
window.addEventListener("resize", adjustNavDisplay);

Array.from(navItems).forEach((item) => {
  item.addEventListener("click", () => {
    burger.checked = false;
    adjustNavDisplay();
  });
});

adjustNavDisplay();

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
