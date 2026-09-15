# VisuallyHidden

> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Hides content visually while keeping it accessible to screen readers. Used for skip links, additional labels, and status announcements.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `keyof JSX.IntrinsicElements` | `"span"` | HTML element (web) |
| `children` | `ReactNode` | **required** | Content (visible only to screen readers) |

## Behavior

- Content is NOT visually rendered (zero size, off-screen, or clipped)
- Content IS in the accessibility tree
- Content IS findable by screen reader navigation
- Content does NOT affect layout

## Usage

```tsx
<VisuallyHidden>
  <a href="#main-content">Skip to main content</a>
</VisuallyHidden>

<Button.Root>
  <SearchIcon />
  <VisuallyHidden>Search</VisuallyHidden>
</Button.Root>
```
