# Tabs

> **Headless hook:** `useTabs`  
> **Web primitive:** `Tabs` (renders `<div role="tablist">` + `<div role="tabpanel">`)  
> **Native primitive:** `Tabs` (renders `<View>` + scrollable tab bar)  
> **Priority:** P1  
> **Status:** 🔴 Not started

---

## Overview

Organize content into selectable panels. Supports horizontal and vertical orientation, icons, badges, disabled tabs, and an animated selection indicator.

## Anatomy

```
┌──────────────────────────────────────┐
│ ┌──────┐ ┌──────┐ ┌──────┐          │  ← Tabs.List
│ │Tab 1 │ │Tab 2 │ │Tab 3 │          │
│ └──────┘ └──────┘ └──────┘          │
│ ═══════                                │  ← Tabs.Indicator (animated underline)
│                                      │
│ Content for Tab 1                    │  ← Tabs.Panel
└──────────────────────────────────────┘
```

### Parts

| Part | Required | Description |
|---|---|---|
| `Tabs.Root` | Yes | State container. |
| `Tabs.List` | Yes | Tab button container. |
| `Tabs.Trigger` | Yes | Individual tab button. |
| `Tabs.Indicator` | No | Animated selection bar. |
| `Tabs.Panel` | Yes | Tab content panel. |

## API

### `Tabs.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled active tab |
| `defaultValue` | `string` | — | Initial tab |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `activationMode` | `"automatic" \| "manual"` | `"automatic"` | Whether panel shows on focus or select |
| `motion` | `MotionConfig \| false` | preset | Animation override |

### `Tabs.Trigger`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Tab identifier |
| `disabled` | `boolean` | `false` | Disabled tab |
| `badge` | `number \| string` | — | Notification badge |

## Motion

**Default preset `tabs.switch`:**
- Indicator: slides to new tab position + width, spring (stiffness=300, damping=25), 250ms
- Panel content: crossfade (opacity 0 → 1), 200ms ease-out
- Hover on tab: subtle background highlight, 150ms ease-out
- Badge: count change pulse

## Accessibility

- Tab list: `role="tablist"`, `aria-orientation`
- Tab: `role="tab"`, `aria-selected`, `aria-controls` → panel id
- Panel: `role="tabpanel"`, `aria-labelledby` → tab id
- Keyboard: Left/Right arrows navigate tabs, Home/End for first/last

## Variants

| Variant | Description |
|---|---|
| `underline` (default) | Bottom border indicator |
| `pill` | Rounded background on active tab |
| `enclosed` | Bordered tab panels with connected active tab |

## Usage

```tsx
<Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="billing" badge={1}>Billing</Tabs.Trigger>
    <Tabs.Trigger value="team">Team</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Indicator />
  <Tabs.Panel value="account">Account settings content</Tabs.Panel>
  <Tabs.Panel value="billing">Billing content</Tabs.Panel>
  <Tabs.Panel value="team">Team content</Tabs.Panel>
</Tabs.Root>
```
