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

  /* ---------- Hero: drag-to-rotate 3D phones ---------- */
  // Each hero phone becomes a solid 3D object (stacked body layers, a back
  // face and the screen on top). The pair can be dragged 360° with mouse or
  // touch, keeps spinning with momentum, then settles back to the front.
  const hero = $(".hero");
  const visual = $(".hero__visual");
  if (hero && visual) {
    const DEPTH = 14;      // phone thickness in px
    const LAYERS = 12;     // body slices that give the rounded sides
    const logoSrc = ($(".logo__img") || {}).src || "";

    const tilt = document.createElement("div");
    tilt.className = "hero__tilt";
    $$(".hero__visual > .phone").forEach((phone) => {
      const body = document.createElement("div");
      const pos = [...phone.classList].filter((c) => c.startsWith("phone--"));
      body.className = ["phone3d", ...pos].join(" ");
      phone.classList.remove(...pos);
      for (let i = 0; i < LAYERS; i++) {
        const layer = document.createElement("i");
        layer.className = "phone3d__layer";
        layer.style.transform = `translateZ(${-DEPTH / 2 + (DEPTH * i) / (LAYERS - 1)}px)`;
        body.append(layer);
      }
      const back = document.createElement("div");
      back.className = "phone3d__back";
      back.innerHTML = `<span class="phone3d__cam"><i></i><i></i><i></i></span>${logoSrc ? `<img src="${logoSrc}" alt="" />` : ""}`;
      back.style.transform = `rotateY(180deg) translateZ(${DEPTH / 2 + 0.5}px)`;
      phone.style.transform = `translateZ(${DEPTH / 2 + 0.5}px)`;
      body.append(back, phone);
      tilt.append(body);
    });
    visual.append(tilt);

    const hint = document.createElement("div");
    hint.className = "hero__hint";
    hint.innerHTML = "<span>⟲</span> Drag to rotate in 3D";
    visual.append(hint);

    // Rotation state: user rotation (drag + momentum) plus a small hover parallax.
    let rotY = 0, rotX = 0, velY = 0, velX = 0, hoverY = 0, hoverX = 0;
    let dragging = false, lastX = 0, lastY = 0, lastT = 0, idleSince = performance.now(), raf = 0;
    const clampX = (v) => Math.max(-40, Math.min(40, v));
    const render = () => {
      tilt.style.transform = `rotateX(${rotX + hoverX}deg) rotateY(${rotY + hoverY}deg)`;
    };
    const loop = (now) => {
      raf = 0;
      if (!dragging) {
        if (Math.abs(velY) > 0.02 || Math.abs(velX) > 0.02) {
          rotY += velY; rotX = clampX(rotX + velX);
          velY *= 0.95; velX *= 0.9;
          idleSince = now;
        } else if (now - idleSince > 2500) {
          // Ease back to the nearest front-facing angle.
          const target = Math.round(rotY / 360) * 360;
          rotY += (target - rotY) * 0.06; rotX += (0 - rotX) * 0.06;
          if (Math.abs(target - rotY) < 0.1 && Math.abs(rotX) < 0.1) { rotY = target; rotX = 0; render(); return; }
        }
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    visual.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true; lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
      velY = velX = 0;
      visual.setPointerCapture(e.pointerId);
      visual.classList.add("is-dragging");
      hint.classList.add("is-used");
      kick();
    });
    visual.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const now = performance.now(), dt = Math.max(16, now - lastT);
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      rotY += dx * 0.55; rotX = clampX(rotX - dy * 0.35);
      velY = (dx * 0.55 * 16) / dt; velX = (-dy * 0.35 * 16) / dt;
      lastX = e.clientX; lastY = e.clientY; lastT = now; idleSince = now;
      render();
    });
    const release = () => {
      if (!dragging) return;
      dragging = false;
      visual.classList.remove("is-dragging");
      if (reduceMotion) velY = velX = 0;
      idleSince = performance.now();
      kick();
    };
    visual.addEventListener("pointerup", release);
    visual.addEventListener("pointercancel", release);
    visual.addEventListener("dblclick", () => { velY = 0; velX = 0; idleSince = 0; kick(); });

    // Hover parallax + grid spotlight (mouse only)
    if (finePointer && !reduceMotion) {
      const spot = document.createElement("div");
      spot.className = "hero__spot";
      spot.setAttribute("aria-hidden", "true");
      hero.prepend(spot);
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (!dragging) { hoverY = x * 16; hoverX = -y * 12; render(); }
        hero.style.setProperty("--sx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--sy", `${e.clientY - r.top}px`);
        hero.classList.add("is-lit");
      });
      hero.addEventListener("pointerleave", () => {
        hoverY = hoverX = 0; render();
        hero.classList.remove("is-lit");
      });
    }
  }

  if (reduceMotion || !finePointer) return;

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
