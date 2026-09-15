# Switch / Toggle — Test Specification

> **Source spec:** `switch.md`  
> **Component:** Switch (binary on/off toggle; track + thumb; label)

---

## E2E Tests

### Core behavior
- [ ] Clicking/tapping toggles between on and off
- [ ] `checked={true}` renders on state
- [ ] `checked={false}` renders off state
- [ ] `defaultChecked={true}` starts in on state (uncontrolled)
- [ ] `onCheckedChange` fires with new boolean value
- [ ] `disabled={true}` prevents toggling

### Parts
- [ ] `Switch.Root` renders track + thumb + label container
- [ ] `Switch.Thumb` renders the sliding circle
- [ ] `Switch.Label` renders text label
- [ ] `labelPlacement="start"` places label before switch
- [ ] `labelPlacement="end"` places label after switch (default)

### Sizes
- [ ] All size presets render correct track and thumb dimensions: `sm`, `md`, `lg`
- [ ] Label text scales appropriately with size

### States
- [ ] **Off:** track has neutral background, thumb at start position
- [ ] **On:** track has primary/accent background, thumb at end position
- [ ] **Hover (web):** subtle track highlight
- [ ] **Focus:** focus ring visible
- [ ] **Disabled:** 50% opacity, not interactive
- [ ] **Press:** thumb scales 1.0 → 1.15 → 1.0

### Motion
- [ ] Thumb slide: translateX with spring (stiffness=400, damping=30), 250ms
- [ ] Track color: background-color transition, 200ms ease-out
- [ ] Thumb scale on press: 1.0 → 1.15 → 1.0, 150ms
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With forms
- [ ] Switch inside a form submits boolean value
- [ ] Switch with `name` prop submits correct form field
- [ ] Form reset returns switch to default state

### With other components
- [ ] Switch inside a Card for settings toggles
- [ ] Switch inside a Dialog for preference panels
- [ ] Switch alongside a Label and Description in a form group
- [ ] Multiple switches in a list, toggling one doesn't affect others

### State persistence
- [ ] Switch state persists across re-renders (uncontrolled)
- [ ] Controlled switch reflects external state changes

---

## Accessibility Tests

- [ ] `role="switch"` on the toggle element
- [ ] `aria-checked="true"` when on, `"false"` when off
- [ ] Keyboard: Space toggles the switch
- [ ] Label is linked via `htmlFor`/`nativeID`
- [ ] Label announces "on" / "off" state change
- [ ] Focus ring is visible
- [ ] `aria-disabled="true"` when disabled
- [ ] Switch is not announced as a checkbox (distinct role)
- [ ] Color contrast: track and thumb meet WCAG AA

---

## Visual Regression

- [ ] All size × state combinations render correctly
- [ ] Thumb is centered vertically within track
- [ ] Thumb slide animation is smooth, no jitter
- [ ] Track color transition is smooth
- [ ] Thumb has correct border-radius (circular)
- [ ] Track has correct border-radius (pill)
- [ ] Label is vertically aligned with switch
- [ ] Focus ring is offset from the track
- [ ] Disabled state is visually distinct from enabled off state
