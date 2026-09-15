# Avatar — Test Specification

> **Source spec:** `avatar.md`  
> **Component:** Avatar (image, initials, fallback, status, group)

---

## E2E Tests

### Image rendering
- [ ] Avatar renders an `<img>` element when `src` is provided
- [ ] Image loads and fades in with 300ms opacity transition (`avatar.load` preset)
- [ ] When image fails to load, the fallback (initials) is displayed
- [ ] `alt` text is rendered on the `<img>` element
- [ ] When no `src` and no `fallback` is given, initials are auto-generated from `alt`

### Sizes & shapes
- [ ] All size presets render at correct dimensions: `xs`, `sm`, `md`, `lg`, `xl`
- [ ] All shape presets render correct border-radius: `circle`, `square`, `squircle`

### Status indicator
- [ ] Status dot renders for `online`, `offline`, `away`, `busy`
- [ ] `online` status shows subtle pulse animation
- [ ] No status dot when `status` prop is omitted

### Avatar.Group
- [ ] Overlapping avatars render with negative margin / overlap
- [ ] `max` prop limits visible avatars; excess shows "+N" overflow indicator
- [ ] Overflow indicator displays correct count (total - max)
- [ ] Group respects z-index stacking (first avatar on top)

### Motion
- [ ] Image load fade-in animation fires on src change
- [ ] `motion={false}` disables all animations
- [ ] Custom `MotionConfig` overrides the default preset

---

## Integration Tests

### With other components
- [ ] Avatar inside a Button renders without layout breakage
- [ ] Avatar inside a Card header aligns correctly
- [ ] Avatar inside a DataTable cell renders inline
- [ ] Avatar inside a Tag (with icon) renders correctly

### Composed usage
- [ ] `<Avatar.Image>` + `<Avatar.Fallback>` + `<Avatar.Status>` composed children work
- [ ] Composed children override Root-level `src`/`fallback`/`status` props
- [ ] Avatar inside `Avatar.Group` receives correct overlap styling

### Cross-platform
- [ ] Web: renders `<span>` wrapper with `<img>` or text
- [ ] Native: renders `<View>` with `<Image>` or `<Text>`
- [ ] Native lazy-load fade-in works

---

## Accessibility Tests

- [ ] `<img>` has non-empty `alt` attribute when `src` is provided
- [ ] Initials fallback has `aria-label` matching `alt` text
- [ ] Status indicator has `aria-hidden="true"` (decorative)
- [ ] Avatar.Group overflow indicator has accessible label (e.g., "5 more users")
- [ ] Color contrast of initials text against background meets WCAG AA (4.5:1)
- [ ] Avatar is keyboard-navigable when wrapped in an interactive element
- [ ] Screen reader announces user name from `alt` text

---

## Visual Regression

- [ ] All size + shape + status combinations render without visual defects
- [ ] Image load transition does not cause layout shift (CLS)
- [ ] Fallback initials are centered vertically and horizontally
- [ ] Avatar.Group overlap spacing is consistent across sizes
