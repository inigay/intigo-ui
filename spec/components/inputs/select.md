# Select / Dropdown

> **Headless hook:** `useSelect`  
> **Web primitive:** `Select` (renders `<button>` + `<ul>` popover)  
> **Native primitive:** `Select` (renders `<Pressable>` + `<Modal>` or native picker)  
> **Priority:** P0  
> **Status:** 🔴 Not started

---

## Overview

Select one or more options from a list. Supports single-select, multi-select, search/filter, option groups, custom option rendering, async loading, and virtual scrolling for large lists.

---

## Anatomy

```
┌─────────────────────────────────┐
│  Label                          │
│  ┌────────────────────────────┐ │  ← Select.Trigger
│  │ Selected value       ▼     │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌────────────────────────────┐ │  ← Select.Popup (portal)
│  │ 🔍 Search...               │ │  ← Select.Search (optional)
│  │ ┌────────────────────────┐ │ │
│  │ │ Option A               │ │ │  ← Select.Option
│  │ │ Option B          ✓    │ │ │  ← Select.Option (selected)
│  │ │ Option C               │ │ │
│  │ │ ── Group Label ──      │ │ │  ← Select.Group
│  │ │ Option D               │ │ │
│  │ └────────────────────────┘ │ │
│  └────────────────────────────┘ │
└─────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Select.Root` | Yes | State container. Holds value, open state, options. |
| `Select.Label` | No | Accessible label. |
| `Select.Trigger` | Yes | The clickable button that opens the list. |
| `Select.Value` | No | Renders the selected value. Defaults to option label. |
| `Select.Indicator` | No | Chevron/arrow icon. Animates on open. |
| `Select.Popup` | Yes | The dropdown list container (portaled). |
| `Select.Search` | No | Filter input inside the popup. |
| `Select.List` | Yes | Scrollable list of options. |
| `Select.Option` | — | Individual option (rendered inside List). |
| `Select.Group` | No | Option group with label. |
| `Select.Empty` | No | Shown when no options match filter. |
| `Select.ClearButton` | No | Clears selection. |

---

## API

### `Select.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `T \| T[]` | — | Controlled selected value(s) |
| `defaultValue` | `T \| T[]` | — | Initial value |
| `onValueChange` | `(value: T \| T[]) => void` | — | Change handler |
| `multiple` | `boolean` | `false` | Enable multi-select |
| `options` | `Option[]` | — | Array of options |
| `optionLabel` | `string` | `"label"` | Key for display text |
| `optionValue` | `string` | `"value"` | Key for value |
| `optionDisabled` | `string` | `"disabled"` | Key for disabled state |
| `placeholder` | `string` | `"Select..."` | Shown when no value selected |
| `disabled` | `boolean` | `false` | Disable the select |
| `invalid` | `boolean` | `false` | Error state |
| `required` | `boolean` | `false` | Required indicator |
| `searchable` | `boolean` | `false` | Show search input in popup |
| `clearable` | `boolean` | `false` | Show clear button |
| `loading` | `boolean` | `false` | Async loading state |
| `virtualScroll` | `boolean` | `false` | Enable virtual scrolling for large lists |
| `side` | `"top" \| "bottom" \| "auto"` | `"auto"` | Popup placement |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Popup alignment |
| `motion` | `MotionConfig \| false` | preset | Override or disable animations |

---

## States

| State | Visual |
|---|---|
| **Closed** | Trigger shows selected value or placeholder |
| **Open** | Popup visible, chevron rotated 180°, focus moves to first option |
| **Focused** | Trigger has focus ring |
| **Hover (option)** | Option background highlight |
| **Selected** | Checkmark on option, value in trigger |
| **Disabled** | 50% opacity, not interactive |
| **Invalid** | Red border on trigger |
| **Loading** | Spinner in popup |
| **Empty** | "No results" message in popup |

---

## Motion

### Default preset: `select.open`

```
chevron: rotate 0 → 180°, 200ms spring
popup: opacity 0 → 1 + translateY -4px → 0, 200ms ease-out
options: stagger children, 30ms delay per option, fade + slide from top
```

### Multi-select tag animation

```
tag enter: scale 0 → 1, spring snappy, 150ms
tag exit: scale 1 → 0, 100ms ease-in
```

---

## Accessibility

- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`
- Popup: `role="listbox"`
- Option: `role="option"`, `aria-selected`
- Search: `role="searchbox"`, filters options live
- Keyboard: Arrow keys navigate options, Enter selects, Escape closes, type-to-search
- Focus trap inside popup when open
- Focus returns to trigger on close

---

## Multi-Select Behavior

When `multiple={true}`:
- Trigger shows count: "3 selected" or tag chips
- Each selected option shows a checkmark
- Clicking a selected option deselects it
- "Select all" / "Clear all" actions in popup header
- Tags animate in/out individually

---

## Cross-Platform Notes

- **Web:** Popup uses Popper/floating-ui for positioning. Portal to body. Virtual scroll via @tanstack/virtual.
- **Native:** Popup renders in a `<Modal>` or bottom sheet. On iOS, optionally uses native picker for simple selects. Virtual scroll via FlashList.
- **Search:** On web, auto-focuses the search input when popup opens. On native, shows keyboard.
