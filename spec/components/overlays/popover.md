# Popover

> **Headless hook:** `usePopover`  
> **Web primitive:** `Popover` (renders floating panel via Floating UI)  
> **Native primitive:** `Popover` (renders modal overlay)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

A floating panel anchored to a trigger element. Used for rich context menus, filter panels, color pickers, and any content that needs to float near a reference point.

## Anatomy

```
┌─────────────────────┐
│  [Trigger Button]   │  ← Popover.Trigger
│       ▼             │
│  ┌──────────────┐   │  ← Popover.Content
│  │ Popover      │   │
│  │ Content      │   │
│  └──────────────┘   │
└─────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Popover.Root` | Yes | State container. |
| `Popover.Trigger` | Yes | Anchor element. |
| `Popover.Content` | Yes | Floating panel. |
| `Popover.Arrow` | No | Pointer arrow. |
| `Popover.Close` | No | Close button. |

## API

### `Popover.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Change handler |
| `placement` | `"top" \| "bottom" \| "left" \| "right" \| "top-start" \| "top-end" \| ...` | `"bottom"` | Preferred placement (12 options) |
| `offset` | `number` | `8` | Distance from trigger |
| `shiftPadding` | `number` | `8` | Viewport edge padding |
| `closeOnEscape` | `boolean` | `true` | Escape to close |
| `closeOnOutsideClick` | `boolean` | `true` | Click outside to close |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default preset `popover.enter` / `popover.exit`:**
- Enter: opacity 0 → 1, scale 0.95 → 1, translateY 4px → 0 (from placement direction), 200ms ease-out
- Exit: opacity 1 → 0, scale 1 → 0.95, 150ms ease-in
- Arrow: fades with content

## Accessibility

- Trigger: `aria-expanded`, `aria-haspopup="dialog"`
- Content: `role="dialog"`, `aria-labelledby` if titled
- Focus moves to content on open, returns to trigger on close
- Escape closes
- Click outside closes

## Usage

```tsx
<Popover.Root>
  <Popover.Trigger>
    <Button.Root variant="outline">Filters</Button.Root>
  </Popover.Trigger>
  <Popover.Content>
    <div style={{ padding: 16, width: 280 }}>
      <h3>Filter by status</h3>
      <Checkbox.Root><Checkbox.Label>Active</Checkbox.Label></Checkbox.Root>
      <Checkbox.Root><Checkbox.Label>Inactive</Checkbox.Label></Checkbox.Root>
    </div>
    <Popover.Arrow />
  </Popover.Content>
</Popover.Root>
```
