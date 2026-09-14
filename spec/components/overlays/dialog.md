# Dialog / Modal

> **Headless hook:** `useDialog`  
> **Web primitive:** `Dialog` (renders `<dialog>` or role="dialog" `<div>`)  
> **Native primitive:** `Dialog` (renders `<Modal>`)  
> **Priority:** P0  
> **Status:** 🔴 Not started

---

## Overview

A modal dialog that appears over the page content. Supports title, description, body content, footer actions, overlay backdrop, escape-to-close, click-outside-to-close, focus trapping, and scroll locking.

---

## Anatomy

```
┌──────────────────────────────────────────┐
│                    ░░░░░░░░░░░░░░░░░░░░░░│  ← Dialog.Overlay (backdrop)
│                    ░░░░░░░░░░░░░░░░░░░░░░│
│                    ░░┌──────────────┐░░░░│
│                    ░░│ Title    [X] │░░░░│  ← Dialog.Header
│                    ░░│              │░░░░│
│                    ░░│ Body content │░░░░│  ← Dialog.Body
│                    ░░│ goes here    │░░░░│
│                    ░░│              │░░░░│
│                    ░░│ [Cancel][OK] │░░░░│  ← Dialog.Footer
│                    ░░└──────────────┘░░░░│
│                    ░░░░░░░░░░░░░░░░░░░░░░│
└──────────────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Dialog.Root` | Yes | State container. Controls open state. |
| `Dialog.Trigger` | No | Element that opens the dialog. |
| `Dialog.Overlay` | Yes | Semi-transparent backdrop. |
| `Dialog.Content` | Yes | The dialog panel itself. |
| `Dialog.Header` | No | Title + close button row. |
| `Dialog.Title` | No | Dialog heading. |
| `Dialog.Description` | No | Accessible description text. |
| `Dialog.Body` | No | Scrollable content area. |
| `Dialog.Footer` | No | Action buttons row. |
| `Dialog.Close` | No | Close button (X in corner or Cancel in footer). |

---

## API

### `Dialog.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state change handler |
| `modal` | `boolean` | `true` | Whether to block interaction with background |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnOutsideClick` | `boolean` | `true` | Close when clicking backdrop |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Dialog width preset |
| `motion` | `MotionConfig \| false` | preset | Override or disable animations |

### `Dialog.Content`

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"center" \| "top" \| "bottom"` | `"center"` | Vertical position |
| `scrollBehavior` | `"inside" \| "outside"` | `"inside"` | Where content scrolls |

---

## Variants

| Variant | Description |
|---|---|
| `dialog` (default) | Standard centered modal with backdrop |
| `sheet` | Slides up from bottom (mobile-optimized). See Drawer/Sheet spec. |
| `alert` | Small dialog for confirmations. Icon + message + 1-2 buttons. |
| `fullscreen` | Fills the entire viewport. |

---

## States

| State | Visual |
|---|---|
| **Closed** | Not rendered (or `display: none`) |
| **Opening** | Overlay fades in, content scales + fades in |
| **Open** | Fully visible, focus trapped inside |
| **Closing** | Overlay fades out, content scales down + fades out |
| **Scrollable** | Body scrolls internally, header + footer sticky |

---

## Motion

### Default preset: `dialog.enter` / `dialog.exit`

```
overlay enter: opacity 0 → 1, 200ms ease-out
content enter: opacity 0 → 1, scale 0.95 → 1, translateY 10px → 0, spring snappy (stiffness=300, damping=25), 250ms

overlay exit: opacity 1 → 0, 150ms ease-in
content exit: opacity 1 → 0, scale 1 → 0.95, 150ms ease-in
```

### Alert variant

```
content enter: scale 0.9 → 1, spring bouncy (stiffness=200, damping=10), 300ms
```

---

## Accessibility

- Renders as `<dialog>` element on web (native modal dialog) with `showModal()`
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → title, `aria-describedby` → description
- Focus trap: Tab cycles through focusable elements inside dialog only
- Focus restoration: focus returns to trigger element on close
- Scroll lock: body scroll is prevented while dialog is open
- Escape key closes (unless `closeOnEscape={false}`)
- Click outside closes (unless `closeOnOutsideClick={false}`)

---

## Cross-Platform Notes

- **Web:** Uses native `<dialog>` element with `showModal()` for built-in backdrop + focus trap + escape handling. Fallback to div with role="dialog" for older browsers.
- **Native:** Uses React Native `<Modal>` with `transparent` background. Sheet variant uses bottom sheet with gesture handle.
- **Scroll locking:** `overflow: hidden` on `<body>` for web. No special handling needed on native.
- **Backdrop:** Semi-transparent black (50% opacity) on web. Semi-transparent black on native with `StatusBar` overlay.

---

## Usage Examples

```tsx
import { Dialog } from '@intigo-ui/web';

<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>
    <Button.Root><Button.Label>Open dialog</Button.Label></Button.Root>
  </Dialog.Trigger>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Close><XIcon /></Dialog.Close>
    </Dialog.Header>
    <Dialog.Body>
      {/* Form content */}
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>
        <Button.Root variant="outline">Cancel</Button.Root>
      </Dialog.Close>
      <Button.Root onPress={handleSave}>Save changes</Button.Root>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

```tsx
// Alert dialog (confirmation)
<Dialog.Root open={showConfirm} onOpenChange={setShowConfirm} variant="alert">
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Body>
      <AlertTriangleIcon />
      <Dialog.Title>Delete account?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. All your data will be permanently removed.
      </Dialog.Description>
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close><Button.Root variant="outline">Cancel</Button.Root></Dialog.Close>
      <Button.Root variant="destructive" onPress={handleDelete}>Delete</Button.Root>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```
