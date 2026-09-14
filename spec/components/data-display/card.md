# Card

> **Headless hook:** none (presentational component)  
> **Web primitive:** `Card` (renders `<div>`)  
> **Native primitive:** `Card` (renders `<View>`)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Container for grouping related content and actions. Supports header, body, footer sections, hover elevation, and press interactions.

## Anatomy

```
┌──────────────────────────────────┐
│ ┌──────────────────────────────┐ │  ← Card.Root
│ │ Header                       │ │  ← Card.Header
│ ├──────────────────────────────┤ │
│ │ Content body                 │ │  ← Card.Body
│ │ More content                 │ │
│ ├──────────────────────────────┤ │
│ │ Footer actions               │ │  ← Card.Footer
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Card.Root` | Yes | Container with border, radius, shadow. |
| `Card.Header` | No | Top section, typically title + action. |
| `Card.Body` | No | Main content area. |
| `Card.Footer` | No | Bottom section, typically action buttons. |
| `Card.Image` | No | Full-width image at top. |

## API

### `Card.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"elevated" \| "outlined" \| "flat"` | `"elevated"` | Visual style |
| `interactive` | `boolean` | `false` | Show hover/press effects |
| `fullWidth` | `boolean` | `false` | Fill container width |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Internal padding |
| `onPress` | `() => void` | — | Click handler (when interactive) |
| `motion` | `MotionConfig \| false` | preset | Animation override |

## Variants

| Variant | Shadow | Border | Use case |
|---|---|---|---|
| `elevated` | box-shadow | none | Standard card, white background |
| `outlined` | none | 1px border | Subtle card, transparent background |
| `flat` | none | none | Minimal, background fill only |

## Motion

**Default preset `card.interact`:**
- Hover: translateY -2px + shadow increase, 200ms ease-out
- Press: scale 0.99, 100ms ease-out
- Enter (list): stagger fade + slide up, 50ms delay per card

## Accessibility

- If `onPress` is provided: `role="button"`, `tabIndex={0}`, Enter/Space to activate
- If no `onPress`: no interactive role
- Image alt text via `Card.Image alt` prop

## Usage

```tsx
<Card.Root interactive onPress={() => navigate('/product/1')}>
  <Card.Image src="/product.jpg" alt="Product photo" />
  <Card.Header>
    <h3>Product Name</h3>
    <Badge variant="label" value="NEW" />
  </Card.Header>
  <Card.Body>
    Product description goes here. Up to two lines of text.
  </Card.Body>
  <Card.Footer>
    <Button.Root size="sm">Add to cart</Button.Root>
  </Card.Footer>
</Card.Root>
```
