(() => {
  const scrollFab = document.querySelector(".scroll-fab");
  const siteHeader = document.querySelector(".site-header");
  const siteFooter = document.querySelector(".site-footer");
  const mainSections = Array.from(document.querySelectorAll("main > section"));

  function headerOffset() {
    return siteHeader ? siteHeader.offsetHeight : 0;
  }

  function maxScrollY() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function atPageBottom() {
    return window.scrollY >= maxScrollY() - 24;
  }

  function footerOffset() {
    if (!siteFooter) return 16;

    const footerRect = siteFooter.getBoundingClientRect();
    const overlap = window.innerHeight - footerRect.top + 16;

    return Math.max(16, overlap);
  }

  function isTopMode() {
    return atPageBottom();
  }

  function nextTopLevelSection() {
    const currentMarker = window.scrollY + headerOffset() + 24;
    return mainSections.find((section) => section.offsetTop > currentMarker + 8);
  }

  function scrollForward() {
    const nextSection = nextTopLevelSection();
    const targetTop = nextSection ? nextSection.offsetTop - headerOffset() - 16 : maxScrollY();

    window.scrollTo({
      top: Math.min(maxScrollY(), Math.max(0, targetTop)),
      behavior: "smooth",
    });
  }

  function updateScrollFab() {
    if (!scrollFab) return;

    const topMode = isTopMode();
    scrollFab.textContent = topMode ? "Til toppen" : "Til indhold";
    scrollFab.classList.toggle("is-top", topMode);
    scrollFab.setAttribute("aria-label", topMode ? "Til toppen" : "Til indhold");
    scrollFab.style.bottom = `${footerOffset()}px`;
  }

  if (scrollFab && mainSections.length) {
    scrollFab.addEventListener("click", () => {
      if (isTopMode()) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      scrollForward();
    });
  }

  window.addEventListener("scroll", updateScrollFab, { passive: true });
  window.addEventListener("load", updateScrollFab);
  window.addEventListener("resize", updateScrollFab);
  updateScrollFab();
})();
