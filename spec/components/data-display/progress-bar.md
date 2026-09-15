# ProgressBar

> **Headless hook:** `useProgressBar`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Horizontal bar indicating completion progress. Supports determinate (known %) and indeterminate (unknown duration) modes. Shows percentage label and customizable color stops.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Progress (0-100). Omit for indeterminate. |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `showValue` | `boolean` | `false` | Show percentage label |
| `formatValue` | `(value: number) => string` | `"{value}%"` | Custom label format |
| `color` | `"primary" \| "success" \| "warning"` | `"primary"` | Fill color |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height preset |

## Motion

- Determinate: fill width transition, 400ms ease-out
- Indeterminate: shimmer bar slides left-to-right, 1.5s infinite loop, ease-in-out
- Value label: number count-up animation (optional)

## Accessibility

- `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Indeterminate: omit `aria-valuenow`, `aria-valuetext="Loading..."`
- Value label: `aria-valuetext="{N}% complete"`

## Usage

```tsx
<ProgressBar.Root value={75} showValue color="success" />
<ProgressBar.Root /> {/* indeterminate */}
```
