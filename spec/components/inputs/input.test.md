# Input / TextField — Test Specification

> **Source spec:** `input.md`  
> **Component:** Input (text, password, email, number, tel, url, search types; leading/trailing adornments)

---

## E2E Tests

### Types
- [ ] `type="text"` renders standard text input
- [ ] `type="password"` masks input text, shows password toggle
- [ ] `type="email"` triggers email keyboard on mobile, validates on submit
- [ ] `type="number"` triggers numeric keyboard, allows number input
- [ ] `type="tel"` triggers telephone keyboard
- [ ] `type="url"` triggers URL keyboard
- [ ] `type="search"` shows search-specific styling, clear button

### Variants
- [ ] `variant="outline"` (default): bordered input
- [ ] `variant="filled"`: background fill, bottom border only
- [ ] `variant="ghost"`: no border, transparent background
- [ ] `variant="underline"`: bottom border only, no background

### Parts
- [ ] `Input.Label` renders above the field, linked to input
- [ ] `Input.Field` renders the actual `<input>` element
- [ ] `Input.Leading` renders content before the input (icon, select, currency symbol)
- [ ] `Input.Trailing` renders content after the input (clear button, password toggle, icon)
- [ ] `Input.Description` renders below the field
- [ ] `Input.Description variant="error"` renders red error text

### States
- [ ] **Rest:** gray border, white background
- [ ] **Hover (web):** slightly darker border
- [ ] **Focus:** blue ring fades in (150ms), border turns blue
- [ ] **Filled:** slightly darker background tint (if enabled)
- [ ] **Invalid:** red border, red focus ring, red description text
- [ ] **Disabled:** 50% opacity, gray background, `not-allowed` cursor
- [ ] **Read-only:** no border, transparent background, no focus ring

### Features
- [ ] `clearable={true}` shows clear button when value is non-empty
- [ ] Clear button click empties the input, fires `onValueChange("")`
- [ ] `showCharCount={true}` displays "N/M" below field
- [ ] `maxLength` limits input length
- [ ] Password toggle switches between text and password type
- [ ] Password toggle announces "Show password" / "Hide password"

### Motion
- [ ] Border color transition: 150ms ease-out
- [ ] Focus ring: opacity 0 → 1, 150ms ease-out
- [ ] `motion={false}` disables focus animation

---

## Integration Tests

### With forms
- [ ] Input inside a form submits correct value
- [ ] `required` input triggers form validation
- [ ] `invalid` input shows error message and prevents submission
- [ ] Multiple inputs in a form work independently
- [ ] Form reset clears input values

### With other components
- [ ] Input.Leading with Select (country code picker) works
- [ ] Input inside a Dialog for form workflows
- [ ] Input inside a Card for search/filter
- [ ] Input inside DataTable.Toolbar for search
- [ ] Input.Trailing with Button (e.g., "Submit" or eye icon) works

---

## Accessibility Tests

- [ ] Label is linked via `htmlFor`/`nativeID` to the input
- [ ] Error message is linked via `aria-describedby`
- [ ] Character count is announced to screen readers
- [ ] Clear button has `aria-label="Clear input"`
- [ ] Password toggle announces state ("Show password" / "Hide password")
- [ ] `aria-invalid="true"` when in error state
- [ ] `aria-required="true"` when required
- [ ] `aria-readonly="true"` when read-only
- [ ] Disabled input has `aria-disabled="true"`
- [ ] Placeholder text meets contrast requirements
- [ ] Focus ring is visible and meets contrast requirements
- [ ] Leading/trailing adornments are not focusable (decorative) unless interactive

---

## Visual Regression

- [ ] All variant × size × state combinations render correctly
- [ ] Focus ring is properly offset, not overlapping border
- [ ] Leading/trailing content is vertically centered
- [ ] Character count text is right-aligned below field
- [ ] Error message text is red, below field
- [ ] Password toggle icon transitions smoothly
- [ ] Clear button appears/disappears without layout shift
- [ ] Full-width input fills container
- [ ] Long placeholder text truncates or wraps correctly
