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

  /* Scrollspy: highlight the "On this page" link for the section being read */
  const links = [...document.querySelectorAll(".legal__toc a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  if (links.length) {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let active = 0;
      sections.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top <= line) active = i; });
      // At the very bottom, the last (short) section can't reach the line, so select it.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections.length - 1;
      links.forEach((a, i) => {
        a.classList.toggle("is-active", i === active);
        if (i === active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Anchor jumps (clicking the list, or opening a #section link) update immediately.
    window.addEventListener("hashchange", update);
    window.addEventListener("load", update);
    update();
  }
})();
