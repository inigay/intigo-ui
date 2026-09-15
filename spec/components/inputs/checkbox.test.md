# Checkbox — Test Specification

> **Source spec:** `checkbox.md`  
> **Component:** Checkbox (checked, unchecked, indeterminate states; label; indicator)

---

## E2E Tests

### States
- [ ] **Unchecked:** empty box with border, no indicator
- [ ] **Checked:** filled box with check icon
- [ ] **Indeterminate:** filled box with dash icon (`checked="indeterminate"`)
- [ ] **Hover (web):** slightly darker border
- [ ] **Focus:** focus ring visible
- [ ] **Disabled:** 50% opacity, not interactive

### Controlled & uncontrolled
- [ ] `checked={true}` renders checked state
- [ ] `checked={false}` renders unchecked state
- [ ] `checked="indeterminate"` renders indeterminate state
- [ ] `defaultChecked={true}` renders initially checked (uncontrolled)
- [ ] `onCheckedChange` fires with new state on click

### Parts
- [ ] `Checkbox.Indicator` renders the check/dash icon
- [ ] `Checkbox.Label` renders text, is clickable
- [ ] Clicking label toggles checkbox

### Form integration
- [ ] `name` prop sets form field name
- [ ] `value` prop sets form value
- [ ] `required={true}` triggers form validation
- [ ] `invalid={true}` shows error state (red border)

### Motion
- [ ] Box fill: background color transition, 150ms ease-out
- [ ] Check icon: scale 0 → 1, spring snappy, 200ms
- [ ] Check icon draw: SVG stroke-dashoffset animation, 200ms
- [ ] Indeterminate dash: fade in, 150ms
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With forms
- [ ] Checkbox inside a form submits correct value when checked
- [ ] Checkbox inside a form submits no value when unchecked (unless value specified)
- [ ] Multiple checkboxes with same `name` submit as array
- [ ] Required checkbox shows validation error when form submitted unchecked

### With other components
- [ ] Checkbox inside a Card as a selection control works
- [ ] Checkbox inside a DataTable row (selectable) works
- [ ] Checkbox inside a Dropdown/Popover as a filter option works
- [ ] Checkbox as a Tag child for selectable filter chips

### Indeterminate parent-child
- [ ] Parent checkbox shows indeterminate when some (not all) children are checked
- [ ] Clicking indeterminate parent checks all children
- [ ] Clicking checked parent unchecks all children

---

## Accessibility Tests

- [ ] Renders `<input type="checkbox">` on web (native, accessible by default)
- [ ] `role="checkbox"`, `aria-checked` on native
- [ ] `aria-checked="mixed"` for indeterminate state
- [ ] Label is linked via `htmlFor`/`nativeID`
- [ ] Clicking label toggles checkbox
- [ ] Keyboard: Space to toggle
- [ ] Focus ring is visible
- [ ] Disabled checkbox has `aria-disabled="true"`
- [ ] Error state is announced via `aria-describedby` or `aria-invalid`
- [ ] Required state is announced

---

## Visual Regression

- [ ] All state combinations (checked/unchecked/indeterminate × enabled/disabled × valid/invalid)
- [ ] Check icon is centered inside the box
- [ ] Indeterminate dash is centered and proportional
- [ ] Box and label are vertically aligned
- [ ] Hover state transition is smooth
- [ ] Check animation is smooth and not janky
