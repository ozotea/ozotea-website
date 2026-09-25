/*
 * Motion layer: headline word reveals, 3D tilt, cursor spotlight,
 * magnetic buttons, scroll progress and the process beam.
 * Everything here is decorative; the page works without it.
 */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Word-by-word headings ---------- */
  // Wraps each word in a span so CSS can stagger them in once the
  // heading's .reveal ancestor gets .is-in.
  function splitWords(el) {
    let i = 0;
    const walk = (node, gradient) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(" ");
            const w = document.createElement("span");
            w.className = gradient ? "w grad" : "w";
            w.style.setProperty("--i", i++);
            w.textContent = part;
            frag.append(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
          // background-clip:text doesn't survive transformed children,
          // so the gradient moves from the wrapper onto each word.
          const isGrad = child.classList.contains("grad");
          if (isGrad) child.classList.remove("grad");
          walk(child, gradient || isGrad);
        }
      });
    };
    walk(el, false);
    el.classList.add("split");
  }
  $$(".hero__title, .section__head h2, .contact h2").forEach(splitWords);

  /* ---------- Scroll progress ---------- */
  const bar = document.createElement("div");
  bar.className = "progress";
  bar.setAttribute("aria-hidden", "true");
  $("#nav").append(bar);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Process beam ---------- */
  const process = $(".process");
  if (process) {
    $$(".step", process).forEach((s, i) => s.style.setProperty("--i", i));
    new IntersectionObserver(
      (entries, obs) => entries.forEach((e) => {
        if (e.isIntersecting) { process.classList.add("is-lit"); obs.disconnect(); }
      }),
      { threshold: 0.4 }
    ).observe(process);
  }

  if (reduceMotion || !finePointer) return;

  /* ---------- Hero: 3D tilt + cursor spotlight ---------- */
  const hero = $(".hero");
  const visual = $(".hero__visual");
  if (hero && visual) {
    const tilt = document.createElement("div");
    tilt.className = "hero__tilt";
    tilt.append(...visual.childNodes);
    visual.append(tilt);

    const spot = document.createElement("div");
    spot.className = "hero__spot";
    spot.setAttribute("aria-hidden", "true");
    hero.prepend(spot);

    let raf = 0;
    hero.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 12}deg)`;
        hero.style.setProperty("--sx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--sy", `${e.clientY - r.top}px`);
        hero.classList.add("is-lit");
      });
    });
    hero.addEventListener("pointerleave", () => {
      tilt.style.transform = "";
      hero.classList.remove("is-lit");
    });
  }

  /* ---------- Work phone tilt ---------- */
  $$("#workPanel, #upcomingPanel").forEach((panel) => {
    panel.addEventListener("pointermove", (e) => {
      const area = e.target.closest(".work-panel__visual");
      const phone = area && $(".phone", area);
      if (!phone) return;
      const r = area.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      phone.style.transform = `perspective(1000px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    });
    panel.addEventListener("pointerout", (e) => {
      const area = e.target.closest(".work-panel__visual");
      if (area && !area.contains(e.relatedTarget)) {
        const phone = $(".phone", area);
        if (phone) phone.style.transform = "";
      }
    });
  });

  /* ---------- Magnetic buttons ---------- */
  $$(".btn--primary").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.translate = `${x * 0.18}px ${y * 0.3}px`;
    });
    btn.addEventListener("pointerleave", () => (btn.style.translate = ""));
  });
})();
