# Select / Dropdown — Test Specification

> **Source spec:** `select.md`  
> **Component:** Select (single/multi-select; searchable; option groups; async loading; virtual scroll)

---

## E2E Tests

### Core behavior
- [ ] Clicking trigger opens the popup with options list
- [ ] Clicking an option selects it and closes the popup
- [ ] Selected value is displayed in the trigger
- [ ] Placeholder shows when no value is selected
- [ ] Clicking outside closes the popup
- [ ] Escape key closes the popup

### Single select
- [ ] Selecting an option sets the value
- [ ] Selecting a different option replaces the value
- [ ] Checkmark appears next to the selected option
- [ ] `clearable={true}` shows clear button; clicking it clears selection

### Multi-select
- [ ] `multiple={true}` allows selecting multiple options
- [ ] Trigger shows count: "N selected" or tag chips
- [ ] Each selected option shows a checkmark
- [ ] Clicking a selected option deselects it
- [ ] "Select all" / "Clear all" actions available
- [ ] Tags animate in/out individually (scale 0 → 1 / 1 → 0)

### Search/filter
- [ ] `searchable={true}` shows search input in popup
- [ ] Typing in search filters the options list
- [ ] `Select.Empty` renders when no options match filter
- [ ] Search input auto-focuses when popup opens (web)

### Option groups
- [ ] `Select.Group` renders a group with label
- [ ] Group label is non-selectable
- [ ] Options within groups are selectable

### Async loading
- [ ] `loading={true}` shows spinner in popup
- [ ] Options render when async data loads
- [ ] Popup stays open during loading (if already open)

### Virtual scroll
- [ ] `virtualScroll={true}` renders only visible options
- [ ] Scrolling through large list loads more options
- [ ] Keyboard navigation works with virtual scrolling

### States
- [ ] **Closed:** trigger shows selected value or placeholder
- [ ] **Open:** popup visible, chevron rotated 180°, focus on first option
- [ ] **Focused:** trigger has focus ring
- [ ] **Hover (option):** option background highlight
- [ ] **Disabled:** 50% opacity, not interactive
- [ ] **Invalid:** red border on trigger
- [ ] **Loading:** spinner in popup
- [ ] **Empty:** "No results" message

### Motion
- [ ] Chevron: rotate 0 → 180°, 200ms spring
- [ ] Popup: opacity 0 → 1 + translateY -4px → 0, 200ms ease-out
- [ ] Options: stagger children, 30ms delay per option
- [ ] Multi-select tags: enter (scale 0 → 1) and exit (scale 1 → 0) animations
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With forms
- [ ] Select inside a form submits selected value(s)
- [ ] Required Select triggers form validation
- [ ] Multi-select submits array of values
- [ ] Form reset clears selection

### With other components
- [ ] Select options with Avatar + text render correctly
- [ ] Select options with Tag or Badge render correctly
- [ ] Select inside a DataTable toolbar (page size selector) works
- [ ] Select inside a Dialog for settings
- [ ] Select.Trigger with Input.Leading for composed inputs

### Positioning
- [ ] Popup positions below trigger by default
- [ ] `side="top"` positions above trigger
- [ ] `side="auto"` flips when insufficient space below
- [ ] `align="start"` / `"center"` / `"end"` aligns correctly
- [ ] Popup stays within viewport boundaries

---

## Accessibility Tests

- [ ] Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`
- [ ] Popup: `role="listbox"`
- [ ] Option: `role="option"`, `aria-selected`
- [ ] Search input: `role="searchbox"`
- [ ] Keyboard: Arrow keys navigate options
- [ ] Keyboard: Enter selects highlighted option
- [ ] Keyboard: Escape closes popup
- [ ] Keyboard: Type-to-search (typing letter jumps to matching option)
- [ ] Focus trap inside popup when open
- [ ] Focus returns to trigger on close
- [ ] Multi-select: selected count is announced
- [ ] Option groups: group label is announced
- [ ] Disabled options have `aria-disabled="true"`
- [ ] Label is linked to trigger via `htmlFor`/`nativeID`
- [ ] Clear button has `aria-label="Clear selection"`

---

## Visual Regression

- [ ] Popup is positioned correctly relative to trigger
- [ ] Popup width matches or exceeds trigger width
- [ ] Option hover highlight is visible
- [ ] Selected option checkmark is visible
- [ ] Scrollbar appears when options exceed max height
- [ ] Chevron rotation animation is smooth
- [ ] Multi-select tags wrap correctly in trigger
- [ ] Group label is visually distinct from options
- [ ] Empty state message is centered
- [ ] Loading spinner is centered in popup
