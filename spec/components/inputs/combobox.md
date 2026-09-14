# Combobox / Autocomplete

> **Headless hook:** `useCombobox`  
> **Web primitive:** `Combobox` (input + filtered list popover)  
> **Native primitive:** `Combobox` (input + filtered list modal)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

A select with search. Users type to filter a list of options, then select one. Combines Input and Select behavior. Supports async data loading, custom option rendering, and free-text entry.

## Anatomy

```
┌─────────────────────────────────┐
│  Label                          │
│  ┌────────────────────────────┐ │  ← Combobox.Trigger
│  │ Type to search...      ▼   │ │  ← Combobox.Input + Indicator
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │  ← Combobox.Popup
│  │ Result A                   │ │
│  │ Result B              ✓    │ │
│  │ No results found           │ │  ← Combobox.Empty
│  └────────────────────────────┘ │
└─────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Combobox.Root` | Yes | State container. |
| `Combobox.Label` | No | Accessible label. |
| `Combobox.Input` | Yes | The text input. |
| `Combobox.Indicator` | No | Chevron/arrow toggle. |
| `Combobox.Popup` | Yes | Filtered list (portaled). |
| `Combobox.List` | Yes | Scrollable list. |
| `Combobox.Option` | — | Individual option. |
| `Combobox.Empty` | No | Shown when no results. |
| `Combobox.ClearButton` | No | Clears input + selection. |

## API

### `Combobox.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `T` | — | Controlled selected value |
| `onValueChange` | `(value: T) => void` | — | Selection handler |
| `inputValue` | `string` | — | Controlled input text |
| `onInputValueChange` | `(value: string) => void` | — | Input change handler |
| `options` | `Option[] \| (query: string) => Promise<Option[]>` | — | Static or async options |
| `filterFn` | `(option: Option, query: string) => boolean` | fuzzy match | Custom filter |
| `loading` | `boolean` | `false` | Async loading state |
| `allowCustomValue` | `boolean` | `false` | Allow free-text entry |
| `placeholder` | `string` | `"Search..."` | Input placeholder |
| `disabled` | `boolean` | `false` | Disabled state |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default preset `combobox.open`:**
- Popup: same as Select (opacity + translateY, 200ms ease-out)
- Options: stagger children, 20ms per option
- Loading: skeleton shimmer in popup

## Accessibility

- Input: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-controls` → list
- List: `role="listbox"`
- Option: `role="option"`, `aria-selected`
- Keyboard: Arrow keys navigate filtered list, Enter selects, Escape closes
- Announces "N results available" on filter

## Usage

```tsx
<Combobox.Root
  options={async (query) => searchUsers(query)}
  onValueChange={setSelectedUser}
  placeholder="Search users..."
>
  <Combobox.Label>Assign to</Combobox.Label>
  <Combobox.Input />
  <Combobox.Popup>
    <Combobox.List>
      {(option) => (
        <Combobox.Option value={option}>
          <Avatar src={option.avatar} size="sm" />
          <span>{option.name}</span>
        </Combobox.Option>
      )}
    </Combobox.List>
    <Combobox.Empty>No users found.</Combobox.Empty>
  </Combobox.Popup>
</Combobox.Root>
```
