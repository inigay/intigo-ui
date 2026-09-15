# TreeView

> **Headless hook:** `useTreeView`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Hierarchical list with expandable/collapsible nodes. Supports single/multi-select, checkboxes, icons, drag-and-drop reorder, async loading of children, and flat or nested data.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TreeNode[]` | **required** | Nested tree data |
| `expandedIds` | `string[]` | — | Controlled expanded nodes |
| `onExpandedChange` | `(ids: string[]) => void` | — | Expand handler |
| `selectedIds` | `string[]` | — | Controlled selected nodes |
| `onSelectedChange` | `(ids: string[]) => void` | — | Selection handler |
| `selectionMode` | `"single" \| "multiple" \| "none"` | `"none"` | Selection behavior |
| `showCheckboxes` | `boolean` | `false` | Checkbox per node (indeterminate for partial children) |
| `loadChildren` | `(node: TreeNode) => Promise<TreeNode[]>` | — | Async child loader |
| `dragToReorder` | `boolean` | `false` | Drag to reorder nodes |
| `emptyMessage` | `string` | `"No items."` | Empty state |

## Motion

- Expand/collapse: children stagger slide + fade, 30ms per child, 200ms
- Chevron: rotate 0 → 90°, 200ms spring
- Selection checkbox: see Checkbox spec
- Drag: lift + shadow + placeholder slot, spring
- Async load: spinner in node, children fade in on load

## Accessibility

- `role="tree"`, `aria-label`
- Node: `role="treeitem"`, `aria-expanded`, `aria-selected`, `aria-level`, `aria-setsize`, `aria-posinset`
- Keyboard: Arrow keys navigate (up/down), Left/Right collapse/expand, Space select, * expand all siblings

## Usage

```tsx
<TreeView.Root
  data={fileTree}
  selectionMode="multiple"
  showCheckboxes
  expandedIds={expanded}
  onExpandedChange={setExpanded}
  loadChildren={async (node) => fetchChildren(node.id)}
/>
```
