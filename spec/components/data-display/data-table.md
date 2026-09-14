# DataTable

> **Headless hook:** `useDataTable`  
> **Web primitive:** `DataTable` (renders `<table>`)  
> **Native primitive:** `DataTable` (renders `<ScrollView>` + rows)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Feature-rich data table with sorting, filtering, pagination, row selection, column resizing, column visibility, and virtual scrolling. The most complex component in the library. Built on `@tanstack/table` for headless table logic.

## Anatomy

```
┌──────────────────────────────────────────────┐
│  Toolbar (search, filters, actions)           │  ← DataTable.Toolbar
├──────────────────────────────────────────────┤
│  ┌─────────┬──────────┬──────────┬────────┐  │
│  │ Name  ▲ │ Status   │ Date  ▼  │        │  │  ← DataTable.Header
│  ├─────────┼──────────┼──────────┼────────┤  │
│  │ Alice   │ Active   │ Jan 12   │ [···]  │  │  ← DataTable.Row
│  │ Bob     │ Inactive │ Feb 3    │ [···]  │  │
│  │ Carol   │ Active   │ Mar 18   │ [···]  │  │
│  ├─────────┼──────────┼──────────┼────────┤  │
│  │ ◀ 1 2 3 ... 10 ▶  │ 25 rows  │        │  │  ← DataTable.Pagination
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `DataTable.Root` | Yes | State container. Holds columns, data, selection, sorting, etc. |
| `DataTable.Toolbar` | No | Search, filter, bulk action bar. |
| `DataTable.Table` | Yes | The table element. |
| `DataTable.Header` | Yes | Column headers. Clickable for sort. |
| `DataTable.Column` | — | Individual header cell. |
| `DataTable.Body` | Yes | Row container. |
| `DataTable.Row` | — | Data row. Supports selection highlight. |
| `DataTable.Cell` | — | Data cell. |
| `DataTable.Footer` | No | Summary row. |
| `DataTable.Pagination` | No | Page controls. |
| `DataTable.Empty` | No | Shown when no data. |
| `DataTable.Loading` | No | Shown during async load. |
| `DataTable.ColumnResizer` | No | Drag handle to resize columns. |

## API

### `DataTable.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `T[]` | **required** | Row data |
| `columns` | `ColumnDef<T>[]` | **required** | Column definitions (TanStack Table format) |
| `sorting` | `SortingState` | — | Controlled sort state |
| `onSortingChange` | `(sorting: SortingState) => void` | — | Sort handler |
| `pagination` | `PaginationState` | — | Controlled pagination |
| `onPaginationChange` | `(pagination: PaginationState) => void` | — | Pagination handler |
| `rowSelection` | `RowSelectionState` | — | Controlled row selection |
| `onRowSelectionChange` | `(selection: RowSelectionState) => void` | — | Selection handler |
| `selectable` | `boolean` | `false` | Show checkbox column |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `resizable` | `boolean` | `false` | Enable column resizing |
| `loading` | `boolean` | `false` | Loading state |
| `emptyMessage` | `string` | `"No results found."` | Empty state text |
| `virtualScroll` | `boolean` | `false` | Virtual scrolling for large datasets |
| `stickyHeader` | `boolean` | `true` | Sticky column headers |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Row density |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default presets:**
- **Row hover:** background highlight, 150ms ease-out
- **Sort indicator:** arrow rotate + color transition, 200ms ease-out
- **Row enter (new data):** fade + slight slide down, stagger 30ms per row
- **Loading:** skeleton shimmer rows
- **Selection:** checkbox toggle animation (see Checkbox spec)
- **Pagination change:** row crossfade, 200ms

## Column Definition (TanStack Table format)

```ts
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    sortable: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => <Badge variant="label">{info.getValue()}</Badge>,
  },
  {
    id: 'actions',
    header: '',
    cell: () => <Button.Root size="sm" variant="ghost">Edit</Button.Root>,
    size: 80,
  },
];
```

## Accessibility

- Renders semantic `<table>` with `<thead>`, `<tbody>`, `<th>`, `<td>` on web
- Column headers: `aria-sort` (ascending/descending/none)
- Selectable rows: checkbox with row aria-label
- Sortable columns: `role="button"`, `tabIndex={0}`
- Pagination: `role="navigation"`, `aria-label="Pagination"`
- Empty state: `role="status"`
- Keyboard: Tab through interactive cells, Enter/Space to sort/select

## Cross-Platform Notes

- **Web:** Native `<table>` element. Column resize via drag handles. Sticky header via `position: sticky`.
- **Native:** Renders as rows of `<View>` + `<Text>`. No `<table>` equivalent — uses flexbox layout. Swipe actions on rows. Pull to refresh. Horizontal scroll for wide tables.
- **Virtual scrolling:** Uses `@tanstack/virtual` on web, `FlashList` on native.

## Usage

```tsx
<DataTable.Root
  data={users}
  columns={columns}
  selectable
  sortable
  pagination={{ pageIndex: 0, pageSize: 25 }}
>
  <DataTable.Toolbar>
    <Input.Root placeholder="Search users...">
      <Input.Leading><SearchIcon /></Input.Leading>
    </Input.Root>
  </DataTable.Toolbar>
  <DataTable.Table>
    <DataTable.Header />
    <DataTable.Body>
      {(row) => <DataTable.Row row={row} />}
    </DataTable.Body>
  </DataTable.Table>
  <DataTable.Pagination />
</DataTable.Root>
```
