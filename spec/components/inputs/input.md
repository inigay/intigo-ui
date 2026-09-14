# Input / TextField

> **Headless hook:** `useInput`  
> **Web primitive:** `Input` (renders `<input>` + wrapper)  
> **Native primitive:** `Input` (renders `<TextInput>` + wrapper)  
> **Priority:** P0  
> **Status:** 🔴 Not started

---

## Overview

Single-line text input. Supports label, description, error message, leading/trailing adornments, clear button, password toggle, and character count.

---

## Anatomy

```
┌──────────────────────────────────────────┐
│  Label                            (char) │  ← Input.Label
│  ┌─────────┬──────────────────┬────────┐ │
│  │ leading │ [type here...]   │trailing│ │  ← Input.Root
│  └─────────┴──────────────────┴────────┘ │
│  Description / Error message             │  ← Input.Description
└──────────────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Input.Root` | Yes | Container. Spreads `getInputProps()` from `useInput`. |
| `Input.Label` | No | Accessible label, linked via `htmlFor`/`nativeID`. |
| `Input.Field` | Yes | The actual input element. |
| `Input.Leading` | No | Adornment before the text (icon, select, currency symbol). |
| `Input.Trailing` | No | Adornment after the text (clear button, password toggle, icon). |
| `Input.Description` | No | Helper text or error message below the field. |

---

## API

### `Input.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | `""` | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `type` | `"text" \| "password" \| "email" \| "number" \| "tel" \| "url" \| "search"` | `"text"` | Input type |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `required` | `boolean` | `false` | Required field indicator |
| `invalid` | `boolean` | `false` | Error state (red border, error message) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset |
| `fullWidth` | `boolean` | `true` | Fill container width |
| `maxLength` | `number` | — | Character limit |
| `showCharCount` | `boolean` | `false` | Show "42/100" below field |
| `clearable` | `boolean` | `false` | Show clear button when value is non-empty |
| `motion` | `MotionConfig \| false` | preset | Override or disable focus animation |

### `Input.Label`

| Prop | Type | Default | Description |
|---|---|---|---|
| `required` | `boolean` | `false` | Show required asterisk |

### `Input.Description`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"description" \| "error"` | `"description"` | Visual style |

---

## States

| State | Visual |
|---|---|
| **Rest** | Gray border, white background |
| **Hover** (web) | Slightly darker border |
| **Focus** | Blue ring fades in (150ms ease-out), border turns blue |
| **Filled** | Slightly darker background tint (optional) |
| **Invalid** | Red border, red ring on focus, red description text |
| **Disabled** | 50% opacity, gray background, `not-allowed` cursor |
| **Read-only** | No border, transparent background, no focus ring |

---

## Motion

### Default preset: `input.focus`

```
border color transition: 150ms ease-out
focus ring: opacity 0 → 1, 150ms ease-out
```

- Focus ring fades in as a 3px offset ring in primary color at 20% opacity
- Border color transitions smoothly between states
- Label floats up (if using floating label variant — P2 feature)

---

## Accessibility

- Label is linked via `htmlFor`/`nativeID` to the input
- Error message is linked via `aria-describedby`
- Character count is announced to screen readers
- Clear button has `aria-label="Clear input"`
- Password toggle announces "Show password" / "Hide password"

---

## Variants

| Variant | Description |
|---|---|
| `outline` (default) | Bordered input, standard |
| `filled` | Background fill, bottom border only |
| `ghost` | No border, transparent background (inline editing) |
| `underline` | Bottom border only, no background |

---

## Usage Examples

```tsx
import { Input } from '@intigo-ui/web';

<Input.Root
  value={email}
  onValueChange={setEmail}
  type="email"
  placeholder="you@example.com"
>
  <Input.Label>Email address</Input.Label>
  <Input.Leading><MailIcon /></Input.Leading>
  <Input.Field />
  <Input.Trailing>
    <Input.ClearButton />
  </Input.Trailing>
  <Input.Description>We'll never share your email.</Input.Description>
</Input.Root>
```

```tsx
// Password with toggle
<Input.Root type="password">
  <Input.Label>Password</Input.Label>
  <Input.Field />
  <Input.Trailing>
    <Input.PasswordToggle />
  </Input.Trailing>
</Input.Root>
```

```tsx
// Error state
<Input.Root invalid value={name} onValueChange={setName}>
  <Input.Label>Full name</Input.Label>
  <Input.Field />
  <Input.Description variant="error">Name is required.</Input.Description>
</Input.Root>
```
