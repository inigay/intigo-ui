# Accordion

> **Headless hook:** `useAccordion`  
> **Web primitive:** `Accordion` (renders collapsible sections)  
> **Native primitive:** `Accordion` (renders collapsible sections)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Vertically stacked collapsible sections. Each section has a trigger button and a panel whose height animates when expanded/collapsed. Supports single or multiple open items.

## Anatomy

```
┌──────────────────────────────────┐
│ Section 1 Title              ▼   │  ← Accordion.Trigger
├──────────────────────────────────┤
│ Content for section 1            │  ← Accordion.Panel (animated height)
│ More content here                │
├──────────────────────────────────┤
│ Section 2 Title              ▶   │  ← Accordion.Trigger (collapsed)
├──────────────────────────────────┤
│ Section 3 Title              ▶   │
└──────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Accordion.Root` | Yes | State container. |
| `Accordion.Item` | Yes | Individual section. |
| `Accordion.Trigger` | Yes | Clickable header. |
| `Accordion.Indicator` | No | Chevron icon. |
| `Accordion.Panel` | Yes | Expandable content. |

## API

### `Accordion.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| string[]` | — | Controlled open item(s) |
| `defaultValue` | `string \| string[]` | — | Initial open item(s) |
| `onValueChange` | `(value: string \| string[]) => void` | — | Change handler |
| `type` | `"single" \| "multiple"` | `"single"` | Single or multiple open |
| `collapsible` | `boolean` | `true` | Allow closing the open item (single mode) |
| `motion` | `MotionConfig \| false` | preset | Animation override |

### `Accordion.Item`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Item identifier |
| `disabled` | `boolean` | `false` | Disabled item |

## Motion

**Default preset `accordion.expand` / `accordion.collapse`:**
- Panel height: 0 → auto (measured), spring gentle (stiffness=100, damping=20), 300ms
- Chevron: rotate 0 → 180°, spring snappy, 200ms
- Panel content: fade in with slight translateY (-4px → 0), 200ms ease-out, delayed 50ms after height starts

## Accessibility

- Trigger: `role="button"`, `aria-expanded`, `aria-controls` → panel id
- Panel: `role="region"`, `aria-labelledby` → trigger id
- Keyboard: Enter/Space to toggle, Tab to next trigger

## Usage

```tsx
<Accordion.Root type="single" defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>
      What is Intigo UI?
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Panel>
      A cross-platform component library for React Native and Web.
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>
      Is it free?
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Panel>
      Yes. MIT licensed. Forever free.
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```
