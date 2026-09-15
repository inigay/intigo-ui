# Breadcrumbs

> **Headless hook:** `useBreadcrumbs`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Hierarchical navigation trail showing the user's location in the app. Auto-collapses intermediate items with an ellipsis when space is constrained. Last item is the current page (not a link).

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | **required** | Array of { label, href?, icon? } |
| `separator` | `ReactNode` | `/` | Custom separator |
| `maxItems` | `number` | `0` (all) | Collapse when more than N items |
| `collapseFrom` | `"start" \| "end"` | `"start"` | Which side to collapse |

## Motion

- Collapse/expand: items slide + fade, 200ms ease-out
- Hover: link underline animation, 150ms ease-out
- Separator: no animation (static)

## Accessibility

- `role="navigation"`, `aria-label="Breadcrumbs"`
- Ordered list: `<ol>` with `<li>` items
- Current page: `aria-current="page"`
- Collapsed ellipsis: `aria-label="Show more breadcrumbs"`, expands on click

## Usage

```tsx
<Breadcrumbs.Root
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/products/categories' },
    { label: 'Electronics' },
  ]}
  maxItems={4}
/>
```
