# DatePicker

> **Headless hook:** `useDatePicker`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Select a date or date range from a calendar popover. Supports single date, date range, multiple dates, month/year pickers, min/max constraints, disabled dates, and locale-aware formatting. Built on `@internationalized/date`.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `DateValue \| DateRange` | — | Controlled value |
| `onValueChange` | `(value) => void` | — | Change handler |
| `mode` | `"single" \| "range" \| "multiple"` | `"single"` | Selection mode |
| `minValue` | `DateValue` | — | Earliest selectable date |
| `maxValue` | `DateValue` | — | Latest selectable date |
| `isDateDisabled` | `(date: DateValue) => boolean` | — | Custom disable logic |
| `locale` | `string` | system | Locale for formatting |
| `firstDayOfWeek` | `0 \| 1 \| ... \| 6` | locale default | Week start day |
| `showWeekNumbers` | `boolean` | `false` | ISO week numbers |
| `inline` | `boolean` | `false` | Always-visible calendar (no popover) |

## Motion

- Popover open: same as Select (fade + slide, 200ms ease-out)
- Day hover: background highlight, 100ms ease-out
- Day select: subtle scale pulse + background transition, 150ms spring
- Month/year switch: slide transition, 250ms ease-out (direction-aware)

## Accessibility

- Input trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="dialog"`
- Calendar: `role="application"`, `aria-label="Calendar"`
- Day button: `aria-selected`, `aria-label="{day} {month} {year}"`, `aria-disabled`
- Keyboard: Arrow keys navigate days, PageUp/PageDown for months, Home/End for week

## Usage

```tsx
<DatePicker.Root
  mode="range"
  value={dateRange}
  onValueChange={setDateRange}
  minValue={today()}
>
  <DatePicker.Label>Stay dates</DatePicker.Label>
  <DatePicker.Trigger>
    <DatePicker.Value />
    <DatePicker.Indicator><CalendarIcon /></DatePicker.Indicator>
  </DatePicker.Trigger>
  <DatePicker.Popup>
    <DatePicker.Calendar />
  </DatePicker.Popup>
</DatePicker.Root>
```
