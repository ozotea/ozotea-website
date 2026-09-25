/*
 * Cloudflare Web Analytics: cookieless visitor counts, countries, pages and
 * referrers. Dashboard: dash.cloudflare.com → Analytics & Logs → Web Analytics.
 * Paste the site token below; while it's empty, nothing loads.
 */
(() => {
  const CF_TOKEN = "";
  if (!CF_TOKEN) return;
  const s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_TOKEN }));
  document.head.append(s);
})();
