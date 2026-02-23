---
name: mds-presentation-typography
description: Typography standards for presentation/slide pages - Bower titles at 2.75rem, McKinsey Sans subtitles at 1.2rem, color restrictions
---

# MDS Presentation Typography Standards

This skill defines typography hierarchy for full-screen presentation pages, slides, and marketing layouts.

## When to Use This Skill

Apply these standards when working with:
- Full-screen slide/presentation pages
- PowerPoint-style web decks
- Marketing hero sections
- Scroll-based presentation layouts
- Any full-screen content with title + subtitle structure

## Core Typography Standards

### Slide Titles (Bower)

**Requirements:**
- Font: `var(--mds-font-display)` (Bower)
- Size: `2.75rem` (44px)
- Weight: `700` (bold) or `500` (medium)
- Color: **Always black** - `var(--text)` or `var(--mds-color-text-default)`

**CRITICAL: Bower is NEVER colored**
- No brand colors on Bower text
- No muted/subtle colors on Bower text
- Always use default text color (black)

```css
/* ✅ GOOD - Slide title with Bower */
.slide-title {
  font-family: var(--mds-font-display);
  font-size: 2.75rem;
  font-weight: var(--mds-font-weight-bold, 700);
  color: var(--text); /* Always black */
}
```

```css
/* ❌ BAD - Colored Bower or wrong font */
.slide-title {
  font-family: var(--mds-font-display);
  font-size: 2.75rem;
  color: var(--brand); /* NEVER color Bower */
}

/* ❌ BAD - Using McKinsey Sans for main title */
.slide-title {
  font-family: var(--mds-font-body);
  font-size: 2.75rem;
}
```

### Subtitles (McKinsey Sans)

**Requirements:**
- Font: `var(--mds-font-body)` (McKinsey Sans)
- Size: `1.2rem` (19.2px)
- Weight: `500` (medium) or `400` (regular)
- Color: `var(--text-muted)` or `var(--mds-color-text-subtle)`

```css
/* ✅ GOOD - Subtitle with McKinsey Sans */
.slide-subtitle {
  font-family: var(--mds-font-body);
  font-size: 1.2rem;
  font-weight: var(--mds-font-weight-medium, 500);
  color: var(--text-muted);
}
```

```css
/* ❌ BAD - Using Bower for subtitle */
.slide-subtitle {
  font-family: var(--mds-font-display); /* NEVER use Bower for subtitles */
  font-size: 1.2rem;
}
```

## Common Patterns

### Pattern 1: Standard Slide Layout

Each slide has a title (Bower) and subtitle (McKinsey Sans):

```html
<section class="slide">
  <div class="slide__content">
    <h2 class="slide-title">Three Column Layout</h2>
    <p class="slide-subtitle">Lorem ipsum content blocks in a classic slide format.</p>
    <!-- slide content -->
  </div>
</section>
```

```css
.slide-title {
  margin: 0;
  font-family: var(--mds-font-display);
  font-size: 2.75rem;
  font-weight: var(--mds-font-weight-bold, 700);
  color: var(--text);
}

.slide-subtitle {
  margin: 0.8rem 0 0;
  font-family: var(--mds-font-body);
  font-size: 1.2rem;
  font-weight: var(--mds-font-weight-medium, 500);
  color: var(--text-muted);
}
```

### Pattern 2: Hero/Title Slide with Multi-Line Title

When the main title spans two lines with different styling:
- **First line**: Bower at 2.75rem (bold, black)
- **Second line**: McKinsey Sans at 1.2rem (medium, muted) - this is the SUBTITLE

```html
<section class="slide">
  <div class="slide__content">
    <h1 class="hero-title">
      <span>Lorem Ipsum</span>
      <span>PowerPoint Style Deck</span>
    </h1>
    <p class="hero-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</section>
```

```css
.hero-title {
  margin: 0;
  display: grid;
  gap: 0.2rem;
}

/* First line: Bower title */
.hero-title span:first-child {
  font-family: var(--mds-font-display);
  font-size: 2.75rem;
  font-weight: var(--mds-font-weight-bold, 700);
  color: var(--text); /* Always black */
}

/* Second line: McKinsey Sans subtitle */
.hero-title span:last-child {
  font-family: var(--mds-font-body);
  font-size: 1.2rem;
  font-weight: var(--mds-font-weight-medium, 500);
  color: var(--text-muted);
}
```

