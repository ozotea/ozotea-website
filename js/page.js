/* Shared behaviour for secondary pages (privacy, terms): nav state, mobile menu, footer year. */
(() => {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = nav.querySelector(".nav__toggle");
  const menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", () => {
    const open = menu.hidden;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    nav.classList.toggle("is-scrolled", open || window.scrollY > 10);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
