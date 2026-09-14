# Skeleton

> **Headless hook:** none (presentational)  
> **Web primitive:** `Skeleton` (renders `<div>` with shimmer)  
> **Native primitive:** `Skeleton` (renders `<View>` with animated gradient)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Placeholder loading UI that mimics the shape of the content being loaded. Supports text lines, circles, rectangles, and custom shapes with a shimmer animation.

## Anatomy

```
┌──────────────────────────┐
│ ┌────┐                   │  ← Circle (avatar)
│ │    │  ┌──────────────┐ │  ← Text line 1
│ └────┘  └──────────────┘ │
│         ┌──────────┐     │  ← Text line 2 (shorter)
│         └──────────┘     │
└──────────────────────────┘
```

## API

### `Skeleton.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"text" \| "circle" \| "rectangle" \| "rounded"` | `"text"` | Shape |
| `width` | `number \| string` | `"100%"` | Width |
| `height` | `number \| string` | `"1em"` (text) / `"100%"` (rect) | Height |
| `lines` | `number` | `1` | Number of text lines (text variant) |
| `lastLineWidth` | `number \| string` | `"60%"` | Width of last line (text variant) |
| `animation` | `"shimmer" \| "pulse" \| "none"` | `"shimmer"` | Animation style |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Animation speed |

## Motion

**Default preset `skeleton.shimmer`:**
- Shimmer: linear gradient sweep (transparent → white/20% → transparent), 1.5s infinite loop, ease-in-out
- Pulse: opacity 1 → 0.5 → 1, 1.5s infinite loop, ease-in-out
- Both respect `prefers-reduced-motion` → static gray

## Accessibility

- `aria-busy="true"` on parent container
- `aria-hidden="true"` on skeleton elements themselves
- Screen reader announces "Loading" via a visually hidden label
- **Important:** Skeleton must be replaced with real content, not coexist with it

## Usage

```tsx
// Text skeleton
<Skeleton.Root variant="text" lines={3} lastLineWidth="40%" />

// Avatar skeleton
<Skeleton.Root variant="circle" width={48} height={48} />

// Card skeleton
<Skeleton.Root variant="rounded" width={320} height={200} />

// Composed
<div style={{ display: 'flex', gap: 16 }}>
  <Skeleton.Root variant="circle" width={48} height={48} />
  <div style={{ flex: 1 }}>
    <Skeleton.Root variant="text" width="60%" />
    <Skeleton.Root variant="text" width="40%" />
  </div>
</div>
```
