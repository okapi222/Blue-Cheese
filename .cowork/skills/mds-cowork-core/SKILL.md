# MDS Core — Typography and Colour
*Applied to all Cowork outputs: presentations, forms, dashboards.*

---

## Typography

### Two fonts only — never any other
- **Bower** (serif display font) — for large titles and headlines only
- **McKinsey Sans** (sans-serif body font) — for everything else

Embed both using system fallbacks when font files are not available:
```css
--mds-font-display: "Bower", Georgia, serif;
--mds-font-body: "McKinsey Sans", Arial, sans-serif;
```

### Bower rules — strict
Use Bower ONLY when ALL three conditions are met:
1. The element is a top-level title or display heading
2. The rendered size is 2.75rem (44px) or larger
3. The colour is black (#000000) — Bower is NEVER coloured

Bower weights: 500 (medium) or 700 (bold) only.

Bower is PROHIBITED for:
- Data values, numbers, quantities
- Dashboard widget titles or section headings
- Table content, labels, navigation items
- Any text smaller than 2.75rem
- Body copy or descriptive text

### McKinsey Sans rules
Use for all body text, labels, data values, table content, subtitles, captions, and any heading smaller than 2.75rem.

Weights available: 300 (light), 400 (regular), 500 (medium), 700 (bold).

### Size hierarchy — enforce a clear visual hierarchy
| Role | Size | Weight |
|------|------|--------|
| Slide / page title (Bower) | 2.75rem–4rem | 500 or 700 |
| Section heading (McKinsey Sans) | 1.5rem–2rem | 500 or 700 |
| Subtitle / descriptor | 1.2rem | 400 or 500 |
| Body text | 1rem (16px) | 400 |
| Labels, captions, table text | 0.875rem (14px) | 400 |

---

## Colour

### Core brand palette — use CSS custom properties with hex fallbacks
```css
--mds-color-deep-blue-900: #051c2c;        /* Primary dark brand */
--mds-color-electric-blue-500: #2251ff;    /* Primary interactive / brand accent */
--mds-color-cyan-500: #00a9f4;             /* Highlight / emphasis */

--mds-color-white: #ffffff;
--mds-color-neutral-5: #f2f2f2;            /* Subtle background */
--mds-color-neutral-10: #e6e6e6;           /* Borders */
--mds-color-neutral-54: #757575;           /* Subtle text */
--mds-color-neutral-80: #333333;           /* Default body text */
--mds-color-black: #000000;               /* Headings, Bower text */
```

### Feedback colours — use correctly and consistently
| State | Colour | Hex |
|-------|--------|-----|
| Success / positive | Green | #117E1A |
| Warning / caution | Amber | #FFD048 |
| Danger / negative / error | Red | #CD3030 |
| Informational / neutral | Electric Blue | #2251FF |

Light background variants for feedback containers:
- Success light: #E6FEE8
- Warning light: #FFF9D6
- Danger light: #FEEBEB
- Info light: #E5F0FF

### Colour rules
- Never use gradients, fades, or colour transitions on chart marks or UI backgrounds
- Use colour consistently — the same colour always means the same thing
- Do not use colour decoratively — every colour choice must carry meaning
- Below-target or negative values use red (#CD3030); above-target or positive use green (#117E1A)
- Bower text is ALWAYS black (#000000) — never apply brand colour to Bower headings

### Background
- Page / slide background: white (#ffffff) or neutral-5 (#f2f2f2)
- Card / widget background: white (#ffffff) when page background is neutral-5
- Inverse / dark sections: deep-blue-900 (#051c2c) with white text

---

## What to embed in every output

Every HTML output must embed these CSS custom properties in a `:root {}` block. This makes all MDS token references work without external stylesheets:

```css
:root {
  /* Fonts */
  --mds-font-display: "Bower", Georgia, serif;
  --mds-font-body: "McKinsey Sans", Arial, sans-serif;

  /* Core colours */
  --mds-color-deep-blue-900: #051c2c;
  --mds-color-electric-blue-500: #2251ff;
  --mds-color-cyan-500: #00a9f4;
  --mds-color-white: #ffffff;
  --mds-color-neutral-2: #f6f7f9;
  --mds-color-neutral-5: #f2f2f2;
  --mds-color-neutral-10: #e6e6e6;
  --mds-color-neutral-20: #cccccc;
  --mds-color-neutral-30: #b3b3b3;
  --mds-color-neutral-54: #757575;
  --mds-color-neutral-60: #666666;
  --mds-color-neutral-80: #333333;
  --mds-color-black: #000000;

  /* Text */
  --mds-color-text-headings: #000000;
  --mds-color-text-default: #333333;
  --mds-color-text-subtle: #757575;

  /* Borders */
  --mds-color-border-default: #e6e6e6;

  /* Backgrounds */
  --mds-color-background-default: #ffffff;
  --mds-color-background-subtle: #f2f2f2;
  --mds-color-background-inverse: #051c2c;

  /* Feedback */
  --mds-color-feedback-success: #117E1A;
  --mds-color-feedback-warning: #FFD048;
  --mds-color-feedback-danger: #CD3030;
  --mds-color-informational: #2251ff;
  --mds-color-feedback-success-light: #E6FEE8;
  --mds-color-feedback-warning-light: #FFF9D6;
  --mds-color-feedback-danger-light: #FEEBEB;
  --mds-color-informational-light: #E5F0FF;
}
```
