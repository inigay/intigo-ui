# Button — Test Specification

> **Source spec:** `button.md`  
> **Component:** Button (6 variants, 5 sizes, loading state, icon slots, spring press animation)

---

## E2E Tests

### Variants
- [ ] `variant="primary"` renders with primary background, white text
- [ ] `variant="secondary"` renders with gray background, dark text
- [ ] `variant="outline"` renders with transparent background, primary border
- [ ] `variant="ghost"` renders with transparent background, gray text
- [ ] `variant="destructive"` renders with red background, white text
- [ ] `variant="link"` renders with transparent background, primary text, underline on hover

### Sizes
- [ ] All size presets render at correct dimensions: `xs`, `sm`, `md`, `lg`, `xl`
- [ ] Icon and label scale proportionally with size

### States
- [ ] **Rest:** base variant styles applied
- [ ] **Hover (web):** slightly darker/lighter (10-15% luminance shift)
- [ ] **Press:** scale to 0.97, spring-release back to 1.0
- [ ] **Focus:** 2px offset focus ring in primary color at 40% opacity
- [ ] **Disabled:** 50% opacity, `cursor: not-allowed`, no hover/press effects
- [ ] **Loading:** spinner replaces left icon, label stays, `aria-busy="true"`

### Parts
- [ ] `Button.Icon` renders an icon at correct size
- [ ] `Button.Icon position="left"` places icon before label
- [ ] `Button.Icon position="right"` places icon after label
- [ ] `Button.Label` renders text content
- [ ] `Button.Spinner` shows when `loading={true}`
- [ ] Icon-only button renders without label

### Motion
- [ ] Press: scale 1.0 → 0.97 → 1.0, spring (stiffness=300, damping=20), 150ms
- [ ] Hover: background luminance shift, 150ms ease-out
- [ ] If loading starts during press: stays at 0.97 until loading completes
- [ ] `motion={false}` disables press animation
- [ ] Custom `MotionConfig` overrides defaults

### HTML attributes
- [ ] `type="submit"` submits parent form
- [ ] `type="reset"` resets parent form
- [ ] `type="button"` (default) does neither
- [ ] `asChild={true}` renders children as the trigger element (Radix-style)

---

## Integration Tests

### With forms
- [ ] Submit button inside `<form>` triggers form submission
- [ ] Reset button inside `<form>` resets form fields
- [ ] Disabled submit button prevents form submission

### With other components
- [ ] Button inside Dialog.Footer triggers dialog action
- [ ] Button inside Card.Footer triggers card action
- [ ] Button as Toast.Action triggers toast callback
- [ ] Button inside DataTable cell (edit/delete actions) works
- [ ] Button with Badge as child renders correctly

### Loading state integration
- [ ] Form submit: button enters loading state, form fields become read-only/disabled
- [ ] Async action completes → loading ends → button returns to rest state
- [ ] Rapid double-click during loading does not fire `onPress` twice

---

## Accessibility Tests

- [ ] Renders as native `<button>` element on web
- [ ] `aria-label` auto-derived from children text if not explicit
- [ ] Icon-only buttons MUST have explicit `aria-label`
- [ ] `aria-busy="true"` when loading
- [ ] `aria-disabled="true"` when disabled or loading
- [ ] Keyboard: Enter and Space activate the button
- [ ] Focus ring is visible and meets contrast requirements
- [ ] Disabled button is removed from tab order (`tabIndex={-1}`)
- [ ] Link variant announces as link, not button (if using `<a>`)
- [ ] Color contrast: text against background meets WCAG AA (4.5:1) for all variants

---

## Visual Regression

- [ ] All variant × size × state combinations render correctly
- [ ] Press animation: scale transform is centered, no position shift
- [ ] Focus ring is offset from button edge, not overlapping border
- [ ] Loading spinner is vertically centered with label
- [ ] Icon and label have consistent spacing (gap)
- [ ] Full-width button fills parent container
- [ ] Rounded variants: `default`, `pill`, `none` render correct border-radius
- [ ] Cross-platform: web `<button>` vs native `<Pressable>` render equivalently
