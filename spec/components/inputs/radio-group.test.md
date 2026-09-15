# Radio Group — Test Specification

> **Source spec:** `radio-group.md`  
> **Component:** RadioGroup (mutually exclusive selection; horizontal/vertical; indicator)

---

## E2E Tests

### Core behavior
- [ ] Only one radio item can be selected at a time
- [ ] Selecting a different item deselects the previous one
- [ ] Clicking the selected item does not deselect it (radio behavior)
- [ ] `value` + `onValueChange` (controlled) work correctly
- [ ] `defaultValue` (uncontrolled) sets initial selection

### Parts
- [ ] `RadioGroup.Label` renders group legend
- [ ] `RadioGroup.Item` renders individual radio option
- [ ] `RadioGroup.Indicator` renders filled circle when selected
- [ ] `RadioGroup.ItemLabel` renders option text
- [ ] `RadioGroup.Description` renders error or help text

### Layout
- [ ] `orientation="vertical"` stacks items vertically
- [ ] `orientation="horizontal"` arranges items in a row
- [ ] Items have consistent spacing in both orientations

### States
- [ ] **Unselected:** empty circle with border
- [ ] **Selected:** filled circle with inner dot
- [ ] **Hover (web):** subtle background highlight on item
- [ ] **Focus:** focus ring on the selected or navigated item
- [ ] **Disabled (group):** all items are 50% opacity, not interactive
- [ ] **Disabled (individual item):** specific item disabled, others interactive
- [ ] **Invalid:** red border/indicator, error description shown

### Motion
- [ ] Indicator scale: 0 → 1, spring snappy, 200ms
- [ ] Indicator color: fill transition, 150ms ease-out
- [ ] Hover ring: subtle background highlight on item
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With forms
- [ ] RadioGroup inside a form submits selected value
- [ ] `required` RadioGroup triggers form validation when no selection
- [ ] `name` prop sets form field name
- [ ] Form reset clears radio selection to default

### With other components
- [ ] RadioGroup inside a Card for settings panels
- [ ] RadioGroup inside a Dialog for preference selection
- [ ] RadioGroup items with Badge or Tag for enhanced labels
- [ ] RadioGroup inside a Popover for quick settings

---

## Accessibility Tests

- [ ] Root: `role="radiogroup"`, `aria-labelledby` → label ID
- [ ] Root: `aria-orientation` matches orientation prop
- [ ] Item: `role="radio"`, `aria-checked="true"/"false"`
- [ ] Item label is linked to radio via `htmlFor`/`nativeID`
- [ ] Keyboard: Arrow keys navigate between items (Up/Down for vertical, Left/Right for horizontal)
- [ ] Keyboard: Tab enters the group (focuses selected item), Tab exits the group
- [ ] Keyboard: Space selects the focused item
- [ ] Disabled items are skipped in keyboard navigation
- [ ] Error state is announced via `aria-describedby` or `aria-invalid`
- [ ] Required state is announced

---

## Visual Regression

- [ ] All orientation × state combinations render correctly
- [ ] Selected indicator (dot) is centered inside the circle
- [ ] Circle and label are vertically aligned
- [ ] Horizontal layout: items have equal spacing, wrap if needed
- [ ] Vertical layout: items are left-aligned
- [ ] Disabled items are visually distinct (grayed out)
- [ ] Invalid state: red border/indicator is visible
- [ ] Focus ring is visible and offset from the item
