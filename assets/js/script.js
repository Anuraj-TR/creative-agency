const doc = document.querySelector("html");
const toggle = document.querySelector("#theme");
const img = document.querySelector(".ca-header__logo");

const loadTheme = () => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme")
    ? "dark"
    : localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light";
};

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  doc.setAttribute("data-theme", theme);
  doc.classList.remove(...doc.classList);
  doc.classList.add(theme);
  if (typeof toggle !== "undefined" && toggle !== null) {
    theme === "dark" ? (toggle.checked = true) : (toggle.checked = false);
  }
  img.setAttribute(
    "src",
    theme === "dark"
      ? "./assets/images/creative-agency-dark.svg"
      : "./assets/images/creative-agency-light.svg"
  );
};

toggle &&
  toggle.addEventListener("click", () => {
    doc.getAttribute("data-theme") === "dark"
      ? setTheme("light")
      : setTheme("dark");
  });

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    setTheme(e.matches ? "dark" : "light");
  });

window.addEventListener("load", () => {
  setTheme(loadTheme());
});

// header mobile menu toggle
const hamburger = document.querySelector("[data-hamburger]");
const header = document.querySelector(".ca-header");
const nav = document.querySelector(".ca-header__nav");

const mobileMenuTrigger = () => {
  const nav = document.querySelector(".ca-header__nav");
  nav.classList.toggle("ca-header__nav--show");
  const { height } = header.getBoundingClientRect();
  nav.style.top = height + "px";
  nav.classList.contains("ca-header__nav--show")
    ? hamburger.classList.add("ca-header__hamburger--open")
    : hamburger.classList.remove("ca-header__hamburger--open");
};

hamburger.addEventListener("click", mobileMenuTrigger);

// change header background on scroll
const changeHeaderBackground = (e) => {
  window.scrollY > 0
    ? header.classList.add("ca-header--scrolled")
    : header.classList.remove("ca-header--scrolled");
};

window.addEventListener("scroll", changeHeaderBackground);
