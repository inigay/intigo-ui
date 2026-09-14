# Toast / Notification

> **Headless hook:** `useToast` (manages toast queue)  
> **Web primitive:** `Toast` (renders fixed-position alert)  
> **Native primitive:** `Toast` (renders animated notification overlay)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Brief, auto-dismissing notifications that appear in a stacked corner position. Supports success, error, warning, and info variants. Includes action buttons, progress bar, and rich content.

## Anatomy

```
┌──────────────────────────────────┐
│ [icon]  Title                    │  ← Toast.Root
│         Description              │
│         [Action]          [X]    │  ← Toast.Action + Toast.Close
│ ═══════════════════════          │  ← Toast.ProgressBar
└──────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Toast.Root` | Yes | Individual toast container. |
| `Toast.Icon` | No | Variant icon (check, x, warning, info). |
| `Toast.Title` | No | Bold heading. |
| `Toast.Description` | No | Body text. |
| `Toast.Action` | No | Call-to-action button. |
| `Toast.Close` | No | Dismiss button. |
| `Toast.ProgressBar` | No | Auto-dismiss timer bar. |

## API

### `useToast` (hook)

Returns `{ toast, dismiss, toasts }`.

```ts
toast({
  title: "File uploaded",
  description: "report.pdf has been uploaded successfully.",
  variant: "success",
  duration: 5000, // auto-dismiss after 5s, 0 = persistent
  action: { label: "View", onPress: () => openFile() },
});
```

### `Toast.Provider`

Wraps the app. Renders the toast viewport.

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` | `"bottom-right"` | Viewport position |
| `maxVisible` | `number` | `5` | Max toasts shown at once |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Variants

| Variant | Icon | Color | Use case |
|---|---|---|---|
| `info` | ℹ️ | Blue | Neutral information |
| `success` | ✓ | Green | Successful action |
| `warning` | ⚠️ | Amber | Caution/attention |
| `error` | ✕ | Red | Failed action |
| `loading` | Spinner | Gray | In-progress action |
| `promise` | — | — | Auto-resolves based on promise state |

## Motion

**Default preset `toast.enter` / `toast.exit`:**
- Enter: slide in from right + fade in, spring snappy, 300ms
- Exit: slide out to right + fade out, 200ms ease-in
- Stack: existing toasts slide up to make room, spring gentle, 250ms
- Progress bar: width 100% → 0% over `duration` ms, linear
- Hover: pause progress bar, slight lift shadow

## Accessibility

- `role="status"` for info/success, `role="alert"` for error/warning
- `aria-live="polite"` (info/success) or `aria-live="assertive"` (error/warning)
- Close button: `aria-label="Close notification"`
- Focus is NOT moved to toast (non-intrusive)

## Usage

```tsx
import { Toast, useToast } from '@intigo-ui/web';

function App() {
  return (
    <Toast.Provider position="bottom-right">
      <MyApp />
    </Toast.Provider>
  );
}

function MyApp() {
  const { toast } = useToast();
  return (
    <Button.Root onPress={() => toast({ title: "Saved!", variant: "success" })}>
      Save
    </Button.Root>
  );
}
```
