# Ozotea Website

Static marketing site for Ozotea — no build step, no dependencies.

## Run locally
```bash
npm install      # first time only
npm start        # opens http://localhost:5173 and auto-reloads on every file save
```
`npm run dev` does the same without opening a browser tab.
No Node? `python3 -m http.server 5173` also works (without auto-reload).

## Structure
```
index.html        Page markup (all sections)
css/styles.css    Design tokens (top of file), layout, responsive rules
js/data.js        CONTENT: portfolio projects, tech stack, testimonials, FAQs
js/main.js        Rendering + interactions (tabs, modal, animations, form)
assets/           Favicon and future images
```

## Updating content
Edit `js/data.js` — no HTML changes needed.

- **Add a project:** copy an object in `projects`. `color`/`color2` set the gradient;
  `screen` drives the phone mockup. To use real screenshots later, replace the
  `phoneHTML()` output in `main.js` with an `<img>` inside `.phone`.
- **Brand colours:** change `--accent` / `--accent-2` in `:root` in `styles.css`.

## Still to do
- Replace the placeholder stats row (`data-count` values in `index.html`).
- Connect the contact form to a backend (e.g. Formspree); it currently opens the visitor's email app.
- Add LinkedIn (and Clutch, if listed) to the footer's Connect column when available.
- Add real client testimonials to `testimonials` in `js/data.js` (the section stays hidden while empty).

## Deploy (live site)

Hosted on **GitHub Pages** from the `main` branch of
[ozotea/ozotea-website](https://github.com/ozotea/ozotea-website), served at
**https://www.ozotea.com** (the bare `ozotea.com` redirects there).

**To publish a change:** commit and push to `main`. GitHub Pages redeploys
automatically, usually within a minute. Check progress under the repo's
**Actions** tab ("pages build and deployment").

```bash
git add -A
git commit -m "Describe the change"
git push
```

- `CNAME` holds the custom domain. Don't delete it, or the site falls back to `ozotea.github.io`.
- `.nojekyll` tells Pages to serve files as-is (no Jekyll processing).

### DNS (GoDaddy → ozotea.com → DNS)

| Type  | Name | Value                |
|-------|------|----------------------|
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | ozotea.github.io     |

Remove any other `A` record on `@` (GoDaddy's default "Parked") and any
existing `www` record, or GitHub can't issue the HTTPS certificate.
