# Shirebrook Studio — School Portrait Photography Website

A modern, responsive single-page website for a school portrait photography studio
with a Shire / farm theme. Pure HTML + CSS + vanilla JS — no build step, no
dependencies.

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html                  All markup and content
assets/css/style.css        Theme, layout, responsive rules
assets/js/main.js           Mobile nav, gallery lightbox, scroll reveals, booking form
assets/img/hero.svg         Hero illustration (round-door hillside)
assets/img/about.svg        "The farm" illustration
assets/img/gallery-1..6.svg Gallery scenes (illustrated placeholders)
assets/img/favicon.svg      Round-door favicon
```

## Customize it

| What | Where |
|---|---|
| Studio name | `index.html` — `.brand-name` spans (header + footer) |
| Contact email | `index.html` — `data-email` on `#booking-form`, the two `mailto:` links, and the contact card; also `assets/js/main.js` fallback |
| Phone / address | Contact card + footer in `index.html` |
| Prices | `.price` blocks in the Packages section |
| Headline copy | `.hero-inner` in `index.html` |
| Colors | CSS custom properties at the top of `assets/css/style.css` (`--green-700`, `--gold`, …) |
| Fonts | The Google Fonts `<link>` in the `<head>` |

## Swap in real photography

The gallery images (`assets/img/gallery-*.svg`) are illustrated placeholders.
Drop your JPGs into `assets/img/` and update the `src`/`alt` attributes of the
`<figure>` elements in the Gallery section of `index.html` (keep the
`.g-title` spans for captions). The lightbox picks up whatever `src` you use.
The hero and about illustrations can be replaced the same way — `hero.svg` is
loaded as a CSS background in `.hero`, so keep the replacement wide
(≈1440×810) for best results.

## Deploy

- **GitHub Pages:** push to a repo, then *Settings → Pages → Source: Deploy from
  a branch → `/ (root)` on `main`*. Free and instant.
- **Netlify / Vercel:** drag-and-drop the folder or connect the repo — both
  deploy static sites with zero configuration.
- Point your custom domain at the host afterwards.

## Notes

- The booking form doesn't store anything: it validates and opens the visitor's
  email app with a pre-filled message (`mailto:`). To collect requests in a
  database instead, wire the form to a form backend (e.g. Formspree, Netlify
  Forms) — only the `submit` handler in `assets/js/main.js` needs to change.
- Fully responsive (mobile hamburger nav, fluid type via `clamp()`), keyboard
  accessible (skip link, focus styles, lightbox with Esc/arrow support), and
  respects `prefers-reduced-motion`.
