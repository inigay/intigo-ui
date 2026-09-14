# Badge

> **Headless hook:** `useBadge`  
> **Web primitive:** `Badge` (renders `<span>`)  
> **Native primitive:** `Badge` (renders `<View>` + `<Text>`)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Small count or status indicator. Used on icons, avatars, tabs, and buttons. Supports number, dot, and label variants with overflow handling.

## Anatomy

```
┌────┐
│ 3  │  ← Badge.Root (number)
│ ●  │  ← Badge.Root (dot)
│NEW │  ← Badge.Root (label)
└────┘
```

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"number" \| "dot" \| "label"` | `"number"` | Display style |
| `value` | `number \| string` | — | Content (number or label text) |
| `max` | `number` | `99` | Maximum displayed number (shows "99+") |
| `color` | `"primary" \| "success" \| "destructive" \| "warning" \| "neutral"` | `"primary"` | Color preset |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset |
| `placement` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"` | Position when used as overlay |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default preset `badge.update`:**
- Value change: scale 1.0 → 1.3 → 1.0, spring bouncy (stiffness=200, damping=10), 250ms
- Enter (first render): scale 0 → 1, spring snappy, 200ms

## Accessibility

- `aria-label` = "{value} notifications" or similar
- Dot variant is decorative if no label provided
- Number is announced as "N new items"

## Usage

```tsx
<Badge value={5} max={99} color="destructive" />
<Badge variant="dot" color="success" />
<Badge variant="label" value="NEW" color="primary" />

// As overlay on icon
<div style={{ position: 'relative' }}>
  <BellIcon />
  <Badge value={3} placement="top-right" />
</div>
```
