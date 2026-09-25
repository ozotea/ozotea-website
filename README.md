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

## Before going live
- Replace dummy projects, testimonials, stats (`data-count` in `index.html`) and client names in the logo marquee.
- Replace `hello@ozotea.com` and the phone number.
- Hook the contact form to a backend (Formspree, Netlify Forms, or your API) — it currently opens the visitor's email client.
- Add real social links in the footer.

## Deploy
Upload the folder as-is to Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host.
