const doc = document.querySelector("html");
const toggle = document.querySelector("[data-toggle]");
const toggleIndicator = document.querySelector("[data-toggle-pointer]");

const loadTheme = () => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme")
    ? "dark"
    : localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light";
};

const setToggleIndicator = (theme) => {
  theme === "dark"
    ? toggleIndicator?.toggleIndicator.classList.add("dark")
    : toggleIndicator?.toggleIndicator.classList.remove("dark");
};

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  doc.setAttribute("data-theme", theme);
  doc.classList.remove(...doc.classList);
  doc.classList.add(theme);
  setToggleIndicator(theme);
};

toggle?.toggle.addEventListener("click", () => {
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
