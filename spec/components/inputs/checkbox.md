# Checkbox

> **Headless hook:** `useCheckbox`  
> **Web primitive:** `Checkbox` (renders `<input type="checkbox">` + label)  
> **Native primitive:** `Checkbox` (renders `<Pressable>` + icon)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

A binary toggle. Checkbox allows users to select or deselect an option. Supports checked, unchecked, and indeterminate states.

## Anatomy

```
┌───┐
│ ✓ │  Label text        ← Checkbox.Root
└───┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Checkbox.Root` | Yes | Container with indicator + label. |
| `Checkbox.Indicator` | No | The check icon. Customizable. |
| `Checkbox.Label` | No | Text label. Clickable. |

## API

### `Checkbox.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean \| "indeterminate"` | — | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial state |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `invalid` | `boolean` | `false` | Error state |
| `value` | `string` | — | Form value |
| `name` | `string` | — | Form field name |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## States

| State | Visual |
|---|---|
| **Unchecked** | Empty box with border |
| **Checked** | Filled box with check icon |
| **Indeterminate** | Filled box with dash icon |
| **Hover** (web) | Slightly darker border |
| **Focus** | Focus ring |
| **Disabled** | 50% opacity |

## Motion

**Default preset `checkbox.toggle`:**
- Box fill: background color transition 150ms ease-out
- Check icon: scale 0 → 1, spring snappy (stiffness=300, damping=20), 200ms
- Check icon draw: SVG stroke-dashoffset animation, 200ms ease-out
- Indeterminate dash: fade in, 150ms

## Accessibility

- Renders `<input type="checkbox">` on web (native, accessible by default)
- `role="checkbox"`, `aria-checked` on native
- Label is clickable, linked via `htmlFor`/`nativeID`
- Keyboard: Space to toggle

## Usage

```tsx
<Checkbox.Root checked={checked} onCheckedChange={setChecked}>
  <Checkbox.Indicator />
  <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
</Checkbox.Root>
```
