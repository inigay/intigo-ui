# Popover — Test Specification

> **Source spec:** `popover.md`  
> **Component:** Popover (floating panel; 12 placement options; arrow; focus management)

---

## E2E Tests

### Core behavior
- [ ] Clicking trigger opens the popover
- [ ] Clicking outside closes the popover (`closeOnOutsideClick={true}`)
- [ ] Escape key closes the popover (`closeOnEscape={true}`)
- [ ] `closeOnEscape={false}` prevents Escape close
- [ ] `closeOnOutsideClick={false}` prevents outside click close

### Parts
- [ ] `Popover.Trigger` renders anchor element
- [ ] `Popover.Content` renders floating panel
- [ ] `Popover.Arrow` renders pointer arrow
- [ ] `Popover.Close` renders close button

### Placement
- [ ] `placement="bottom"` (default): below trigger
- [ ] `placement="top"`: above trigger
- [ ] `placement="left"`: left of trigger
- [ ] `placement="right"`: right of trigger
- [ ] `placement="top-start"`: above, left-aligned
- [ ] `placement="top-end"`: above, right-aligned
- [ ] `placement="bottom-start"`: below, left-aligned
- [ ] `placement="bottom-end"`: below, right-aligned
- [ ] `placement="left-start"`: left, top-aligned
- [ ] `placement="left-end"`: left, bottom-aligned
- [ ] `placement="right-start"`: right, top-aligned
- [ ] `placement="right-end"`: right, bottom-aligned
- [ ] Popover flips placement when insufficient space

### Positioning
- [ ] `offset` controls distance from trigger (default 8)
- [ ] `shiftPadding` controls viewport edge padding (default 8)
- [ ] Popover stays within viewport boundaries
- [ ] Popover repositions on scroll/resize

### Controlled/uncontrolled
- [ ] `open` + `onOpenChange` (controlled) work correctly
- [ ] Uncontrolled: trigger click toggles open state

### Motion
- [ ] Enter: opacity 0 → 1, scale 0.95 → 1, translateY 4px → 0, 200ms ease-out
- [ ] Exit: opacity 1 → 0, scale 1 → 0.95, 150ms ease-in
- [ ] Arrow fades with content
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With other components
- [ ] Popover contains interactive elements (Button, Input, Checkbox, Select)
- [ ] Popover used as a filter panel with Checkbox options
- [ ] Popover used as a color picker
- [ ] Popover used as a rich context menu
- [ ] Popover triggered from a DataTable row action button
- [ ] Popover triggered from a Button in a toolbar

### Focus management
- [ ] Focus moves to Popover.Content on open
- [ ] Tab cycles through focusable elements inside popover
- [ ] Focus returns to trigger on close
- [ ] Clicking outside returns focus to trigger

### Positioning edge cases
- [ ] Trigger near viewport edge: popover flips to opposite side
- [ ] Trigger near viewport corner: popover adjusts alignment
- [ ] Scroll while popover is open: popover repositions
- [ ] Window resize while popover is open: popover repositions

---

## Accessibility Tests

- [ ] Trigger: `aria-expanded`, `aria-haspopup="dialog"`
- [ ] Content: `role="dialog"`, `aria-labelledby` if titled
- [ ] Focus moves to content on open
- [ ] Focus returns to trigger on close
- [ ] Escape closes popover
- [ ] Click outside closes popover
- [ ] Popover content is focusable
- [ ] Arrow is hidden from accessibility tree (`aria-hidden`)
- [ ] Close button has accessible label

---

## Visual Regression

- [ ] All 12 placement positions render correctly
- [ ] Arrow points to the trigger correctly
- [ ] Panel has correct box-shadow/elevation
- [ ] Panel has correct border-radius
- [ ] Open/close animations are smooth
- [ ] Popover doesn't overflow viewport
- [ ] Content width is constrained, long content wraps
- [ ] Arrow color matches panel background
