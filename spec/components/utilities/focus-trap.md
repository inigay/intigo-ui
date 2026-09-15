# FocusTrap

> **Headless hook:** `useFocusTrap`  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Traps keyboard focus within a container. Used internally by Dialog, Drawer, Popover, and Select. Also available as a standalone utility for custom modal implementations.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `active` | `boolean` | `true` | Whether trap is active |
| `initialFocus` | `number \| RefObject` | first focusable | Element to focus on mount |
| `returnFocus` | `boolean` | `true` | Return focus to trigger on unmount |
| `disabled` | `boolean` | `false` | Disable trap |

## Behavior

- Tab: cycles through focusable elements in the container (first → last → first)
- Shift+Tab: cycles backwards (last → first → last)
- Focus is never allowed to escape to the background while active
- On mount: focuses `initialFocus` or the first focusable element
- On unmount: returns focus to the element that was focused before the trap activated
- Respects `tabIndex`, `disabled`, and `aria-hidden` elements

## Accessibility

- Not a visible component — pure behavior
- Screen readers respect the focus boundary naturally
- Works with virtual focus (React Native) and DOM focus (web)

## Usage

```tsx
<FocusTrap active={isOpen}>
  <div>
    <input placeholder="First" />
    <button>Second</button>
  </div>
</FocusTrap>
```
