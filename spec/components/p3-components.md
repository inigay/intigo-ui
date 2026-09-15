# P3 Components — Quick Specs

This document contains abbreviated specifications for P3 (lowest priority) components. These complete the Prime UI replacement but are not needed for the initial release.

---

## ColorPicker

**Hook:** `useColorPicker` | **Priority:** P3

Color selection with HSV/HSL/RGB/HEX support. Popover with color area (saturation + brightness), hue slider, alpha slider, eyedropper, preset swatches, and hex input. **Motion:** popover enter (same as Select), swatch scale on hover. **a11y:** `role="button"` on swatches, sliders with `role="slider"`, hex input with validation.

---

## Rating

**Hook:** `useRating` | **Priority:** P3

Star rating input (1-5 or custom scale). Supports half-stars, read-only mode, custom icons, and value label. **Motion:** star fill color + scale on hover (stagger per star), selected stars scale bounce. **a11y:** `role="radiogroup"` or `role="slider"`, each star `aria-label="N stars"`, keyboard arrows to adjust.

---

## Command Palette

**Hook:** `useCommand` | **Priority:** P3

Spotlight/Alfred-style command palette. Full-screen overlay with search input, categorized results, keyboard navigation, and recent/frequent items. **Motion:** overlay fade (100ms, fast for perceived speed), list stagger, selection highlight slide. **a11y:** `role="combobox"` + `role="listbox"`, `aria-label="Command palette"`, Escape closes.

---

## Timeline

**Hook:** `useTimeline` | **Priority:** P3

Vertical timeline with alternating or same-side items. Supports icons, dates, connectors, and expandable content. **Motion:** items stagger enter (slide from left/right alternately), connector line draw animation. **a11y:** `role="list"`, items as `role="listitem"`, dates as `<time>`.

---

## EmptyState

**Priority:** P3 (presentational)

Placeholder for empty lists, search results, or error states. Illustration + title + description + optional action button. **Motion:** illustration fade + float, content stagger, button fade in last. **a11y:** `role="status"`, illustration is decorative.

---

## Divider

**Priority:** P3 (presentational)

Horizontal or vertical line separator. Supports label (centered or aligned), dashed style, and decorative variant. **No animation.** **a11y:** `role="separator"` (decorative by default, `aria-orientation` for vertical).

---

## KBD

**Priority:** P3 (presentational)

Keyboard key visual. Small rounded rectangle with key label. Used for shortcuts in documentation and tooltips. **No animation.** **a11y:** rendered as `<kbd>` element on web.

---

## AspectRatio

**Priority:** P3 (presentational)

Container that maintains a fixed aspect ratio. Children fill the container. Common ratios: 1/1, 4/3, 16/9, 21/9. **No animation.** **a11y:** no special role.

---

## Container

**Priority:** P3 (presentational)

Centered max-width container with responsive padding. Replaces manual `max-width: 1200px; margin: 0 auto; padding: 0 16px` patterns. **No animation.** **a11y:** no special role.

---

## Flex / Stack

**Priority:** P3 (presentational)

Layout primitives. Flex: flexbox container with gap, direction, align, justify props. Stack: vertical flex with consistent spacing. Replaces repetitive flexbox CSS. **No animation.** **a11y:** no special role.

---

## Grid

**Priority:** P3 (presentational)

CSS Grid container with columns, rows, gap, and responsive breakpoints. **No animation.** **a11y:** no special role.

---

## Separator

**Priority:** P3 (presentational)

Visual separator between sections. Thin line with optional label. Similar to Divider but with more layout options (full-bleed, inset, with margins). **No animation.**
