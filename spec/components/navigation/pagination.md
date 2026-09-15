# Pagination

> **Headless hook:** `usePagination`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Page navigation for lists, tables, and search results. Shows page numbers with ellipsis for large page counts. Includes previous/next, first/last, page size selector, and total count display.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | — | Controlled current page |
| `onPageChange` | `(page: number) => void` | — | Change handler |
| `totalPages` | `number` | **required** | Total page count |
| `totalItems` | `number` | — | Total item count (for display) |
| `pageSize` | `number` | `10` | Items per page |
| `onPageSizeChange` | `(size: number) => void` | — | Page size change handler |
| `siblings` | `number` | `1` | Visible pages on each side of current |
| `boundaries` | `number` | `1` | Visible pages at start/end |
| `showFirstLast` | `boolean` | `true` | First/Last page buttons |
| `showPageSize` | `boolean` | `false` | Page size selector |

## Motion

- Page number enter/exit: fade + scale, 150ms spring
- Active page indicator: background transition, 150ms ease-out
- Arrow buttons: rotate 180° on disable, subtle

## Accessibility

- `role="navigation"`, `aria-label="Pagination"`
- Page buttons: `aria-label="Page {N}"`, `aria-current="page"` on active
- Ellipsis: `aria-hidden="true"` (not interactive)
- Previous/Next: `aria-label="Previous page"` / `"Next page"`, `aria-disabled` at bounds

## Usage

```tsx
<Pagination.Root
  page={page}
  onPageChange={setPage}
  totalPages={25}
  totalItems={250}
  pageSize={10}
  onPageSizeChange={setPageSize}
  showPageSize
/>
```
