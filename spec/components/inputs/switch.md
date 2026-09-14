# Switch / Toggle

> **Headless hook:** `useSwitch`  
> **Web primitive:** `Switch` (renders `<button role="switch">`)  
> **Native primitive:** `Switch` (renders `<Pressable>` + animated thumb)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

A toggle switch for binary on/off settings. Larger and more tactile than a checkbox.

## Anatomy

```
┌──────────────────────┐
│ Label          ┌──┐  │
│                └──┘  │  ← Switch.Root
└──────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Switch.Root` | Yes | Track + thumb + label container. |
| `Switch.Thumb` | No | The sliding circle. Customizable. |
| `Switch.Label` | No | Text label. |

## API

### `Switch.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset |
| `labelPlacement` | `"start" \| "end"` | `"end"` | Label position relative to switch |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default preset `switch.toggle`:**
- Thumb slide: translateX with spring (stiffness=400, damping=30), 250ms
- Track color: background-color transition, 200ms ease-out
- Thumb scale on press: 1.0 → 1.15 → 1.0, 150ms

## Accessibility

- `role="switch"`, `aria-checked`
- Keyboard: Space to toggle
- Label announces "on" / "off" state change

## Usage

```tsx
<Switch.Root checked={enabled} onCheckedChange={setEnabled}>
  <Switch.Label>Enable notifications</Switch.Label>
</Switch.Root>
```
