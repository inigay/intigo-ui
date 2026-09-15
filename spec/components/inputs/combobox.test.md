# Combobox / Autocomplete — Test Specification

> **Source spec:** `combobox.md`  
> **Component:** Combobox (input + filtered list; async loading; free-text entry)

---

## E2E Tests

### Core behavior
- [ ] Typing in the input filters the options list
- [ ] Filtered list appears as a popup below the input
- [ ] Selecting an option sets the value and closes the popup
- [ ] Clicking the indicator (chevron) opens the full list
- [ ] Clicking outside closes the popup
- [ ] Escape key closes the popup

### Parts
- [ ] `Combobox.Label` renders accessible label
- [ ] `Combobox.Input` renders the text input field
- [ ] `Combobox.Indicator` renders chevron/arrow toggle
- [ ] `Combobox.Popup` renders the filtered list (portaled)
- [ ] `Combobox.List` renders scrollable list of options
- [ ] `Combobox.Option` renders individual option items
- [ ] `Combobox.Empty` renders "No results" message
- [ ] `Combobox.ClearButton` clears input and selection

### Filtering
- [ ] Default fuzzy match filter function works
- [ ] Custom `filterFn` is used when provided
- [ ] Filtering is case-insensitive
- [ ] No results shows `Combobox.Empty` content

### Async loading
- [ ] `options` as async function: loading state shown while fetching
- [ ] Results render when promise resolves
- [ ] `loading={true}` shows loading spinner in popup
- [ ] Error state if async fetch fails

### Free-text entry
- [ ] `allowCustomValue={true}` allows entering a value not in options
- [ ] Custom value is returned via `onValueChange`
- [ ] `allowCustomValue={false}` requires selecting from options

### Controlled/uncontrolled
- [ ] `value` + `onValueChange` (controlled) work correctly
- [ ] `inputValue` + `onInputValueChange` (controlled input text) work
- [ ] Uncontrolled usage with `defaultValue` works

### Motion
- [ ] Popup: opacity + translateY entrance, 200ms ease-out
- [ ] Options: stagger children, 20ms per option
- [ ] Loading: skeleton shimmer in popup

---

## Integration Tests

### With forms
- [ ] Combobox inside a form submits selected value
- [ ] Required combobox shows validation error when empty
- [ ] Combobox with custom value submits free-text value

### With other components
- [ ] Combobox option with Avatar renders correctly
- [ ] Combobox inside a DataTable toolbar for column filtering
- [ ] Combobox inside a Dialog for search-and-select workflows
- [ ] Combobox with Tag for multi-select patterns

### Data flow
- [ ] Debounced search: rapid typing doesn't flood async requests
- [ ] Stale response handling: old async results don't overwrite newer ones
- [ ] Keyboard selection updates both `value` and `inputValue`

---

## Accessibility Tests

- [ ] Input: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`
- [ ] Input has `aria-controls` pointing to list ID
- [ ] List: `role="listbox"`
- [ ] Option: `role="option"`, `aria-selected`
- [ ] Keyboard: Arrow keys navigate filtered list
- [ ] Keyboard: Enter selects highlighted option
- [ ] Keyboard: Escape closes popup, restores previous value
- [ ] Screen reader announces "N results available" on filter
- [ ] Focus moves to first option when popup opens
- [ ] Focus returns to input when popup closes
- [ ] Label is linked to input via `htmlFor`/`nativeID`
- [ ] Clear button has `aria-label="Clear selection"`

---

## Visual Regression

- [ ] Popup is positioned correctly below/above input
- [ ] Popup width matches input width
- [ ] Option hover highlight is visible
- [ ] Selected option shows checkmark
- [ ] Loading spinner is centered in popup
- [ ] Empty state message is centered
- [ ] Popup scrolls when options exceed max height
- [ ] Clear button appears only when value is non-empty
