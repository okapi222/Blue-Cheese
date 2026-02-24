# MDS Data Visualisation
*Applied to: Use Case 01 (Presentation) and Use Case 03 (Dashboard).*

Read mds-cowork-core first — colour and typography rules apply here too.

---

## Chart selection

| Data question | Chart type |
|---------------|------------|
| Compare magnitudes across categories | Horizontal or vertical bar chart |
| Show trend over time | Line chart |
| Show part-to-whole composition | Donut chart (max 5 segments) or stacked bar |
| Show correlation between two variables | Scatterplot |
| Show change step-by-step | Waterfall chart |
| Show magnitude across a geographic area | Map or heatmap |

When in doubt between bar and line: use bar for category comparison, line for time series.

---

## Colour rules for chart marks

### Solid colours only — no exceptions
Never use gradients, fades, opacity transitions, or colour blending inside chart marks (bars, lines, areas, pie/donut segments). Every chart mark must be a single, solid, flat colour.

### Single-category data (one series)
Use **Deep Blue 900** (#051c2c) as the default.
Use **Cyan 500** (#00a9f4) to highlight a specific bar or data point.

### Multi-category sequences — use in order, do not skip

**2 categories:**
1. Deep Blue 900 (#051c2c)
2. Cyan 500 (#00a9f4)

**3 categories:**
1. Deep Blue 900 (#051c2c)
2. Cyan 500 (#00a9f4)
3. Electric Blue 500 (#2251ff)

**4 categories:**
1. Deep Blue 900 (#051c2c)
2. Cyan 500 (#00a9f4)
3. Electric Blue 500 (#2251ff)
4. Marine Green 500 (#2ebba5)

**5 categories:**
1. Deep Blue 900 (#051c2c)
2. Cyan 500 (#00a9f4)
3. Electric Blue 500 (#2251ff)
4. Marine Green 500 (#2ebba5)
5. Amber Yellow 500 (#ffd24c)

**6–10 categories:** Continue adding from this extended palette in sequence:
6. Electric Blue 300 (#a2b8ff)
7. Cyan 300 (#80d4f9)
8. Marine Green 300 (#8ad9cd)
9. Deep Blue 500 (#377297)
10. Orchid Pink 500 (#e983cb)

**"Other" / remainder categories:** Always use neutral grey (#666666).

### Positive / negative colouring
- Above target, positive change: use feedback-success (#117E1A)
- Below target, negative change: use feedback-danger (#CD3030)
- Neutral / no direction: use Deep Blue 900 (#051c2c) or neutral grey

### Sequential scales (e.g. heatmaps, choropleth)
Use Electric Blue: #c5d3ff → #a2b8ff → #6285ff → #2251ff → #1b41cc → #143199 → #061033

### Diverging scales (e.g. positive vs negative)
Electric Blue ↔ Crimson Red, with sand neutral (#f5f0e8) as midpoint:
#2251ff ← #6285ff ← #c5d3ff ← #f5f0e8 → #ffadad → #ff6666 → #e60000

---

## Chart construction rules

### Bar charts
- Always start the value axis at zero — never truncate the baseline
- Use same colour for all bars unless highlighting a specific bar or comparing two series
- Bar gap should be equal to or narrower than bar width
- Label values directly on or above bars — do not rely on axis reading alone
- Horizontal bars: right-align value labels; vertical bars: centre-align above bar

### Line charts
- Line weight: 2px minimum; grid lines: 1px at 50% opacity of grid colour
- Label lines directly at end of line — do not use a separate legend if avoidable
- No area shading under lines unless the zero baseline is meaningful
- No dual Y-axes — split into separate charts instead
- Use grey (#cccccc) for background comparison lines; primary colour for the featured series

### Donut / pie charts
- Maximum 5 segments — group everything smaller into "Other" (grey #666666)
- Largest segment starts at 12 o'clock (0°) and proceeds clockwise
- Label segments with percentage and name inside or with a direct callout line
- Avoid if all segments are close in size — use a bar chart instead

### Waterfall charts
- Use feedback-success (#117E1A) for positive bars, feedback-danger (#CD3030) for negative
- Connecting lines should be light grey (#cccccc), not bold

---

## Labelling and annotation rules

### Priority order for labelling (use the highest available, not all at once)
1. Direct labels on the chart mark (bar value, line end label)
2. Legend — stack vertically, place to the right or below; never above the chart
3. Axis labels only — as a last resort for dense charts

### Axis labels
- Every axis must have a clear label describing what it shows and the unit
- Axis label font: McKinsey Sans, 12–14px, neutral-54 (#757575)
- Grid lines: half the visual weight of data lines; colour: neutral-20 (#cccccc)

### Chart titles
- Titles should describe the insight, not the data type
  - Good: "Digital revenue is outpacing all other practices"
  - Avoid: "Revenue by practice area"
- Use McKinsey Sans, 1rem–1.125rem, weight 500 or 700, text-default (#333333)
- Sentence case (not title case)

### Callout annotations
- Highlight a shaded area using neutral-30 (#b3b3b3) at 30% opacity
- Add a short text callout with the key insight in McKinsey Sans, 0.875rem
- Footnotes and sources: bottom of chart, McKinsey Sans 0.75rem, neutral-54 (#757575)

### Icons in charts
- Optional only — use as tally marks or category identifiers
- Never scale both width and height by data value; choose one dimension only
- Never replace a bar or line with an icon

---

## Common violations to avoid
- Gradient fills on bars, areas, or pie segments → use solid flat colour
- Using 3D chart styles → flat only
- Truncated bar chart baseline → always start at zero
- Legends placed above chart → place to the right or below
- More than 5 donut segments without grouping → group into "Other"
- Coloured Bower text in chart titles → use McKinsey Sans for chart titles; Bower only for slide-level display titles
