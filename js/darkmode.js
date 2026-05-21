(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const themeSwitchText = document.querySelector(".theme-switch-text");
  const storedTheme = localStorage.getItem("sandbox-theme");

  root.dataset.theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";

  function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = root.dataset.theme === "dark";
    const tooltipText = isDark ? "light mode" : "dark mode";

    if (themeSwitchText) {
      themeSwitchText.textContent = isDark ? "Lys" : "Mørk";
    }

    themeToggle.setAttribute("aria-label", isDark ? "Skift til lys tilstand" : "Skift til mørk tilstand");
    themeToggle.setAttribute("aria-checked", String(isDark));
    themeToggle.setAttribute("data-tooltip", tooltipText);
  }

  updateThemeButton();

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("sandbox-theme", root.dataset.theme);
    updateThemeButton();
  });
})();
