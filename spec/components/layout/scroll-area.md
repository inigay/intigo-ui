# ScrollArea

> **Headless hook:** `useScrollArea`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Custom scrollable container with styled scrollbars. Replaces native scrollbars with a consistent, themeable design. Supports vertical and horizontal scrolling, fade edges (content fades at edges to indicate more content), and smooth scroll.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Scroll direction |
| `height` | `number \| string` | `"100%"` | Container height |
| `width` | `number \| string` | `"100%"` | Container width |
| `fadeEdges` | `boolean` | `false` | Fade content at scroll edges |
| `fadeSize` | `number` | `40` | Fade gradient size in px |
| `scrollHideDelay` | `number` | `1000` | Ms before scrollbar hides after scroll stops |

## Motion

- Scrollbar: opacity 0 ↔ 1, 200ms ease-out (show on scroll, hide after delay)
- Scrollbar thumb: subtle scale on hover, 150ms
- Fade edges: gradient opacity responds to scroll position (no animation — tracks scroll)

## Accessibility

- Scrollbar is NOT focusable (native scroll behavior via keyboard works)
- Content is keyboard-scrollable
- `tabIndex={0}` on container if content is not naturally focusable
- Scrollbar is hidden from screen readers (`aria-hidden="true"`)

## Usage

```tsx
<ScrollArea.Root height={400} fadeEdges>
  {/* Long content that scrolls */}
</ScrollArea.Root>
```
