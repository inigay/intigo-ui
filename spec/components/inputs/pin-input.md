# PinInput / OTP

> **Headless hook:** `usePinInput`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Multi-digit input for verification codes, PINs, and OTPs. Each digit is a separate input that auto-focuses the next on entry. Supports paste, backspace-to-prev, and masked (password) mode.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `digits` | `number` | `6` | Number of input slots |
| `mask` | `boolean` | `false` | Hide entered digits |
| `type` | `"numeric" \| "alphanumeric"` | `"numeric"` | Allowed characters |
| `disabled` | `boolean` | `false` | Disabled |
| `invalid` | `boolean` | `false` | Error state |
| `autoFocus` | `boolean` | `true` | Auto-focus first input |
| `onComplete` | `(value: string) => void` | — | Fires when all digits filled |

## Motion

- Digit enter: subtle scale pulse + border highlight, 150ms spring
- Focus shift: border highlight moves between inputs, 100ms ease-out
- Complete: all inputs brief green flash, 300ms

## Accessibility

- Each input: `aria-label="Digit {N} of {total}"`
- Group: `role="group"`, `aria-label="Verification code"`
- Paste support: auto-distributes pasted string across inputs
- Screen reader announces digit count and current progress

## Usage

```tsx
<PinInput.Root
  digits={6}
  mask
  onComplete={(code) => verifyCode(code)}
  invalid={isInvalid}
>
  <PinInput.Label>Enter verification code</PinInput.Label>
  <PinInput.Group />
  <PinInput.Description variant="error">Invalid code. Please try again.</PinInput.Description>
</PinInput.Root>
```
