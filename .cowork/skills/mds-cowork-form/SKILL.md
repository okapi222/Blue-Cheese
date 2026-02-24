# MDS Form Output
*Applied to: Use Case 02 — Complex Form (Developer persona).*

Read mds-cowork-core first — typography and colour rules apply to all form elements.

---

## What this output is

A multi-step HTML form, self-contained in a single file. The user fills in one step at a time, with a summary review before submitting. Designed for internal McKinsey tools.

---

## Page and form structure

```html
<div class="form-shell">
  <div class="form-progress">...</div>   <!-- Step indicator -->
  <div class="form-body">
    <div class="form-step" id="step-1">...</div>
    <div class="form-step" id="step-2" hidden>...</div>
    ...
  </div>
  <div class="form-actions">
    <button class="btn-secondary">Back</button>
    <button class="btn-primary">Next</button>
  </div>
</div>
```

- Display one step at a time — use `hidden` attribute to hide inactive steps
- Step count must be visible at all times (e.g. "Step 2 of 4")
- Back and Next buttons persist across all steps

---

## Step progress indicator

Always show a step indicator at the top of the form. Requirements:
- Show total number of steps
- Clearly highlight the current step
- Completed steps should look visually distinct from upcoming steps

```html
<div class="form-progress">
  <div class="step step--complete">1</div>
  <div class="step step--active">2</div>
  <div class="step step--upcoming">3</div>
  <div class="step step--upcoming">4</div>
</div>
```

Colours:
- Active step: electric-blue-500 (#2251ff) background, white (#ffffff) text
- Completed step: feedback-success (#117E1A) background, white (#ffffff) text
- Upcoming step: neutral-10 (#e6e6e6) background, neutral-54 (#757575) text
- Connector line between steps: neutral-20 (#cccccc)

---

## Field labels

Every field must have a visible label. The label must:
- Appear above the field (never beside or inside)
- Use McKinsey Sans, 0.875rem, weight 500, text-default (#333333)
- Use `<label for="fieldId">` linked to the input via matching `id`

Required field indicator: append a red asterisk to the label text — `*` in feedback-danger (#CD3030). Never rely on placeholder text alone to describe a field.

```html
<label for="client-name">Client name <span class="required">*</span></label>
<input type="text" id="client-name" name="client-name" required>
```

---

## Field types and their correct usage

| Data type | Use |
|-----------|-----|
| Short free text (names, codes, amounts) | `<input type="text">` |
| Numeric values | `<input type="number">` |
| Email address | `<input type="email">` |
| Date | `<input type="date">` — never a plain text field |
| Long free text (notes, requirements) | `<textarea>` |
| Choice from a fixed list | `<select>` dropdown |
| Binary yes/no decision | Toggle switch or radio pair |
| Multi-select from list | Checkbox group |
| Currency amount | `<input type="number">` with currency prefix |

### Field sizing
- Full-width fields: use for text inputs, textareas, selects
- Half-width fields: use for date pairs (start/end), numeric pairs, or related short fields
- Do not mix widths arbitrarily — maintain a consistent grid

---

## Field styling — default state

```css
.form-field input,
.form-field select,
.form-field textarea {
  font-family: "McKinsey Sans", Arial, sans-serif;
  font-size: 1rem;
  color: #333333;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 0.625rem 0.875rem;
  width: 100%;
  background: #ffffff;
  transition: border-color 0.15s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #2251ff;
  box-shadow: 0 0 0 2px rgba(34, 81, 255, 0.15);
}
```

---

## Validation and error states

### When validation fires
- Validate on blur (when user leaves the field) and on Next / Submit
- Do not validate on every keystroke unless validating format (email, budget code)

### Error state — must be visually distinct from default
```css
.form-field--error input,
.form-field--error select,
.form-field--error textarea {
  border-color: #CD3030;
  background-color: #FEEBEB;
}
```

Add an error message below the field:
```html
<div class="field-error">
  <span class="error-icon">!</span>
  <span class="error-text">This field is required</span>
</div>
```
- Error text: McKinsey Sans, 0.875rem, feedback-danger (#CD3030)
- The error message must describe what is wrong — not just "required"

### Validation rules to enforce
| Field | Rule |
|-------|------|
| Required fields | Cannot be empty on Next/Submit |
| Email fields | Must match format (contains @ and .) |
| Date fields | Cannot be in the past |
| Budget codes | Capital letters and numbers only (`/^[A-Z0-9]+$/`) |
| Number fields | Must be within the specified range |

---

## Toggle switch (binary yes/no)

Use a visual toggle switch for true/false binary choices, not a checkbox:
```html
<label class="toggle">
  <input type="checkbox" role="switch">
  <span class="toggle-track"></span>
  <span class="toggle-label">New client</span>
</label>
```
- Off state: neutral-20 (#cccccc) track
- On state: electric-blue-500 (#2251ff) track
- Thumb: white (#ffffff) circle

---

## Conditional fields

When a field appears only if a prior answer is "Yes" (e.g. location preference):
- Show/hide using JavaScript on toggle change
- The conditional field must appear directly below the parent question
- Animate with a short fade-in — do not make it appear abruptly

---

## Summary step (final step before submit)

The last step before submission must show a read-only summary of all entered values:
- Group fields by their step (Step 1 — Project basics, etc.)
- Each field: label in neutral-54 (#757575), value in text-default (#333333), weight 500
- Provide an "Edit" link next to each section that returns to that step
- Do not allow editing directly on the summary page

```html
<div class="summary-section">
  <div class="summary-header">
    <h3>Step 1 — Project basics</h3>
    <a href="#" onclick="goToStep(1)">Edit</a>
  </div>
  <dl>
    <dt>Client name</dt><dd>GlobalMart</dd>
    <dt>Industry</dt><dd>Retail</dd>
    ...
  </dl>
</div>
```

Submit button:
- Label: "Confirm and submit"
- Style: primary button — electric-blue-500 (#2251ff) background, white text, McKinsey Sans, 1rem, weight 500
- Add a note below the button: "The staffing team will respond within 2 business days" — McKinsey Sans, 0.875rem, neutral-54

---

## Button styling

```css
.btn-primary {
  font-family: "McKinsey Sans", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  background: #2251ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.625rem 1.5rem;
  cursor: pointer;
}

.btn-secondary {
  font-family: "McKinsey Sans", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  background: transparent;
  color: #2251ff;
  border: 1px solid #2251ff;
  border-radius: 4px;
  padding: 0.625rem 1.5rem;
  cursor: pointer;
}
```

---

## Layout

- Maximum form width: 680px, centred on the page
- Page background: neutral-5 (#f2f2f2)
- Form card background: white (#ffffff), with light border (neutral-10 #e6e6e6) or subtle shadow
- Internal padding: 2rem–3rem
- Field spacing: 1.5rem gap between fields, 2rem between field groups
- Section label (grouping fields within a step): McKinsey Sans, 1rem, weight 700, text-headings (#000000)

---

## What to avoid
- Placeholder text used as the only label — always use a visible `<label>`
- Required fields with no visual marker
- Error messages that only say "required" — describe what to fix
- Past dates allowed in date fields
- Free text where a dropdown or toggle would be clearer
- Steps with no progress indicator
