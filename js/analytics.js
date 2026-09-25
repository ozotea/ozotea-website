/*
 * Cloudflare Web Analytics: cookieless visitor counts, countries, pages and
 * referrers. Dashboard: dash.cloudflare.com → Analytics & Logs → Web Analytics.
 * Paste the site token below; while it's empty, nothing loads.
 */
(() => {
  const CF_TOKEN = "3620c5a9bf4645a79dbdb059bf428277";
  if (!CF_TOKEN) return;
  const s = document.createElement("script");
  s.type = "module"; // matches Cloudflare's current snippet
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_TOKEN }));
  document.head.append(s);
})();
