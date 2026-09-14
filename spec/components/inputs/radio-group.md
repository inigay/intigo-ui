# Radio Group

> **Headless hook:** `useRadioGroup`  
> **Web primitive:** `RadioGroup` (renders `<fieldset>` + `<input type="radio">`)  
> **Native primitive:** `RadioGroup` (renders `<View>` + `<Pressable>` items)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Select one option from a mutually exclusive set. Always used as a group.

## Anatomy

```
┌─────────────────────┐
│ Legend / Label      │  ← RadioGroup.Label
│                     │
│ ◉ Option A          │  ← RadioGroup.Item
│ ○ Option B          │
│ ○ Option C          │
│                     │
│ Error message       │  ← RadioGroup.Description
└─────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `RadioGroup.Root` | Yes | Group container. Manages selected value. |
| `RadioGroup.Label` | No | Group legend. |
| `RadioGroup.Item` | Yes | Individual radio option. |
| `RadioGroup.Indicator` | No | The filled circle. |
| `RadioGroup.ItemLabel` | No | Option text. |
| `RadioGroup.Description` | No | Error or help text. |

## API

### `RadioGroup.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Initial value |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Disable all items |
| `required` | `boolean` | `false` | Required field |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout direction |
| `invalid` | `boolean` | `false` | Error state |

### `RadioGroup.Item`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Value for this option |
| `disabled` | `boolean` | `false` | Disable this item |

## Motion

**Default preset `radio.select`:**
- Indicator scale: 0 → 1, spring snappy, 200ms
- Indicator color: fill transition, 150ms ease-out
- Hover ring: subtle background highlight on item

## Accessibility

- `role="radiogroup"` on root, `aria-labelledby` → label
- `role="radio"`, `aria-checked` on each item
- Keyboard: Arrow keys navigate between items, Tab enters/exits the group

## Usage

```tsx
<RadioGroup.Root value={plan} onValueChange={setPlan}>
  <RadioGroup.Label>Select a plan</RadioGroup.Label>
  <RadioGroup.Item value="starter">
    <RadioGroup.Indicator />
    <RadioGroup.ItemLabel>Starter — $10/mo</RadioGroup.ItemLabel>
  </RadioGroup.Item>
  <RadioGroup.Item value="pro">
    <RadioGroup.Indicator />
    <RadioGroup.ItemLabel>Pro — $30/mo</RadioGroup.ItemLabel>
  </RadioGroup.Item>
</RadioGroup.Root>
```
