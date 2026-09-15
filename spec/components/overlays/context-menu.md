# ContextMenu

> **Headless hook:** `useContextMenu`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Right-click (web) or long-press (native) contextual menu. Positions near the cursor/touch point. Supports nested submenus, shortcuts, separators, disabled items, and icons.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Change handler |
| `position` | `{ x: number, y: number }` | — | Manual position override |

### `ContextMenu.Item`

| Prop | Type | Default | Description |
|---|---|---|---|
| `onSelect` | `() => void` | — | Selection handler |
| `disabled` | `boolean` | `false` | Disabled |
| `shortcut` | `string` | — | Keyboard shortcut label |
| `destructive` | `boolean` | `false` | Red styling for dangerous actions |

## Motion

- Enter: scale 0.95 → 1 + fade in, origin at cursor point, 150ms ease-out
- Exit: scale 1 → 0.95 + fade out, 100ms ease-in
- Submenu: slide in from right + fade, 150ms ease-out
- Items: no stagger (context menus are small, stagger feels slow)

## Accessibility

- Menu: `role="menu"`, `aria-orientation="vertical"`
- Item: `role="menuitem"`, `aria-disabled` when disabled
- Submenu trigger: `aria-haspopup="menu"`, `aria-expanded`
- Keyboard: Arrow keys navigate, Enter/Space select, Escape close, Right arrow open submenu, Left arrow close submenu
- Focus is trapped inside menu while open

## Usage

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div style={{ width: 400, height: 300 }}>Right-click here</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={handleCopy} shortcut="⌘C">Copy</ContextMenu.Item>
    <ContextMenu.Item onSelect={handleCut} shortcut="⌘X">Cut</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Submenu label="Share">
      <ContextMenu.Item onSelect={handleShareEmail}>Email</ContextMenu.Item>
      <ContextMenu.Item onSelect={handleShareLink}>Copy link</ContextMenu.Item>
    </ContextMenu.Submenu>
    <ContextMenu.Separator />
    <ContextMenu.Item onSelect={handleDelete} shortcut="⌫" destructive>Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```
