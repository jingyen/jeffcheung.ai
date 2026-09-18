# jeffcheung.ai — brand implementation spec

Implement the design system below across the jeffcheung.ai site. All
assets referenced are in this same delivery folder.

## Design tokens

```
--ink:    #14171A   (primary text, dark backgrounds)
--paper:  #F3F4F2   (page background)
--signal: #1F6E66   (single accent — links, the ".ai" suffix, the cursor mark)
```

Typography: **IBM Plex Mono** for the wordmark/logo lockup and any
code-flavored UI text; **IBM Plex Sans** for body copy and headings.
Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Don't substitute Inter/Roboto/system-ui anywhere — the monospace
wordmark is the whole identity; if the rest of the page reverts to a
generic sans it'll read as two different brands stitched together.

## Files in this delivery

```
assets/
  mark.svg                   — primary icon mark ("jc" + cursor), 512×512, ink bg
  mark-small.svg              — simplified icon ("j" + cursor), use below 96px
  wordmark.svg                 — full wordmark, for light backgrounds
  wordmark-dark.svg            — full wordmark, reversed, for dark backgrounds
  favicon.ico                 — 16/32/48 multi-res, generated from mark-small
  icon-16.png … icon-512.png  — raw PNG raster set (see favicon step below)
  social-avatar-512.png       — square, for LinkedIn/X/GitHub profile photo (not site code — hand to Jeff directly, doesn't belong in the repo)
  signature-mark-104.png      — 52px @2x, for the email signature <img>
  wordmark.png / wordmark-dark.png — raster fallback of the wordmark

typewriter-hero.html   — drop-in hero/header wordmark with the typing animation
signature.html          — email-safe signature markup (table-based — read the comment at the top before touching it)
```

## 1. Favicon

Replace the site's current favicon with the set in `assets/`. Standard
head block:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
```

These were rasterized directly from `mark.svg`/`mark-small.svg` using
the real IBM Plex Mono font — not a fallback font — so what you're
getting is final, not a placeholder to regenerate.

## 2. Header / hero wordmark

Use `typewriter-hero.html` as-is for the hero. It's self-contained
(fonts, CSS, markup) — paste it in, don't rebuild the animation from
scratch. It respects `prefers-reduced-motion` (shows the full mark
statically, no animation) — don't strip that media query.

For the header/nav logo (every other page load, not just first
impression), use the **static** `wordmark.svg` — don't re-trigger the
typing animation on every page nav, it gets grating fast. Reserve the
animated version for the homepage hero only, and only on load, not on
scroll-into-view.

## 3. Email signature

Use `signature.html`. Two things this needs before it works:

- Host `signature-mark-104.png` at a permanent public URL (e.g.
  `https://jeffcheung.ai/assets/signature-mark-104.png`) and replace
  `SIGNATURE_MARK_URL` in the file with that URL.
- Leave the table/inline-style structure alone. It's deliberately not
  flexbox — Outlook desktop's rendering engine doesn't support it, and
  that failure is invisible from a Mac. If it needs to change, test in
  Outlook (desktop, not web) before shipping.

Don't animate this one. Outlook desktop shows only the first frame of
an animated GIF permanently — if this audience skews Outlook-heavy
(likely, for B2B/SMB clients), an animated signature looks frozen
mid-word for a meaningful chunk of recipients. Static only, here.

## 4. Social avatar

`social-avatar-512.png` isn't a site asset — it's for Jeff to upload
directly to LinkedIn/X/GitHub. No code change needed; flagging it here
just so it isn't mistaken for something that belongs in the repo.

## Assumptions made / open questions for Jeff

- Accent color locked to `#1F6E66` (muted teal) — this was one of four
  swatch options reviewed; confirm before treating it as final if it
  wasn't explicitly signed off.
- Homepage hero currently uses a different visual register (generic
  SaaS/ROI-forward copy) than this identity (technical/terminal). Not
  fixing that here — flagging that the two should probably get
  reconciled in a copy/design pass, not left to drift apart.
