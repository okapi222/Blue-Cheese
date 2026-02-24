# MDS Presentation Output
*Applied to: Use Case 01 — Presentation (Partner persona).*

Read mds-cowork-core and mds-cowork-dataviz first — all typography, colour, and chart rules apply.

---

## What this output is

A multi-slide HTML presentation. Each slide is a full-viewport section. The output is a single self-contained HTML file the user can open in a browser and share or screenshot.

---

## Slide structure

Generate the presentation as a single HTML file with:
- One `<section class="slide">` per slide
- Navigation arrows or keyboard support to move between slides
- Each slide fills the full viewport (100vw × 100vh or similar)

```html
<div class="presentation">
  <section class="slide slide--title">...</section>
  <section class="slide slide--content">...</section>
  ...
</div>
```

---

## Slide typography

### Title slides (opening / summary slides)
- Slide title: Bower, 3rem–4rem, weight 700, black (#000000) — the ONLY element that uses Bower
- Subtitle or descriptor: McKinsey Sans, 1.2rem, weight 400, neutral-54 (#757575)
- Do not colour Bower text — always black regardless of slide background
- If Bower size drops below 2.75rem due to screen constraints, switch to McKinsey Sans weight 700

### Content slides
- Slide title: McKinsey Sans, 1.5rem–2rem, weight 700, text-headings (#000000)
- Section subheading: McKinsey Sans, 1.2rem, weight 500, text-subtle (#757575)
- Body / bullet text: McKinsey Sans, 1rem, weight 400, text-default (#333333)
- Data callout / big number: McKinsey Sans, 2rem–3rem, weight 700, deep-blue-900 (#051c2c)
- Caption / footnote: McKinsey Sans, 0.875rem, weight 400, neutral-54 (#757575)

### Multi-line hero title (optional on opening slide)
- Line 1: Bower, 3rem+, black
- Line 2: McKinsey Sans, 1.5rem, neutral-54 — a subtitle or framing phrase beneath the main title

---

## Slide layout

### General principles
- Maintain clear visual hierarchy: title > key message > supporting data
- Use consistent internal padding: 3rem–4rem on all sides
- Leave breathing room — do not fill every pixel of a slide
- Align text left (not centred) unless this is a title-only cover slide

### Common slide patterns

**Cover / title slide**
- Large Bower title (centred or left-aligned)
- McKinsey Sans subtitle beneath
- Client name / date / programme name in smaller body text
- Minimal decoration — no charts or data

**Summary / one-pager slide**
- 2–4 key metrics displayed as large numbers with McKinsey Sans
- Short headline statement (McKinsey Sans, 1.5rem, weight 700)
- 3–5 bullet points supporting the headline
- Optional: traffic-light status indicator (green / amber / red) aligned to each bullet

**Data slide (chart-led)**
- Slide title at top: McKinsey Sans, 1.5rem, weight 700
- Chart fills majority of slide (60–70% of height)
- Insight callout: 1–2 sentence observation, McKinsey Sans, weight 500, placed near chart
- Source / footnote at bottom: 0.875rem, neutral-54

**Decision / recommendation slide**
- Clear "decision required" framing in the title
- Two or three options presented as cards or columns
- Each option: label, short description, key trade-off
- Recommended option: highlight with electric-blue-500 (#2251ff) border or background tint (#E5F0FF)

---

## Status indicators

When showing milestone, project, or KPI status:
- On track / complete: green (#117E1A) dot or badge
- At risk / delayed: amber (#FFD048) dot or badge
- Off track / failed: red (#CD3030) dot or badge
- Not started / neutral: neutral-30 (#b3b3b3) dot or badge

Use consistently — do not mix icon styles, shapes, or colours for the same status concept.

---

## Numbers and data callouts

Large prominent numbers (KPIs, headline metrics):
- Font: McKinsey Sans, 2rem–3rem, weight 700
- Colour: deep-blue-900 (#051c2c) for neutral; feedback-success (#117E1A) for positive; feedback-danger (#CD3030) for negative
- Always show the unit (%, $M, x) adjacent to the number in smaller text

Deltas and change indicators:
- Positive delta: ▲ or +, feedback-success (#117E1A)
- Negative delta: ▼ or −, feedback-danger (#CD3030)
- Neutral: no arrow, neutral-54 (#757575)

---

## What to avoid
- Using Bower for anything other than the top-level slide title
- Colouring Bower text in anything other than black
- Cluttered slides with too many elements — one key message per slide
- Mixing chart styles across slides — maintain visual consistency throughout
- Using fonts, colours, or icons not in the MDS palette
- 3D charts, drop shadows on chart elements, gradient fills
