# Tag / Chip — Test Specification

> **Source spec:** `tag.md`  
> **Component:** Tag (filled, outlined, soft variants; dismissible; selectable)

---

## E2E Tests

### Variants & colors
- [ ] `variant="filled"` renders with solid background
- [ ] `variant="outlined"` renders with border, transparent background
- [ ] `variant="soft"` renders with subtle background tint
- [ ] All color presets render correctly: `primary`, `success`, `destructive`, `warning`, `neutral`
- [ ] All size presets render at correct dimensions: `sm`, `md`, `lg`

### Parts
- [ ] `Tag.Icon` renders a leading icon
- [ ] `Tag.Label` renders text content
- [ ] `Tag.Close` renders a dismiss (X) button when `dismissible={true}`
- [ ] Tag without optional parts renders correctly with just Label

### Dismissible behavior
- [ ] Close button is visible when `dismissible={true}`
- [ ] Clicking close button calls `onDismiss`
- [ ] Dismiss animation: scale 1 → 0 + fade out (150ms)
- [ ] After dismiss, sibling tags slide to fill the gap
- [ ] Backspace/Delete key triggers dismiss when tag is focused

### Selectable behavior
- [ ] `selectable={true}` makes tag toggleable
- [ ] `selected` prop controls selected state
- [ ] `onSelectedChange` fires on click with new state
- [ ] Selected state shows visual change (background/border transition, 200ms)
- [ ] Check icon fades in when selected
- [ ] Enter/Space toggles selection when focused

### Disabled state
- [ ] `disabled={true}` prevents interaction
- [ ] Disabled tag has reduced opacity (50%)
- [ ] Dismiss and selection are blocked when disabled

### Motion
- [ ] Enter (in a group): scale 0 → 1 + fade, stagger 50ms, spring snappy
- [ ] Dismiss: scale 1 → 0 + fade out, 150ms ease-in
- [ ] Select: background + border transition, 200ms ease-out
- [ ] `motion={false}` disables animations

---

## Integration Tests

### Tag groups
- [ ] Multiple dismissible tags: dismissing one shifts remaining tags smoothly
- [ ] Multiple selectable tags: selecting one doesn't affect others
- [ ] Tags inside a filter bar layout render inline with wrapping
- [ ] Tags inside Input.Trailing or Select.Trigger (multi-select) render correctly

### With other components
- [ ] Tag with Avatar as Icon renders correctly
- [ ] Tag inside Card header/footer renders inline
- [ ] Tag inside DataTable cell renders correctly

---

## Accessibility Tests

- [ ] Dismiss button has `aria-label="Remove {label}"`
- [ ] Selectable tag has `role="checkbox"` or `role="button"` with `aria-pressed`
- [ ] Tag label text is readable by screen readers
- [ ] Color contrast: text against tag background meets WCAG AA (4.5:1)
- [ ] Keyboard: Enter/Space to select, Backspace/Delete to dismiss
- [ ] Focus indicator is visible on selectable and dismissible tags
- [ ] Non-interactive tags do not receive focus

---

## Visual Regression

- [ ] All variant × color × size combinations render correctly
- [ ] Dismiss animation is smooth, no layout jank
- [ ] Select transition is smooth
- [ ] Icon and label are vertically aligned
- [ ] Close button is properly sized and positioned
- [ ] Tag border-radius is consistent
