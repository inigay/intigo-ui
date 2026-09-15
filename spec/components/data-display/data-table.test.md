# DataTable — Test Specification

> **Source spec:** `data-table.md`  
> **Component:** DataTable (sorting, filtering, pagination, selection, resizing, virtual scroll)

---

## E2E Tests

### Core rendering
- [ ] Table renders semantic `<table>` with `<thead>`, `<tbody>`, `<th>`, `<td>` on web
- [ ] Columns render with correct headers from column definitions
- [ ] Data rows render correct cell values
- [ ] Empty state shows `emptyMessage` when `data` is empty array
- [ ] Loading state shows skeleton/shimmer rows when `loading={true}`

### Sorting
- [ ] Clicking a sortable column header toggles sort direction (asc → desc → none)
- [ ] Sort indicator (arrow) rotates on direction change (200ms transition)
- [ ] `aria-sort` attribute updates on sort change
- [ ] `sortable={false}` disables sorting on all columns
- [ ] Controlled `sorting` + `onSortingChange` work correctly

### Pagination
- [ ] Pagination controls render: prev/next buttons, page numbers
- [ ] Clicking page number navigates to that page
- [ ] Row count display shows correct range (e.g., "1-25 of 100")
- [ ] Controlled `pagination` + `onPaginationChange` work
- [ ] Page change triggers row crossfade animation (200ms)

### Row selection
- [ ] `selectable={true}` shows checkbox column
- [ ] Clicking row checkbox selects/deselects the row
- [ ] Select-all checkbox in header selects/deselects all rows on current page
- [ ] Controlled `rowSelection` + `onRowSelectionChange` work
- [ ] Selected rows show highlight background

### Column resizing
- [ ] `resizable={true}` shows drag handles on column borders
- [ ] Dragging a column resize handle changes column width
- [ ] Minimum column width is respected

### Virtual scrolling
- [ ] `virtualScroll={true}` renders only visible rows for large datasets
- [ ] Scrolling through virtual list maintains correct row order
- [ ] Row height is consistent in virtual mode

### Toolbar
- [ ] DataTable.Toolbar renders above the table
- [ ] Search input in toolbar filters rows (client-side or server-side)
- [ ] Bulk action buttons in toolbar work with row selection

---

## Integration Tests

### With other components
- [ ] DataTable cells can contain Badge, Button, Tag, Avatar components
- [ ] DataTable inside a Card renders correctly with proper overflow handling
- [ ] DataTable with Combobox/Select for column visibility toggle works
- [ ] DataTable toolbar with Input search integrates correctly
- [ ] DataTable pagination with Select for page size works

### Data flow
- [ ] Async data loading: loading state → data state → empty state transitions
- [ ] Sorting triggers `onSortingChange` callback with correct state
- [ ] Pagination triggers `onPaginationChange` callback
- [ ] Row selection triggers `onRowSelectionChange` callback

### Cross-platform
- [ ] Web: native `<table>`, sticky header via `position: sticky`
- [ ] Native: flexbox-based row layout, horizontal scroll for wide tables
- [ ] Native: swipe actions on rows, pull to refresh
- [ ] Virtual scroll: `@tanstack/virtual` on web, `FlashList` on native

---

## Accessibility Tests

- [ ] Semantic `<table>` structure: `<thead>`, `<tbody>`, `<th>`, `<td>`
- [ ] Column headers have `aria-sort` (ascending/descending/none)
- [ ] Sortable columns have `role="button"`, `tabIndex={0}`
- [ ] Selectable rows have accessible checkbox with row `aria-label`
- [ ] Pagination has `role="navigation"`, `aria-label="Pagination"`
- [ ] Empty state has `role="status"`
- [ ] Keyboard navigation: Tab through interactive cells
- [ ] Enter/Space to sort or select
- [ ] Screen reader announces sort direction changes
- [ ] Screen reader announces row selection state
- [ ] Screen reader announces page changes
- [ ] Focus order is logical: toolbar → table header → rows → pagination

---

## Visual Regression

- [ ] All size presets (`sm`, `md`, `lg`) render correct row density
- [ ] Sticky header remains fixed during scroll
- [ ] Column resize cursor appears on drag handles
- [ ] Row hover highlight is visible and consistent
- [ ] Selected row background is distinguishable
- [ ] Sort indicator animation is smooth (200ms)
- [ ] Pagination change crossfade is smooth (200ms)
- [ ] Loading skeleton matches table column layout
