# Drawer / Sheet

> **Headless hook:** `useDrawer`  
> **Web primitive:** `Drawer` (renders sliding panel + overlay)  
> **Native primitive:** `Drawer` (renders bottom sheet with gesture handle)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

A panel that slides in from the edge of the screen. Typically used for navigation menus (left drawer), detail panels (right), or bottom sheets (mobile). Supports gesture-driven dismissal on mobile.

## Anatomy

```
┌──────────────────────────────────────┐
│                              ░░░░░░░░│  ← Drawer.Overlay
│  ┌────────────────┐         ░░░░░░░░│
│  │ Drawer Content │         ░░░░░░░░│  ← Drawer.Content
│  │                │         ░░░░░░░░│
│  │ ═══ (handle)   │         ░░░░░░░░���  ← Drawer.Handle (native sheet)
│  │                │         ░░░░░░░░│
│  └────────────────┘         ░░░░░░░░│
└──────────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Drawer.Root` | Yes | State container. |
| `Drawer.Trigger` | No | Element that opens the drawer. |
| `Drawer.Overlay` | Yes | Backdrop. |
| `Drawer.Content` | Yes | The sliding panel. |
| `Drawer.Handle` | No | Drag handle (native sheet). |
| `Drawer.Header` | No | Title + close button. |
| `Drawer.Body` | No | Scrollable content. |
| `Drawer.Footer` | No | Action buttons. |
| `Drawer.Close` | No | Close button. |

## API

### `Drawer.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Change handler |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Slide direction |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Panel width/height |
| `closeOnEscape` | `boolean` | `true` | Escape to close |
| `closeOnOutsideClick` | `boolean` | `true` | Click overlay to close |
| `closeOnSwipe` | `boolean` | `true` | Swipe to close (native) |
| `snapPoints` | `number[]` | — | Snap positions as % of height (native sheet) |
| `defaultSnapPoint` | `number` | — | Initial snap position index |
| `modal` | `boolean` | `true` | Block background interaction |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default presets:**

Web:
- Overlay: opacity 0 → 1, 250ms ease-out
- Content: slide in from `side` + slight ease-out, 300ms. Left: translateX -100% → 0. Right: translateX 100% → 0. Top: translateY -100% → 0. Bottom: translateY 100% → 0.

Native (bottom sheet):
- Spring-driven slide from bottom
- Rubberband effect when pulling past snap points
- Velocity-based dismissal (swipe fast enough → close)
- Handle: subtle bounce on reach

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → title
- Focus trap inside drawer
- Focus restoration on close
- Escape closes (web)
- Swipe down closes (native, with VoiceOver gesture passthrough)

## Usage

```tsx
<Drawer.Root open={isOpen} onOpenChange={setIsOpen} side="right" size="md">
  <Drawer.Trigger>
    <Button.Root>Open drawer</Button.Root>
  </Drawer.Trigger>
  <Drawer.Overlay />
  <Drawer.Content>
    <Drawer.Header>
      <h2>Details</h2>
      <Drawer.Close><XIcon /></Drawer.Close>
    </Drawer.Header>
    <Drawer.Body>
      {/* Content */}
    </Drawer.Body>
    <Drawer.Footer>
      <Button.Root>Save</Button.Root>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```
