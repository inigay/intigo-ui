# Textarea

> **Headless hook:** `useTextarea`  
> **Web primitive:** `Textarea` (renders `<textarea>`)  
> **Native primitive:** `Textarea` (renders `<TextInput multiline>`)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Multi-line text input. Extends the Input API with rows, auto-resize, and character count. Shares the same label, description, and error patterns as Input.

## API

### `Textarea.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `4` | Visible rows (web) |
| `autoResize` | `boolean` | `false` | Grow height to fit content |
| `maxRows` | `number` | `8` | Max rows when auto-resizing |
| All Input.Root props | — | — | Inherits: value, placeholder, disabled, invalid, etc. |

## Motion

**Default preset `textarea.focus`:**
- Same as Input: focus ring fade-in, border color transition, 150ms ease-out
- Auto-resize: height transition, 200ms ease-out (when `autoResize={true}`)

## Usage

```tsx
<Textarea.Root
  value={bio}
  onValueChange={setBio}
  placeholder="Tell us about yourself..."
  rows={4}
  autoResize
  maxLength={500}
  showCharCount
>
  <Textarea.Label>Bio</Textarea.Label>
  <Textarea.Field />
  <Textarea.Description>Brief description for your profile.</Textarea.Description>
</Textarea.Root>
```
