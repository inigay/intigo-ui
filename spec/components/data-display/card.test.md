# Card — Test Specification

> **Source spec:** `card.md`  
> **Component:** Card (elevated, outlined, flat variants; interactive; sections)

---

## E2E Tests

### Variants
- [ ] `variant="elevated"` renders with box-shadow, no border
- [ ] `variant="outlined"` renders with 1px border, no shadow
- [ ] `variant="flat"` renders with no shadow, no border, background fill only

### Interactive mode
- [ ] When `interactive={true}`, card shows hover elevation effect (translateY -2px + shadow increase)
- [ ] When `interactive={true}`, card shows press scale effect (scale 0.99)
- [ ] `onPress` fires on click/tap
- [ ] `onPress` fires on Enter/Space when focused
- [ ] When `onPress` is provided but `interactive` is false, card is NOT interactive

### Sections
- [ ] `Card.Header` renders at top
- [ ] `Card.Body` renders in middle, scrollable if content overflows
- [ ] `Card.Footer` renders at bottom
- [ ] `Card.Image` renders full-width at top
- [ ] Card without optional sections (Header, Footer, Image) renders Body correctly

### Sizing
- [ ] `fullWidth={true}` fills parent container width
- [ ] `padding` presets apply correct internal spacing: `none`, `sm`, `md`, `lg`

### Motion
- [ ] Hover: translateY -2px + shadow increase, 200ms ease-out
- [ ] Press: scale 0.99, 100ms ease-out
- [ ] Enter (list context): stagger fade + slide up, 50ms delay per card
- [ ] `motion={false}` disables all animations

---

## Integration Tests

### With other components
- [ ] Card contains Button in Footer — button is clickable without card press interference
- [ ] Card contains Badge in Header — badge renders and positions correctly
- [ ] Card contains Input in Body — input receives focus without card interference
- [ ] Card contains Skeleton as loading placeholder — skeleton renders correctly inside card
- [ ] Card inside a grid/list layout with other cards respects `fullWidth`

### List rendering
- [ ] Multiple Cards in a list render staggered enter animations
- [ ] Interactive cards in a list don't interfere with each other's hover states

---

## Accessibility Tests

- [ ] When `onPress` is provided: `role="button"`, `tabIndex={0}`
- [ ] When `onPress` is NOT provided: no interactive role (just a `<div>`)
- [ ] Card.Image has accessible `alt` text
- [ ] Interactive card is reachable via Tab key
- [ ] Interactive card activates on Enter and Space
- [ ] Card content maintains proper heading hierarchy (h1-h6)
- [ ] Non-interactive cards do not appear in tab order

---

## Visual Regression

- [ ] All variant × padding combinations render correctly
- [ ] Interactive hover state: shadow increases smoothly, no jitter
- [ ] Card with long content body scrolls internally, header/footer remain sticky
- [ ] Card.Image maintains aspect ratio, no stretching
- [ ] Border radius is consistent across all sections
