# Button

> **Headless hook:** `useButton`  
> **Web primitive:** `Button` (renders `<button>`)  
> **Native primitive:** `Button` (renders `<Pressable>`)  
> **Priority:** P0  
> **Status:** 🔴 Not started

---

## Overview

Button triggers an action. It is the most-used component in any UI. Intigo Button ships in 6 variants, 5 sizes, and includes a loading state, icon slots, and a spring-loaded press animation.

---

## Anatomy

```
┌─────────────────────────────────┐
│  [iconLeft]  Label  [iconRight] │  ← children, any order
│  [spinner]   Label              │  ← loading state
└─────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Button.Root` | Yes | The button element. Spreads `getButtonProps()` from `useButton`. |
| `Button.Icon` | No | Icon slot. Accepts any inline SVG or icon component. |
| `Button.Label` | No | Text label. Optional — button can be icon-only. |
| `Button.Spinner` | No | Loading indicator. Replaces icons when `loading={true}`. |

---

## API

### `Button.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"primary"` | Visual style |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size preset |
| `loading` | `boolean` | `false` | Show spinner, disable interaction |
| `disabled` | `boolean` | `false` | Disable interaction |
| `fullWidth` | `boolean` | `false` | Fill container width |
| `rounded` | `"default" \| "pill" \| "none"` | `"default"` | Border radius |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type (web only) |
| `onPress` | `() => void` | — | Click/tap handler |
| `motion` | `MotionConfig \| false` | preset | Override or disable press animation |
| `asChild` | `boolean` | `false` | Render children as the trigger (Radix-style) |

### `Button.Icon`

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"left" \| "right"` | `"left"` | Icon placement |

### `Button.Label`

No additional props — accepts children and standard text props.

### `Button.Spinner`

Rendered automatically when `loading={true}` on Root. Can be overridden by passing custom children.

---

## Variants

| Variant | Background | Text | Border | Use case |
|---|---|---|---|---|
| `primary` | `semantic.color.primary.base` | white | none | Main actions, CTAs |
| `secondary` | `gray.100` | `gray.900` | none | Secondary actions |
| `outline` | transparent | `primary.base` | `primary.base` | Cancel, back |
| `ghost` | transparent | `gray.700` | none | Toolbar, inline |
| `destructive` | `red.500` | white | none | Delete, remove |
| `link` | transparent | `primary.base` | none (underline on hover) | Inline navigation |

---

## States

| State | Visual |
|---|---|
| **Rest** | Base variant styles |
| **Hover** (web) | Slightly darker/lighter (10-15% luminance shift) |
| **Press** | Scale to 0.97, spring-release back to 1.0. Color may deepen. |
| **Focus** | Focus ring: 2px offset ring in `primary.base` at 40% opacity |
| **Disabled** | 50% opacity, `cursor: not-allowed`, no hover/press effects |
| **Loading** | Spinner replaces left icon, label stays, button is `aria-busy="true"` |

---

## Motion

### Default preset: `button.press`

```
spring: stiffness=300, damping=20
scale: 1.0 → 0.97 → 1.0
duration: 150ms
```

- On press down: scale to 0.97 over 100ms (ease-out)
- On release: spring back to 1.0
- If action triggers loading: stay at 0.97 until loading completes, then spring back
- Hover (web): subtle background luminance shift over 150ms ease-out

### Override

```tsx
<Button.Root motion={{ press: { scale: 0.95, spring: { stiffness: 200 } } }}>
  Press me
</Button.Root>
```

### Disable

```tsx
<Button.Root motion={false}>
  No animation
</Button.Root>
```

---

## Accessibility

- Renders as `<button>` on web, `Pressable` with `accessibilityRole="button"` on native
- `aria-label` auto-derived from children text if no explicit label
- Icon-only buttons MUST have an `aria-label`
- `aria-busy="true"` when loading
- `aria-disabled="true"` when disabled or loading
- Keyboard: Enter/Space to activate (handled natively by `<button>`)

---

## Usage Examples

### Basic

```tsx
import { Button } from '@intigo-ui/web';

<Button.Root onPress={() => console.log('clicked')}>
  <Button.Label>Save changes</Button.Label>
</Button.Root>
```

### With icons

```tsx
<Button.Root variant="outline">
  <Button.Icon position="left"><PlusIcon /></Button.Icon>
  <Button.Label>Add item</Button.Label>
</Button.Root>
```

### Loading

```tsx
<Button.Root loading={isSaving}>
  <Button.Label>{isSaving ? 'Saving...' : 'Save'}</Button.Label>
</Button.Root>
```

### Icon-only

```tsx
<Button.Root aria-label="Close dialog" variant="ghost" size="sm">
  <Button.Icon><XIcon /></Button.Icon>
</Button.Root>
```

---

## Cross-Platform Notes

- **Web:** Renders native `<button>`. Focus ring via `:focus-visible`. Hover state via CSS.
- **Native:** Renders `<Pressable>`. Android gets ripple effect. iOS gets opacity reduction. No hover state.
- **Loading spinner:** Uses platform-appropriate spinner (CSS animation on web, `ActivityIndicator` on native).

---

## Related Components

- [IconButton](#) — icon-only variant shortcut
- [ButtonGroup](#) — horizontal group of related buttons
- [Link](#) — inline navigation variant
- [ToggleButton](#) — press-to-toggle variant
