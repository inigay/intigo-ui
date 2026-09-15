# Loading Spinner

> **Headless hook:** none (presentational)  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Animated loading indicator. Supports determinate (circular progress) and indeterminate (spinning) modes. Sizes from xs to xl. Customizable color and stroke width.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Diameter |
| `value` | `number` | — | Progress 0-100 (determinate mode) |
| `color` | `string` | `"currentColor"` | Stroke color |
| `strokeWidth` | `number` | `2` | Circle stroke width in px |
| `label` | `string` | — | Accessible label |

## Motion

- Indeterminate: continuous rotation, 1s linear infinite
- Determinate: stroke-dashoffset transition, 400ms ease-out
- Both use SVG animation (not CSS transforms, for sub-pixel precision)

## Accessibility

- `role="progressbar"` (determinate) or `role="img"` (indeterminate)
- `aria-label="{label}"` or `aria-label="Loading"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` when determinate
- `aria-busy="true"` on parent container

## Usage

```tsx
<Spinner />                                    {/* indeterminate */}
<Spinner value={65} label="Uploading..." />     {/* determinate */}
<Spinner size="sm" color="var(--color-primary)" />
```
