# Tooltip

> **Headless hook:** `useTooltip`  
> **Web primitive:** `Tooltip` (renders floating label on hover/focus)  
> **Native primitive:** `Tooltip` (renders overlay on long press)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

A small floating label that appears on hover (web) or long press (native) to provide additional context. For icon-only buttons, truncated text, or supplementary information.

## Anatomy

```
┌──────────────────────┐
│  [Trigger Element]   │
│    ┌──────────┐      │  ← Tooltip.Content
│    │ Tooltip  │      │
│    └──────────┘      │
└──────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Tooltip.Root` | Yes | State container with delay config. |
| `Tooltip.Trigger` | Yes | The element that triggers the tooltip. |
| `Tooltip.Content` | Yes | The tooltip label. |
| `Tooltip.Arrow` | No | Pointer arrow. |

## API

### `Tooltip.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string \| ReactNode` | **required** | Tooltip content |
| `delay` | `number` | `500` | Show delay in ms |
| `closeDelay` | `number` | `0` | Hide delay in ms |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Preferred placement |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment |
| `offset` | `number` | `6` | Distance from trigger |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default preset `tooltip.show`:**
- Enter: opacity 0 → 1, translateY 4px → 0, 200ms ease-out, delayed by `delay` prop
- Exit: opacity 1 → 0, translateY 0 → 2px, 100ms ease-in (no delay)
- Does NOT scale (tooltips that scale feel bouncy and imprecise)

## Accessibility

- Trigger: `aria-describedby` → tooltip id
- Content: `role="tooltip"`
- Tooltip content is NOT focusable
- Does NOT show on focus (keyboard users don't get tooltips — use a proper label instead)
- On touch devices: shows on long press (500ms), dismisses on scroll or touch outside

## Usage

```tsx
<Tooltip.Root content="Copy to clipboard" side="bottom">
  <Tooltip.Trigger>
    <Button.Root variant="ghost" size="sm" aria-label="Copy">
      <Button.Icon><CopyIcon /></Button.Icon>
    </Button.Root>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Copy to clipboard
    <Tooltip.Arrow />
  </Tooltip.Content>
</Tooltip.Root>
```
