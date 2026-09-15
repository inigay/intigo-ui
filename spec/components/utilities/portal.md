# Portal

> **Headless hook:** `usePortal`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Renders children into a different part of the DOM (web) or a Modal (native). Used internally by overlays to escape z-index and overflow clipping. Also available standalone.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `container` | `HTMLElement \| RefObject` | `document.body` | Target container (web) |
| `disabled` | `boolean` | `false` | Render inline instead of portal |

## Behavior

- **Web:** Uses `createPortal` to render into `document.body` (or custom container). Avoids z-index stacking context issues and `overflow: hidden` clipping.
- **Native:** Uses React Native `<Modal>` for true overlay behavior. Falls back to absolute positioning in the view hierarchy when Modal is unavailable.

## Accessibility

- Portal does not affect the accessibility tree — children retain their original roles
- Focus behavior is handled by the parent overlay component (Dialog, Popover, etc.)
- Portal itself is invisible to assistive technology

## Usage

```tsx
<Portal>
  <div className="fixed inset-0">This renders in document.body</div>
</Portal>
```
