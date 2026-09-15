# ListBox

> **Headless hook:** `useListBox`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

A scrollable list of selectable options. Unlike Select, the list is always visible. Supports single select, multi-select with checkboxes, sections with headers, drag-to-reorder, and virtual scrolling.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| string[]` | — | Controlled selected value(s) |
| `onValueChange` | `(value) => void` | — | Change handler |
| `options` | `Option[]` | **required** | List items |
| `selectionMode` | `"single" \| "multiple" \| "none"` | `"single"` | Selection behavior |
| `virtualScroll` | `boolean` | `false` | Virtualize for large lists |
| `dragToReorder` | `boolean` | `false` | Enable drag reorder (web + native) |
| `emptyMessage` | `string` | `"No items."` | Empty state text |

## Motion

- Option hover: background highlight, 100ms ease-out
- Selection: check icon draw + background transition, 200ms
- Drag reorder: item lift (scale 1.02 + shadow) + siblings slide to fill gap, spring
- Empty state: fade in, 300ms

## Accessibility

- `role="listbox"`, `aria-multiselectable` when multiple
- Option: `role="option"`, `aria-selected`, `aria-disabled`
- Section header: `role="presentation"` or `role="group"` with `aria-label`
- Keyboard: Arrow keys navigate, Space toggles selection, Ctrl+A select all, Shift+Click range select

## Usage

```tsx
<ListBox.Root
  options={users}
  selectionMode="multiple"
  value={selected}
  onValueChange={setSelected}
>
  <ListBox.Section label="Admins">
    {/* options rendered here */}
  </ListBox.Section>
  <ListBox.Empty>No users found.</ListBox.Empty>
</ListBox.Root>
```
