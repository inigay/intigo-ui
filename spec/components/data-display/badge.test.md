# Badge — Test Specification

> **Source spec:** `badge.md`  
> **Component:** Badge (number, dot, label variants; overlay placement)

---

## E2E Tests

### Variants
- [ ] `variant="number"` renders numeric value
- [ ] `variant="dot"` renders a small filled circle
- [ ] `variant="label"` renders text label (e.g., "NEW")

### Value & overflow
- [ ] Number variant displays the exact `value` when ≤ `max`
- [ ] Number variant displays "{max}+" when value exceeds max
- [ ] Default `max` is 99; custom max respected
- [ ] Label variant renders the `value` string as-is

### Colors & sizes
- [ ] All color presets render correct background/text colors: `primary`, `success`, `destructive`, `warning`, `neutral`
- [ ] All size presets render at correct dimensions: `sm`, `md`, `lg`

### Placement (overlay mode)
- [ ] `placement="top-right"` positions badge at top-right of parent
- [ ] `placement="top-left"` positions correctly
- [ ] `placement="bottom-right"` positions correctly
- [ ] `placement="bottom-left"` positions correctly
- [ ] Badge is positioned correctly inside a relatively-positioned parent

### Motion
- [ ] First render: scale 0 → 1 entrance animation (200ms)
- [ ] Value change: scale pulse 1.0 → 1.3 → 1.0 (250ms spring)
- [ ] `motion={false}` disables animations
- [ ] Custom `MotionConfig` overrides defaults

---

## Integration Tests

### As overlay
- [ ] Badge overlaid on an icon (e.g., bell icon) positions correctly at all 4 placements
- [ ] Badge overlaid on an Avatar positions correctly
- [ ] Badge overlaid on a Tab.Trigger (notification count) renders and aligns correctly
- [ ] Badge overlaid on a Button shows correct positioning

### Value updates
- [ ] Real-time value change from 0 → 5 triggers pulse animation
- [ ] Value change from 99 → 100 shows "99+" overflow
- [ ] Rapid consecutive value changes don't cause animation glitches

---

## Accessibility Tests

- [ ] Number variant has `aria-label` like "{value} notifications"
- [ ] Dot variant has `aria-hidden="true"` when no accessible label provided
- [ ] Dot variant with label announces correctly
- [ ] Label variant text is readable by screen readers
- [ ] Color is not the sole means of conveying meaning (accompanied by text/icon)
- [ ] Badge text meets WCAG AA contrast ratio (4.5:1) against its background
- [ ] Badge does not receive focus when used as a non-interactive overlay

---

## Visual Regression

- [ ] All color × variant × size combinations render correctly
- [ ] Overflow "+" indicator aligns with the number
- [ ] Dot variant is perfectly circular at all sizes
- [ ] Badge placement offset is consistent across sizes
- [ ] No overflow clipping when badge extends beyond parent bounds
