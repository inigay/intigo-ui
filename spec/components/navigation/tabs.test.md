# Tabs — Test Specification

> **Source spec:** `tabs.md`  
> **Component:** Tabs (horizontal/vertical; underline/pill/enclosed variants; animated indicator; badges)

---

## E2E Tests

### Core behavior
- [ ] Clicking a tab trigger switches to that tab's panel
- [ ] Only one tab panel is visible at a time
- [ ] `value` + `onValueChange` (controlled) work correctly
- [ ] `defaultValue` (uncontrolled) sets initial active tab
- [ ] `activationMode="automatic"`: panel shows immediately on focus/click
- [ ] `activationMode="manual"`: panel shows only on click/Enter/Space

### Parts
- [ ] `Tabs.List` renders tab button container
- [ ] `Tabs.Trigger` renders individual tab button
- [ ] `Tabs.Indicator` renders animated selection bar
- [ ] `Tabs.Panel` renders tab content

### Orientation
- [ ] `orientation="horizontal"`: tabs arranged in a row
- [ ] `orientation="vertical"`: tabs arranged in a column
- [ ] Indicator orientation matches: horizontal bar for horizontal, vertical bar for vertical

### Variants
- [ ] `underline` (default): bottom border indicator
- [ ] `pill`: rounded background on active tab
- [ ] `enclosed`: bordered tab panels with connected active tab

### Tab features
- [ ] `Tabs.Trigger disabled={true}` prevents selection
- [ ] `Tabs.Trigger badge` renders notification badge
- [ ] Badge count update triggers pulse animation

### Motion
- [ ] Indicator: slides to new tab position + width, spring (stiffness=300, damping=25), 250ms
- [ ] Panel content: crossfade (opacity 0 → 1), 200ms ease-out
- [ ] Tab hover: subtle background highlight, 150ms ease-out
- [ ] Badge: count change pulse
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With other components
- [ ] Tab panel content contains any component (forms, tables, cards)
- [ ] Tabs inside a Card for tabbed card content
- [ ] Tabs inside a Dialog for multi-step forms
- [ ] Tabs inside a Drawer for navigation sections
- [ ] Tabs with Badge on triggers for notification counts
- [ ] Tabs with Icon in triggers for icon+label tabs

### Dynamic tabs
- [ ] Adding/removing tabs dynamically updates correctly
- [ ] Active tab is removed → falls back to first available tab
- [ ] All tabs removed → no panel visible (graceful)

### Lazy loading
- [ ] Tab panels can be lazy-loaded (render only when active)
- [ ] Previously visited tab panel content is preserved (if keepMounted)

---

## Accessibility Tests

- [ ] Tab list: `role="tablist"`, `aria-orientation`
- [ ] Tab: `role="tab"`, `aria-selected="true"/"false"`
- [ ] Tab: `aria-controls` points to panel ID
- [ ] Panel: `role="tabpanel"`, `aria-labelledby` points to tab ID
- [ ] Panel: `tabIndex={0}` to make it focusable
- [ ] Keyboard: Left/Right arrows navigate horizontal tabs
- [ ] Keyboard: Up/Down arrows navigate vertical tabs
- [ ] Keyboard: Home jumps to first tab, End jumps to last tab
- [ ] Keyboard: Enter/Space activates the focused tab
- [ ] Disabled tabs are skipped in keyboard navigation
- [ ] Disabled tab has `aria-disabled="true"`
- [ ] Screen reader announces selected tab and tab count/position
- [ ] Badge count is announced

---

## Visual Regression

- [ ] All variant × orientation combinations render correctly
- [ ] Indicator slides smoothly between tabs of different widths
- [ ] Panel crossfade is smooth
- [ ] Active tab has correct visual distinction (color, weight, underline)
- [ ] Inactive tabs have correct subdued styling
- [ ] Horizontal tabs: equal or intrinsic widths, scrollable if overflow
- [ ] Vertical tabs: consistent width, panel fills remaining space
- [ ] Badge is positioned correctly on tab trigger
- [ ] Pill variant: active tab background has correct border-radius
