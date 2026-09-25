(() => {
  const { projects, techStack, testimonials, faqs, upcoming = [] } = window.OZ_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Phone mockup ---------- */
  // Renders a generic app screen from a project's `screen` data.
  // `alt` produces a second screen layout for the detail modal.
  const mockupFor = (p) => p.mockup && window.OZ_MOCKUPS && window.OZ_MOCKUPS[p.mockup];

  function phoneHTML(p, alt = false) {
    const m = mockupFor(p);
    if (m) return m.phone(alt);
    const s = p.screen;
    const hero = `
      <div class="ps__hero">
        <small>${esc(s.title)}</small>
        <strong>${esc(s.heroValue)}</strong>
        <span>${esc(s.heroSub)}</span>
      </div>`;
    const chips = `<div class="ps__chips">${s.chips.map((c) => `<span>${esc(c)}</span>`).join("")}</div>`;
    const chart = `<div class="ps__chart">${s.bars.map((h) => `<i style="height:${h}%"></i>`).join("")}</div>`;
    const rows = (alt ? [...s.rows, ...s.rows] : s.rows)
      .map((r) => `<div class="ps__row"><b></b><div><p>${esc(r.t)}</p><small>${esc(r.s)}</small></div><em>${esc(r.v)}</em></div>`)
      .join("");
    const body = alt ? chips + chart + rows : hero + chips + chart + rows;
    return `
      <div class="phone" style="--c1:${p.color};--c2:${p.color2}">
        <div class="phone__screen">
          <div class="ps__top"><span class="ps__greet">${esc(s.greeting)}</span><span class="ps__avatar"></span></div>
          ${body}
          <div class="ps__tabbar"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>`;
  }

  // Hero phones
  $$(".hero__visual [data-screen]").forEach((el) => {
    const p = projects.find((x) => x.id === el.dataset.screen);
    if (!p) return;
    const tmp = document.createElement("div");
    tmp.innerHTML = phoneHTML(p).trim();
    const phone = tmp.firstElementChild;
    phone.classList.add(...el.classList);
    el.replaceWith(phone);
  });

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Hover pill that slides from one nav link to the next
  const navLinks = $(".nav__links");
  const indicator = $(".nav__indicator");
  const moveIndicator = (link) => {
    const appearing = !indicator.classList.contains("is-visible");
    // First appearance: jump into place and fade in; afterwards: slide.
    indicator.classList.toggle("no-slide", appearing);
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    if (appearing) indicator.offsetWidth; // flush so the jump isn't animated
    indicator.classList.remove("no-slide");
    indicator.classList.add("is-visible");
  };
  $$("a", navLinks).forEach((a) => {
    a.addEventListener("pointerenter", () => moveIndicator(a));
    a.addEventListener("focus", () => moveIndicator(a));
  });
  navLinks.addEventListener("pointerleave", () => indicator.classList.remove("is-visible"));
  navLinks.addEventListener("focusout", (e) => {
    if (!navLinks.contains(e.relatedTarget)) indicator.classList.remove("is-visible");
  });

  const toggle = $(".nav__toggle");
  const menu = $("#mobileMenu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    nav.classList.toggle("is-scrolled", open || window.scrollY > 10);
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Typed command ---------- */
  const typed = $("#typed");
  const words = ["ios", "android", "flutter", "react-native", "web"];
  if (!reduceMotion) {
    let wi = 0, ci = words[0].length, deleting = true;
    const tick = () => {
      const w = words[wi];
      if (deleting) {
        ci--;
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      } else {
        ci++;
      }
      typed.textContent = words[wi].slice(0, ci) || "";
      let delay = deleting ? 45 : 90;
      if (!deleting && ci === words[wi].length) { deleting = true; delay = 1800; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 1800);
  }

  /* ---------- Services hover glow ---------- */
  $$(".service").forEach((el) =>
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    })
  );

  /* ---------- Tabbed showcase (Work + Upcoming) ---------- */
  // Tabs + one panel that auto-advances every 7s, pausing while the
  // pointer or focus is inside the panel.
  function showcase({ tabs, panel, items, render, prefix }) {
    let current = 0;
    let timer;
    tabs.innerHTML = items
      .map(
        (p, i) => `<button class="work-tab" role="tab" id="${prefix}-${p.id}" aria-controls="${panel.id}" aria-selected="${i === 0}" style="--c:${p.color}"><i></i>${esc(p.name)}</button>`
      )
      .join("");
    const show = (i) => {
      current = i;
      const p = items[i];
      $$(".work-tab", tabs).forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
      panel.setAttribute("aria-labelledby", `${prefix}-${p.id}`);
      panel.style.cssText = `--c1:${p.color};--c2:${p.color2}`;
      panel.innerHTML = render(p, i);
    };
    const restart = () => {
      clearInterval(timer);
      if (reduceMotion || items.length < 2) return;
      timer = setInterval(() => {
        if (!document.hidden && panel.dataset.hover !== "1") show((current + 1) % items.length);
      }, 7000);
    };
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".work-tab");
      if (!btn) return;
      show($$(".work-tab", tabs).indexOf(btn));
      restart();
    });
    tabs.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = (current + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
      show(next);
      $$(".work-tab", tabs)[next].focus();
      restart();
    });
    panel.addEventListener("pointerenter", () => (panel.dataset.hover = "1"));
    panel.addEventListener("pointerleave", () => (panel.dataset.hover = "0"));
    panel.addEventListener("focusin", () => (panel.dataset.hover = "1"));
    panel.addEventListener("focusout", () => (panel.dataset.hover = "0"));
    show(0);
    restart();
  }

  /* ---------- Work ---------- */
  const workPanel = $("#workPanel");

  const chips = (arr, cls = "") => arr.map((x) => `<span class="chip ${cls}">${esc(x)}</span>`).join("");
  const soonChips = (arr) => arr.map((x) => `<span class="chip chip--soon">${esc(x)}<small>Soon</small></span>`).join("");
  const nameHTML = (p) => `
    <div class="work-panel__name">
      ${p.logo ? `<img src="${esc(p.logo)}" alt="" width="32" height="32" />` : "<i></i>"}${esc(p.name)}
      ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
    </div>`;
  const platformsHTML = (p) =>
    `<dt>${p.comingSoon ? "Live on" : "Platforms"}</dt><dd>${chips(p.platforms, "chip--platform")}</dd>` +
    (p.comingSoon ? `<dt>Coming soon</dt><dd>${soonChips(p.comingSoon)}</dd>` : "");
  const linksHTML = (p) =>
    (p.links || [])
      .map((l) => `<a class="btn btn--ghost btn--sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span aria-hidden="true">↗</span></a>`)
      .join("");

  const metricsHTML = (p) =>
    `<div class="metrics">${p.metrics.map((m) => `<div><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join("")}</div>`;

  const renderWork = (p, i) => `
      <div class="work-panel__info">
        <span class="work-panel__cat">${esc(p.category)}</span>
        ${nameHTML(p)}
        <h3>${esc(p.headline)}</h3>
        <p>${esc(p.summary)}</p>
        <dl class="meta">
          ${platformsHTML(p)}
          <dt>Built with</dt><dd>${chips(p.stack)}</dd>
        </dl>
        ${metricsHTML(p)}
        <div class="work-panel__actions">
          <button class="btn btn--primary btn--sm" data-open="${i}">See case study →</button>
          ${linksHTML(p)}
        </div>
      </div>
      <div class="work-panel__visual">${phoneHTML(p)}</div>`;

  showcase({ tabs: $("#workTabs"), panel: workPanel, items: projects, render: renderWork, prefix: "wt" });

  /* ---------- Project modal ---------- */
  const modal = $("#projectModal");
  const modalBody = $("#modalBody");

  function openProject(i) {
    const p = projects[i];
    modal.style.cssText = `--c1:${p.color};--c2:${p.color2}`;
    modalBody.innerHTML = `
      <div class="modal__hero">${phoneHTML(p)}${phoneHTML(p, true)}</div>
      <div class="modal__content">
        <span class="work-panel__cat">${esc(p.category)}</span>
        ${nameHTML(p)}
        <h3 id="modalTitle">${esc(p.headline)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="modal__cols">
          <div>
            <h4>What we built</h4>
            <ul class="feature-list">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          </div>
          <div>
            <h4>${p.comingSoon ? "Live on" : "Platforms"}</h4>
            <div class="chip-row">${chips(p.platforms, "chip--platform")}</div>
            ${p.comingSoon ? `<h4>Coming soon</h4><div class="chip-row">${soonChips(p.comingSoon)}</div>` : ""}
            <h4>Tech stack</h4>
            <div class="chip-row">${chips(p.stack)}</div>
          </div>
        </div>
        ${metricsHTML(p)}
        <div class="work-panel__actions">
          <a href="#contact" class="btn btn--primary btn--sm" data-close>Build something like this</a>
          ${linksHTML(p)}
        </div>
      </div>`;
    modal.showModal();
    document.body.classList.add("modal-open");
    modal.scrollTop = 0;
  }
  const closeModal = () => modal.close();

  workPanel.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) openProject(Number(b.dataset.open));
  });
  $(".modal__close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });
  modal.addEventListener("close", () => document.body.classList.remove("modal-open"));

  /* ---------- Tech tabs ---------- */
  const techTabs = $("#techTabs");
  const techGrid = $("#techGrid");
  const cats = Object.keys(techStack);
  techTabs.innerHTML = cats
    .map((c, i) => `<button class="tech__tab" role="tab" aria-selected="${i === 0}">${esc(c)}</button>`)
    .join("");
  const initials = (name) => name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2);
  function renderTech(i) {
    $$(".tech__tab", techTabs).forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
    techGrid.innerHTML = techStack[cats[i]]
      .map((t, k) => `<div class="tech__item" style="animation-delay:${k * 40}ms"><b>${esc(initials(t))}</b>${esc(t)}</div>`)
      .join("");
  }
  techTabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tech__tab");
    if (b) renderTech($$(".tech__tab", techTabs).indexOf(b));
  });
  renderTech(0);

  /* ---------- Testimonials (duplicated for seamless loop) ---------- */
  const quoteHTML = (t, hidden) => `
    <figure class="quote"${hidden ? ' aria-hidden="true"' : ""}>
      <blockquote>“${esc(t.quote)}”</blockquote>
      <figcaption>
        <span class="quote__avatar">${esc(initials(t.name.replace(/^Dr\.?\s*/, "")))}</span>
        <div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div>
      </figcaption>
    </figure>`;
  $("#testimonials").hidden = testimonials.length === 0;
  $("#quotes").innerHTML =
    testimonials.map((t) => quoteHTML(t, false)).join("") + testimonials.map((t) => quoteHTML(t, true)).join("");

  /* ---------- Upcoming ---------- */
  const statusClass = { Design: "design", "In development": "dev", "Beta testing": "beta" };
  const renderUpcoming = (u) => {
    const pct = Math.max(0, Math.min(100, Number(u.progress) || 0));
    return `
      <div class="work-panel__info">
        <div class="upcoming__top">
          <span class="status status--${statusClass[u.status] || "dev"}"><i></i>${esc(u.status || "In development")}</span>
          ${u.eta ? `<span class="upcoming__eta">ETA ${esc(u.eta)}</span>` : ""}
        </div>
        <span class="work-panel__cat">${esc(u.category || "")}${u.client ? ` · for ${esc(u.client)}` : ""}</span>
        ${nameHTML(u)}
        <p>${esc(u.summary || "")}</p>
        ${u.highlights ? `<ul class="feature-list upcoming__list">${u.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        <dl class="meta">
          <dt>Platforms</dt><dd>${chips(u.platforms || [], "chip--platform")}</dd>
          ${u.stack ? `<dt>Built with</dt><dd>${chips(u.stack)}</dd>` : ""}
        </dl>
        <div class="upcoming__progress">
          <div class="upcoming__bar" style="--p:${pct}%"><i></i></div>
          <span>${pct}% complete</span>
        </div>
      </div>
      <div class="work-panel__visual">${phoneHTML(u)}</div>`;
  };
  $("#upcoming").hidden = upcoming.length === 0;
  if (upcoming.length) {
    showcase({ tabs: $("#upcomingTabs"), panel: $("#upcomingPanel"), items: upcoming, render: renderUpcoming, prefix: "ut" });
  }

  /* ---------- FAQ ---------- */
  $("#faqList").innerHTML = faqs
    .map((f, i) => `<details class="faq__item reveal"${i === 0 ? " open" : ""}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("");

  /* ---------- Counters ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const start = performance.now();
    const dur = 1600;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-in");
        const counter = el.matches("[data-count]") ? el : $("[data-count]", el);
        if (counter) countUp(counter);
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  // Stagger siblings that reveal together
  $$(".reveal").forEach((el) => {
    const siblings = $$(":scope > .reveal", el.parentElement);
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${Math.min(idx, 6) * 70}ms`;
    io.observe(el);
  });

  /* ---------- Contact form ---------- */
  // No backend yet: validates, then opens the user's email client with the details filled in.
  // Swap this for Formspree / your API when ready.
  const form = $("#contactForm");
  const status = $("#formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((f) => {
      const valid = f.value.trim() && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      status.textContent = "Please fill in your name, a valid email and a short message.";
      status.classList.add("is-error");
      return;
    }
    const data = new FormData(form);
    const needs = data.getAll("need").join(", ") || "Not specified";
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nNeeds: ${needs}\nBudget: ${data.get("budget")}\n\n${data.get("message")}`;
    window.location.href = `mailto:ozotea.opc@gmail.com?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
    status.classList.remove("is-error");
    status.textContent = "Thanks! Your email app should open now — we’ll reply within 12 hours.";
    form.reset();
  });
  form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));

  $("#year").textContent = new Date().getFullYear();
})();
