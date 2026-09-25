/*
 * Cookie notice. The site sets no cookies; this tells visitors so, links the
 * Cookie Policy, and remembers "Accept" in localStorage (see cookies.html).
 */
(() => {
  const KEY = "oz_cookie_consent";
  try { if (localStorage.getItem(KEY)) return; } catch (e) { /* storage blocked: show the notice */ }

  const bar = document.createElement("div");
  bar.className = "consent";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Cookie notice");
  bar.innerHTML = `
    <p><strong>No tracking cookies here.</strong> We count visits anonymously with Cloudflare Web Analytics, which doesn’t use cookies.</p>
    <div class="consent__actions">
      <a href="cookies.html" class="consent__link">Cookie policy</a>
      <button type="button" class="btn btn--primary btn--sm consent__accept">Accept</button>
    </div>`;
  document.body.append(bar);
  requestAnimationFrame(() => bar.classList.add("is-in"));

  bar.querySelector(".consent__accept").addEventListener("click", () => {
    try { localStorage.setItem(KEY, new Date().toISOString().slice(0, 10)); } catch (e) { /* ignore */ }
    bar.classList.remove("is-in");
    setTimeout(() => bar.remove(), 400);
  });
})();
