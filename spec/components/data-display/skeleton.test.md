# Skeleton — Test Specification

> **Source spec:** `skeleton.md`  
> **Component:** Skeleton (text, circle, rectangle, rounded variants; shimmer/pulse animation)

---

## E2E Tests

### Variants
- [ ] `variant="text"` renders horizontal bars (lines of text)
- [ ] `variant="circle"` renders a perfect circle
- [ ] `variant="rectangle"` renders a rectangular block
- [ ] `variant="rounded"` renders a rectangle with rounded corners

### Text variant specifics
- [ ] `lines` prop renders correct number of text lines
- [ ] `lastLineWidth` prop sets the last line shorter (e.g., "60%")
- [ ] Each line has correct width and spacing

### Dimensions
- [ ] `width` prop sets correct width (number or string like "100%")
- [ ] `height` prop sets correct height
- [ ] Circle variant: width and height are equal (square bounding box → circle)
- [ ] Text variant: default height is "1em"

### Animation
- [ ] `animation="shimmer"` shows gradient sweep animation (1.5s infinite)
- [ ] `animation="pulse"` shows opacity pulse (1 → 0.5 → 1, 1.5s infinite)
- [ ] `animation="none"` shows static gray block
- [ ] `speed="slow"` adjusts animation duration slower
- [ ] `speed="fast"` adjusts animation duration faster
- [ ] `speed="normal"` is the default speed

### Reduced motion
- [ ] When `prefers-reduced-motion: reduce` is set, skeleton shows static gray (no animation)
- [ ] `motion={false}` disables animations

---

## Integration Tests

### Composed layouts
- [ ] Skeleton circle (avatar) + text lines side by side mimics a user card layout
- [ ] Skeleton rectangle mimics a content card/image placeholder
- [ ] Multiple skeleton blocks compose into a full page loading state
- [ ] Skeleton inside Card renders correctly

### Loading → Content transition
- [ ] Skeleton is replaced (not overlaid) by real content when data loads
- [ ] No flash of both skeleton and content simultaneously
- [ ] `aria-busy` transitions from `true` to `false` when content loads

---

## Accessibility Tests

- [ ] Parent container has `aria-busy="true"` during loading
- [ ] Skeleton elements have `aria-hidden="true"` (purely decorative)
- [ ] A visually hidden "Loading" label is present for screen readers
- [ ] Skeleton does NOT receive keyboard focus
- [ ] Skeleton is not announced as interactive content
- [ ] When content loads, skeleton is removed from the accessibility tree

---

## Visual Regression

- [ ] Shimmer gradient animation is smooth, no flickering
- [ ] Pulse animation is smooth
- [ ] Text lines have consistent spacing between them
- [ ] Circle variant is perfectly circular at all sizes
- [ ] Rectangle and rounded variants have correct border-radius
- [ ] Skeleton color is distinguishable from content background
- [ ] No layout shift when skeleton is replaced by real content (same dimensions)
