# MDS Analytics Dashboard Output
*Applied to: Use Case 03 — Analytics Dashboard (Partner and Developer personas).*

Read mds-cowork-core and mds-cowork-dataviz first — typography, colour, and chart rules apply throughout.

---

## What this output is

A single-page HTML dashboard. Self-contained in one file. Designed to be opened in a browser and shared in a weekly update or leadership meeting.

---

## Page layout — standard structure

```
┌─────────────────────────────────────────────────┐
│  Dashboard title + subtitle                      │
├──────────┬──────────┬──────────┬─────────────────┤
│  KPI card│  KPI card│  KPI card│  KPI card       │
├──────────┴──────────┴──────────┴─────────────────┤
│                                                   │
│   Chart 1 (bar)         Chart 2 (line)            │
│                                                   │
├───────────────────────────────────────────────────┤
│   Data table                                      │
└───────────────────────────────────────────────────┘
```

Most important numbers go at the top (KPI row). Detail follows below.

---

## Page header

- Dashboard title: McKinsey Sans, 2rem, weight 700, text-headings (#000000) — left-aligned
  - Do NOT use Bower for a dashboard title (Bower is for slide-level display titles only; 2rem dashboard titles must use McKinsey Sans)
- Subtitle or descriptor: McKinsey Sans, 1.2rem, weight 400, neutral-54 (#757575) — left-aligned
- Title and subtitle must share the same alignment (both left or both centred — not mixed)
- Page background: neutral-5 (#f2f2f2)

---

## KPI cards

Four cards across the top of the dashboard. Each card is an elevated white tile on the neutral-5 background.

```html
<div class="kpi-row">
  <div class="kpi-card">
    <div class="kpi-label">Total Revenue</div>
    <div class="kpi-value">$284M</div>
    <div class="kpi-delta kpi-delta--positive">▲ 12% vs last year</div>
  </div>
  ...
</div>
```

### KPI card typography
- Label: McKinsey Sans, 0.875rem, weight 400, neutral-54 (#757575)
- Value (big number): McKinsey Sans, 2rem–2.5rem, weight 700
- Delta / trend: McKinsey Sans, 0.875rem, weight 500

### KPI card colour rules
- Default value: deep-blue-900 (#051c2c)
- Positive / above target: feedback-success (#117E1A)
- Below target / at risk: feedback-danger (#CD3030)
- Neutral / informational: deep-blue-900 (#051c2c)

Below-target KPI cards must be visually differentiated from positive ones. Options (choose one and apply consistently):
- Apply a feedback-danger (#CD3030) top border (3–4px) to the card
- Apply the feedback-danger-light (#FEEBEB) background to the card
- Colour the value text in feedback-danger (#CD3030)

Do not use all three simultaneously — pick one approach and use it for all below-target cards.

```css
.kpi-card {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 1.5rem;
}

.kpi-card--below-target {
  border-top: 3px solid #CD3030;
}

.kpi-delta--positive { color: #117E1A; }
.kpi-delta--negative { color: #CD3030; }
.kpi-delta--neutral  { color: #757575; }
```

---

## Charts

Apply all rules from mds-cowork-dataviz. Dashboard-specific additions:

### Two charts side by side
- Charts should be equal or near-equal width
- Minimum chart height: 280px
- Each chart has its own title (McKinsey Sans, 1rem, weight 700) above the chart area
- Consistent visual style across both charts — same grid line style, same font sizes, same label style

### Chart container
```html
<div class="chart-row">
  <div class="chart-card">
    <div class="chart-title">Revenue by practice area</div>
    <div class="chart-area" id="chart-bar"><!-- render chart here --></div>
  </div>
  <div class="chart-card">
    <div class="chart-title">Monthly revenue trend</div>
    <div class="chart-area" id="chart-line"><!-- render chart here --></div>
  </div>
</div>
```

```css
.chart-card {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 1.5rem;
  flex: 1;
}
```

### Chart implementation
Use a JavaScript charting library (Chart.js is available). Configure it to match MDS:
- No border-radius on bars
- Solid flat colours — no gradient fills
- Grid lines: 1px, rgba(179, 179, 179, 0.5) — half the weight of data lines
- Font: "McKinsey Sans", Arial, sans-serif throughout
- Legend placement: below the chart if needed; never above

---

## Data table

The table sits at the bottom of the dashboard. It is a supporting detail view, not the primary communication.

### Table structure
```html
<div class="table-card">
  <div class="table-title">Utilisation by office</div>
  <table>
    <thead>
      <tr><th>Office</th><th>Utilisation</th><th>vs Target</th></tr>
    </thead>
    <tbody>
      <tr class="table-row--below-target">
        <td>Mumbai</td>
        <td>61%</td>
        <td class="status-negative">▼ 11pp below target</td>
      </tr>
      ...
    </tbody>
  </table>
</div>
```

### Table typography and spacing
```css
table {
  width: 100%;
  border-collapse: collapse;
  font-family: "McKinsey Sans", Arial, sans-serif;
  font-size: 0.875rem;
  color: #333333;
}

th {
  font-weight: 700;
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #e6e6e6;
  color: #000000;
}

td {
  text-align: left;
  vertical-align: middle;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f2f2f2;
}
```

**Critical table rule:** Never use `display: flex` or `display: grid` inside `<td>` or `<th>`. Use `margin-right` for spacing within table cells. Flex/grid breaks table layout and accessibility.

### Below-target rows
Rows where a value is below target must be visually distinguished:
- Background: feedback-danger-light (#FEEBEB) on the row, OR
- Status cell text colour: feedback-danger (#CD3030)
- Apply consistently — all below-target rows must look the same

---

## Section spacing

- KPI row bottom margin: 2rem
- Gap between KPI cards: 1.5rem
- Chart row bottom margin: 2rem
- Gap between charts: 1.5rem
- Table card bottom margin: 2rem
- Internal card padding: 1.5rem–2rem throughout (be consistent — not 1rem in one card and 2rem in another)

---

## Overall layout CSS

```css
.dashboard {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  background: #f2f2f2;
  font-family: "McKinsey Sans", Arial, sans-serif;
  color: #333333;
}

.kpi-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.table-card {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 1.5rem;
}
```

---

## What to avoid
- Using Bower for the dashboard title (Bower requires 2.75rem minimum and is for slide-level titles only)
- Mixing positive and negative colour conventions — pick one approach and apply it everywhere
- Inconsistent card padding across the dashboard
- `display: flex` or `display: grid` inside table cells
- Chart grid lines that are the same weight as data lines
- Legends placed above a chart
- Gradient fills on chart bars or lines
- Below-target values that are not visually distinct from on-target or above-target values