**CRITICAL: Second line uses McKinsey Sans, NOT Bower**
- Even though it's inside the title element, the secondary text is a subtitle
- Apply McKinsey Sans sizing and color rules

### Pattern 3: Additional Subtitle/Body Text

Below the main subtitle, use McKinsey Sans body sizing:

```css
.hero-body {
  margin: 1rem auto 0;
  font-family: var(--mds-font-body);
  font-size: var(--mds-font-size-body-1, 1rem);
  color: var(--text-muted);
  line-height: 1.6;
}
```

## Typography Hierarchy Summary

```
┌─────────────────────────────────────────┐
│ Main Title (Bower)                      │
│ 2.75rem, weight 700, black              │
├─────────────────────────────────────────┤
│ Subtitle (McKinsey Sans)                │
│ 1.2rem, weight 500, muted               │
├─────────────────────────────────────────┤
│ Body Text (McKinsey Sans)               │
│ 1rem, weight 400, muted                 │
└─────────────────────────────────────────┘
```

## Color Restrictions

### Bower (--mds-font-display)
- ✅ Black: `var(--text)` or `var(--mds-color-text-default)`
- ❌ NEVER: Brand colors, muted colors, any color variation

### McKinsey Sans (--mds-font-body)
- ✅ Muted: `var(--text-muted)` or `var(--mds-color-text-subtle)`
- ✅ Default: `var(--text)` for emphasis
- ✅ Brand: Only for interactive elements (links, buttons)

## Anti-Patterns to Avoid

### ❌ Using Bower for Subtitles
```css
/* WRONG */
.slide-subtitle {
  font-family: var(--mds-font-display);
  font-size: 1.2rem;
}
```

### ❌ Coloring Bower Text
```css
/* WRONG */
.slide-title {
  font-family: var(--mds-font-display);
  color: var(--brand); /* NEVER color Bower */
}

.hero-title span:last-child {
  font-family: var(--mds-font-display);
  color: var(--brand); /* This should be McKinsey Sans anyway */
}
```

### ❌ Using McKinsey Sans for Main Titles
```css
/* WRONG */
.slide-title {
  font-family: var(--mds-font-body);
  font-size: 2.75rem; /* Should use Bower at this size */
}
```

### ❌ Responsive Sizing Below 2.75rem for Bower
```css
/* WRONG */
.slide-title {
  font-family: var(--mds-font-display);
  font-size: clamp(1.7rem, 4vw, 2.75rem); /* Min size too small for Bower */
}
```

If you need responsive sizing, switch to McKinsey Sans for smaller screens:

```css
/* ✅ GOOD - Switch fonts based on size threshold */
.slide-title {
  font-family: var(--mds-font-display);
  font-size: 2.75rem;
}

@media (max-width: 768px) {
  .slide-title {
    font-family: var(--mds-font-body); /* Switch to McKinsey Sans */
    font-size: 2rem; /* Below Bower minimum */
  }
}
```

## Implementation Checklist

When implementing presentation page typography:

- [ ] Main slide titles use Bower at 2.75rem
- [ ] Bower titles are always black (never colored)
- [ ] Subtitles use McKinsey Sans at 1.2rem
- [ ] Multi-line hero titles follow first-line-Bower/second-line-McKinsey-Sans pattern
- [ ] Font weights are 700 or 500 only (never 300 or 400 for Bower)
- [ ] Color tokens are used (not hard-coded values)
- [ ] Responsive behavior switches to McKinsey Sans if size drops below 2.75rem

## Related Guidance

- **Bower restrictions**: See `.cursor/rules/mds-bower-typography.mdc` for comprehensive Bower usage rules
- **Banner/dashboard sizing**: See `.cursor/skills/mds-layout-patterns/SKILL.md` for dashboard title sizing (different context)
- **Typography tokens**: See `src/styles/mds/typography.css` for all available type tokens
