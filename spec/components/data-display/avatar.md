# Avatar

> **Headless hook:** `useAvatar` (image load state)  
> **Web primitive:** `Avatar` (renders `<span>` with image or initials)  
> **Native primitive:** `Avatar` (renders `<View>` with `<Image>` or `<Text>`)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Displays a user's profile image, initials fallback, or icon. Supports online status indicator, grouped avatars, and image load fade-in.

## Anatomy

```
┌──────┐
│ IMG  │  ← Avatar.Image (or initials)
│  ●   │  ← Avatar.Status (optional)
└──────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Avatar.Root` | Yes | Circular container. |
| `Avatar.Image` | No | `<img>` or `<Image>` for photo. |
| `Avatar.Fallback` | No | Initials or icon when image unavailable. |
| `Avatar.Status` | No | Online/offline dot. |

## API

### `Avatar.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text (auto-generates initials) |
| `fallback` | `string \| ReactNode` | initials from alt | Fallback content |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size preset |
| `shape` | `"circle" \| "square" \| "squircle"` | `"circle"` | Shape |
| `status` | `"online" \| "offline" \| "away" \| "busy"` | — | Status indicator |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Motion

**Default preset `avatar.load`:**
- Image load: opacity 0 → 1, 300ms ease-out (native lazy load fade-in)
- Status indicator: subtle pulse animation when "online"

## Accessibility

- If image: renders `<img>` with alt text
- If initials: renders text with `aria-label` = alt text
- Status is decorative (`aria-hidden="true"`)

## Variants

### Avatar.Group

```tsx
<Avatar.Group max={3}>
  <Avatar.Root src="/alice.jpg" alt="Alice" />
  <Avatar.Root src="/bob.jpg" alt="Bob" />
  <Avatar.Root fallback="CD" alt="Carol Davis" />
  <Avatar.Root fallback="+5" alt="5 more" />
</Avatar.Group>
```

Overlapping avatars with a "+N" overflow indicator.

## Usage

```tsx
<Avatar.Root src="/user.jpg" alt="John Doe" status="online" size="lg" />
<Avatar.Root fallback="JD" alt="John Doe" />
<Avatar.Root>
  <Avatar.Image src="/user.jpg" />
  <Avatar.Fallback>JD</Avatar.Fallback>
  <Avatar.Status status="online" />
</Avatar.Root>
```
