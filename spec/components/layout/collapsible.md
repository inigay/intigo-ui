# Collapsible

> **Headless hook:** `useCollapsible`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Show/hide content with animated height. Lighter than Accordion — no section grouping, no open/close management. Use for expandable sections, "Show more" toggles, filter panels.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Disabled |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Parts

| Part | Required | Description |
|---|---|---|
| `Collapsible.Root` | Yes | State container |
| `Collapsible.Trigger` | Yes | Toggle button |
| `Collapsible.Content` | Yes | Animated height container |

## Motion

- Open: height 0 → auto, spring gentle (stiffness=100, damping=20), 300ms. Content fades in after 50ms delay.
- Close: height auto → 0, 200ms ease-in. Content fades out immediately.

## Accessibility

- Trigger: `aria-expanded`, `aria-controls` → content id
- Content: `role="region"`, `aria-labelledby` → trigger id

## Usage

```tsx
<Collapsible.Root open={showFilters} onOpenChange={setShowFilters}>
  <Collapsible.Trigger>
    {showFilters ? 'Hide filters' : 'Show filters'}
    <ChevronIcon className={showFilters ? 'rotated' : ''} />
  </Collapsible.Trigger>
  <Collapsible.Content>
    {/* Filter controls */}
  </Collapsible.Content>
</Collapsible.Root>
```
