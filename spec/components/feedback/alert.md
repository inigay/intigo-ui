# Alert / Banner

> **Headless hook:** `useAlert`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Contextual feedback message for user attention. Unlike Toast, Alerts are embedded in the page flow (not floating). Supports info, success, warning, error variants. Dismissible or persistent. Can contain title, description, icon, and actions.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Alert type |
| `dismissible` | `boolean` | `true` | Show close button |
| `onDismiss` | `() => void` | — | Dismiss handler |
| `icon` | `ReactNode` | auto (per variant) | Custom icon |
| `title` | `string` | — | Bold heading |
| `children` | `ReactNode` | — | Body content |
| `actions` | `ReactNode` | — | Action buttons |

## Motion

- Enter: slide down + fade in, 200ms spring
- Exit: slide up + fade out + height collapse, 200ms ease-in
- Dismissed siblings: slide up to fill gap, 250ms spring gentle

## Accessibility

- `role="alert"` (error/warning) or `role="status"` (info/success)
- `aria-live="assertive"` (error/warning) or `aria-live="polite"` (info/success)
- Dismiss button: `aria-label="Dismiss"`
- Icon is decorative: `aria-hidden="true"`

## Usage

```tsx
<Alert.Root variant="warning" dismissible onDismiss={() => setShowAlert(false)}>
  <Alert.Title>Storage almost full</Alert.Title>
  <Alert.Description>You've used 85% of your storage. Upgrade to Pro for more space.</Alert.Description>
  <Alert.Actions>
    <Button.Root size="sm" variant="outline">Dismiss</Button.Root>
    <Button.Root size="sm">Upgrade</Button.Root>
  </Alert.Actions>
</Alert.Root>
```
