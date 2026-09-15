# Slider

> **Headless hook:** `useSlider`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Select a numeric value or range by dragging a thumb along a track. Supports single thumb, range (two thumbs), marks, steps, and value labels.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| [number, number]` | — | Controlled value(s) |
| `onValueChange` | `(value) => void` | — | Change handler |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `marks` | `{ [value: number]: string \| ReactNode }` | — | Labeled tick marks |
| `disabled` | `boolean` | `false` | Disabled |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |

## Motion

- Thumb drag: real-time tracking (no animation during drag)
- Thumb release: spring to nearest step value, spring gentle, 200ms
- Track fill: width/height transition matching thumb position
- Thumb hover: scale 1 → 1.1, 150ms ease-out
- Value label: fade in on drag, fade out on release

## Accessibility

- `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- Keyboard: Arrow keys adjust value by step. Home/End for min/max. PageUp/PageDown for 10x step.

## Usage

```tsx
<Slider.Root
  value={[20, 80]}
  onValueChange={setRange}
  min={0}
  max={100}
  step={5}
  marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }}
/>
```
