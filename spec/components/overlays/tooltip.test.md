# Tooltip — Test Specification

> **Source spec:** `tooltip.md`  
> **Component:** Tooltip (hover/long-press trigger; show/hide delay; arrow; placement)

---

## E2E Tests

### Core behavior
- [ ] Tooltip appears on hover (web) after `delay` ms (default 500ms)
- [ ] Tooltip appears on long press (native, 500ms)
- [ ] Tooltip disappears when cursor leaves trigger
- [ ] Tooltip disappears after `closeDelay` ms (default 0 = immediate)
- [ ] Tooltip does NOT appear on focus (keyboard users)
- [ ] `disabled={true}` prevents tooltip from showing

### Parts
- [ ] `Tooltip.Trigger` renders the anchor element
- [ ] `Tooltip.Content` renders the tooltip label
- [ ] `Tooltip.Arrow` renders pointer arrow

### Placement
- [ ] `side="top"` (default): above trigger
- [ ] `side="bottom"`: below trigger
- [ ] `side="left"`: left of trigger
- [ ] `side="right"`: right of trigger
- [ ] `align="start"`: aligned to start of trigger
- [ ] `align="center"` (default): centered on trigger
- [ ] `align="end"`: aligned to end of trigger
- [ ] Tooltip flips when insufficient space

### Positioning
- [ ] `offset` controls distance from trigger (default 6)
- [ ] Tooltip stays within viewport boundaries
- [ ] Tooltip repositions on scroll

### Timing
- [ ] `delay` controls show delay in ms
- [ ] `closeDelay` controls hide delay in ms
- [ ] Rapid hover in/out doesn't cause flickering (debounce)
- [ ] Tooltip doesn't appear if cursor leaves before delay completes

### Motion
- [ ] Enter: opacity 0 → 1, translateY 4px → 0, 200ms ease-out, delayed by `delay`
- [ ] Exit: opacity 1 → 0, translateY 0 → 2px, 100ms ease-in (no delay)
- [ ] Does NOT scale (tooltips that scale feel bouncy/imprecise)
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With other components
- [ ] Tooltip on an icon-only Button (e.g., "Copy", "Edit", "Delete")
- [ ] Tooltip on a truncated text element (shows full text)
- [ ] Tooltip on a Badge or Tag for supplementary info
- [ ] Tooltip on a DataTable cell with truncated content
- [ ] Tooltip on a disabled Button (should NOT show, or show explaining why disabled)

### Touch devices
- [ ] Long press (500ms) shows tooltip
- [ ] Tooltip dismisses on scroll
- [ ] Tooltip dismisses on touch outside
- [ ] Tooltip doesn't interfere with normal tap behavior

---

## Accessibility Tests

- [ ] Trigger: `aria-describedby` points to tooltip ID
- [ ] Content: `role="tooltip"`
- [ ] Tooltip content is NOT focusable
- [ ] Tooltip does NOT appear on focus (keyboard-only users)
- [ ] Keyboard users: use proper label or aria-label instead of relying on tooltip
- [ ] Tooltip text is concise (1-5 words recommended)
- [ ] Color contrast: tooltip text against background meets WCAG AA
- [ ] Arrow is hidden from accessibility tree (`aria-hidden`)
- [ ] Tooltip doesn't block or obscure the trigger element

---

## Visual Regression

- [ ] All side × align combinations render correctly
- [ ] Arrow points to the trigger correctly
- [ ] Tooltip background is dark/semi-transparent with light text
- [ ] Tooltip has correct border-radius (small, subtle)
- [ ] Tooltip has correct padding (compact)
- [ ] Tooltip text is small, single-line preferred
- [ ] Show/hide animations are smooth, no flickering
- [ ] Tooltip doesn't overflow viewport
- [ ] Arrow color matches tooltip background
