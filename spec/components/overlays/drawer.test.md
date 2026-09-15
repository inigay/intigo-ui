# Drawer / Sheet — Test Specification

> **Source spec:** `drawer.md`  
> **Component:** Drawer (slide-in panel; left/right/top/bottom; snap points; gesture dismiss)

---

## E2E Tests

### Core behavior
- [ ] Drawer opens when `open={true}` or trigger is clicked
- [ ] Drawer closes when close button is clicked
- [ ] Drawer closes on Escape (`closeOnEscape={true}`)
- [ ] Drawer closes on overlay click (`closeOnOutsideClick={true}`)
- [ ] Drawer closes on swipe (`closeOnSwipe={true}`, native)
- [ ] `modal={true}` blocks interaction with background
- [ ] `modal={false}` allows background interaction

### Slide directions
- [ ] `side="left"`: slides in from left edge
- [ ] `side="right"`: slides in from right edge (default)
- [ ] `side="top"`: slides down from top edge
- [ ] `side="bottom"`: slides up from bottom edge
- [ ] Content translates correctly for each direction

### Parts
- [ ] `Drawer.Trigger` renders opener element
- [ ] `Drawer.Overlay` renders backdrop
- [ ] `Drawer.Content` renders the sliding panel
- [ ] `Drawer.Handle` renders drag handle (native sheet)
- [ ] `Drawer.Header` renders title + close button
- [ ] `Drawer.Body` renders scrollable content
- [ ] `Drawer.Footer` renders action buttons
- [ ] `Drawer.Close` renders close button

### Sizes
- [ ] All size presets render correct dimensions: `sm`, `md`, `lg`, `xl`, `full`
- [ ] Size affects width for left/right, height for top/bottom

### Snap points (native sheet)
- [ ] `snapPoints` defines breakpoints as % of height
- [ ] `defaultSnapPoint` sets initial snap position
- [ ] Dragging between snap points works
- [ ] Rubberband effect when pulling past max snap point
- [ ] Velocity-based dismissal: fast swipe down closes

### Motion
- [ ] Web overlay: opacity 0 → 1, 250ms ease-out
- [ ] Web content: slide in from `side`, 300ms ease-out
- [ ] Native: spring-driven slide from bottom
- [ ] Native: rubberband effect past snap points
- [ ] Native: velocity-based dismissal
- [ ] Native handle: subtle bounce on reach
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With other components
- [ ] Drawer contains navigation menu (list of links/buttons)
- [ ] Drawer contains form with Input, Select, Checkbox
- [ ] Drawer contains DataTable or long scrolling content
- [ ] Drawer triggered from a Button in the header
- [ ] Drawer used alongside Dialog — correct z-index stacking

### Nested patterns
- [ ] Drawer opening another Drawer (nested) — correct layering
- [ ] Drawer opening a Dialog — Dialog appears above Drawer

### Cross-platform
- [ ] Web: slide animation uses CSS transforms
- [ ] Native: uses gesture handler for swipe-to-dismiss
- [ ] Native bottom sheet: handle is draggable
- [ ] Native: StatusBar overlay on open

---

## Accessibility Tests

- [ ] `role="dialog"`, `aria-modal="true"`
- [ ] `aria-labelledby` points to title
- [ ] Focus trap inside drawer
- [ ] Focus restoration on close
- [ ] Escape closes (web)
- [ ] Swipe down closes (native, with VoiceOver gesture passthrough)
- [ ] Overlay is announced but not focusable
- [ ] Close button has accessible label
- [ ] Handle has accessible label (native)

---

## Visual Regression

- [ ] All side × size combinations render correctly
- [ ] Overlay fades in/out smoothly
- [ ] Panel slides in/out smoothly, no jank
- [ ] Panel has correct border-radius on appropriate corners
- [ ] Panel shadow/elevation is correct
- [ ] Handle is centered and styled correctly (native)
- [ ] Content scrolls within the panel, header/footer sticky
- [ ] Panel width/height matches size preset
- [ ] Full size: panel fills viewport in the slide direction
- [ ] Responsive: panel width adapts to viewport
