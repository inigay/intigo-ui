# Accordion — Test Specification

> **Source spec:** `accordion.md`  
> **Component:** Accordion (collapsible sections; single/multiple; animated height)

---

## E2E Tests

### Core behavior
- [ ] Clicking a trigger expands its panel
- [ ] Clicking an expanded trigger collapses its panel
- [ ] `type="single"`: only one panel can be open at a time
- [ ] `type="single"` with `collapsible={true}`: the open panel can be collapsed
- [ ] `type="single"` with `collapsible={false}`: one panel is always open
- [ ] `type="multiple"`: multiple panels can be open simultaneously

### Parts
- [ ] `Accordion.Item` wraps each section
- [ ] `Accordion.Trigger` renders clickable header
- [ ] `Accordion.Indicator` renders chevron icon, rotates on expand
- [ ] `Accordion.Panel` renders expandable content
- [ ] `Accordion.Item value` uniquely identifies each section

### Controlled & uncontrolled
- [ ] `value` + `onValueChange` (controlled) work correctly
- [ ] `defaultValue` (uncontrolled) sets initial open item(s)
- [ ] Single mode: `value` is a string
- [ ] Multiple mode: `value` is a string array

### Disabled
- [ ] `Accordion.Item disabled={true}` prevents expand/collapse
- [ ] Disabled trigger has reduced opacity
- [ ] Disabled trigger is not clickable

### Motion
- [ ] Panel height: 0 → auto (measured), spring gentle (stiffness=100, damping=20), 300ms
- [ ] Chevron: rotate 0 → 180°, spring snappy, 200ms
- [ ] Panel content: fade in + translateY -4px → 0, 200ms ease-out, delayed 50ms
- [ ] Collapse animation mirrors expand (height auto → 0)
- [ ] `motion={false}` disables animations (instant open/close)

---

## Integration Tests

### With other components
- [ ] Accordion panel content contains interactive elements (Button, Input, Link)
- [ ] Accordion inside a Card renders correctly
- [ ] Accordion inside a Dialog for FAQ sections
- [ ] Accordion inside a Drawer for navigation menus
- [ ] Nested Accordions (accordion inside accordion panel) — not recommended but shouldn't crash

### Dynamic content
- [ ] Panel content that changes height dynamically (e.g., async data load) — panel resizes smoothly
- [ ] Adding/removing Accordion.Items dynamically updates correctly
- [ ] Long panel content scrolls within the panel

---

## Accessibility Tests

- [ ] Trigger: `role="button"`, `aria-expanded="true"/"false"`
- [ ] Trigger: `aria-controls` points to panel ID
- [ ] Panel: `role="region"`, `aria-labelledby` points to trigger ID
- [ ] Keyboard: Enter/Space toggles the focused trigger
- [ ] Keyboard: Tab moves to next trigger (skips collapsed panel content)
- [ ] When panel is expanded, Tab moves into panel content
- [ ] Disabled trigger has `aria-disabled="true"`
- [ ] Screen reader announces expanded/collapsed state
- [ ] Panel content is hidden from accessibility tree when collapsed

---

## Visual Regression

- [ ] Expand/collapse animation: height transition is smooth, no jank
- [ ] Chevron rotation animation is smooth
- [ ] Panel content fade-in is smooth
- [ ] Triggers have consistent height across items
- [ ] Panel padding is consistent
- [ ] Borders/dividers between items render correctly
- [ ] Multiple mode: expanding one item doesn't cause layout shift in others
- [ ] Single mode: expanding a new item collapses the previous one smoothly
