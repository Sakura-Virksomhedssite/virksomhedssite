(() => {
  const nav = document.querySelector(".site-nav");
  const burger = document.querySelector(".burger");
  const menuLinks = document.querySelectorAll(".nav-menu a");

  function setMenuState(isOpen) {
    if (!nav || !burger) return;

    nav.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Luk menu" : "Åbn menu");
  }

  setMenuState(false);

  if (burger) {
    burger.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 860) {
      setMenuState(false);
    }
  });
})();
