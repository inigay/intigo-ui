# Tag / Chip

> **Headless hook:** `useTag`  
> **Web primitive:** `Tag` (renders `<span>`)  
> **Native primitive:** `Tag` (renders `<View>` + `<Text>`)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Compact element representing a category, filter, or attribute. Supports dismissible variant with animated removal, selectable state, icon, and avatar.

## Anatomy

```
┌──────────────────┐
│ [icon] Label [✕] │  ← Tag.Root
└──────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Tag.Root` | Yes | Container. |
| `Tag.Icon` | No | Leading icon. |
| `Tag.Label` | Yes | Text content. |
| `Tag.Close` | No | Dismiss button. |

## API

### `Tag.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"filled" \| "outlined" \| "soft"` | `"filled"` | Visual style |
| `color` | `"primary" \| "success" \| "destructive" \| "warning" \| "neutral"` | `"neutral"` | Color preset |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset |
| `selectable` | `boolean` | `false` | Toggle selected state |
| `selected` | `boolean` | — | Controlled selected state |
| `onSelectedChange` | `(selected: boolean) => void` | — | Selection handler |
| `dismissible` | `boolean` | `false` | Show close button |
| `onDismiss` | `() => void` | — | Dismiss handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default presets:**
- **Dismiss:** scale 1 → 0 + fade out, 150ms ease-in. Sibling tags slide to fill gap.
- **Select:** background color + border transition, 200ms ease-out. Check icon fade in.
- **Enter (in a group):** scale 0 → 1 + fade, stagger 50ms, spring snappy

## Accessibility

- Dismiss button: `aria-label="Remove {label}"`
- Selectable: `role="checkbox"` or `role="button"`, `aria-pressed`
- Keyboard: Backspace/Delete to dismiss, Enter/Space to select

## Usage

```tsx
// Static tag
<Tag.Root color="primary">
  <Tag.Label>React</Tag.Label>
</Tag.Root>

// Dismissible
<Tag.Root dismissible onDismiss={() => removeTag('react')}>
  <Tag.Icon><ReactIcon /></Tag.Icon>
  <Tag.Label>React</Tag.Label>
  <Tag.Close />
</Tag.Root>

// Selectable (filter chips)
<Tag.Root selectable selected={filters.react} onSelectedChange={(v) => toggleFilter('react', v)}>
  <Tag.Label>React</Tag.Label>
</Tag.Root>
```
