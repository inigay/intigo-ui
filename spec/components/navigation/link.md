# Link

> **Headless hook:** `useLink`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Inline text link for navigation. Renders `<a>` on web, `<Text>` with `onPress` on native. Supports external links, router integration, disabled state, and animated underline.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | — | URL or route |
| `external` | `boolean` | `false` | Opens in new tab (web), system browser (native) |
| `disabled` | `boolean` | `false` | Disabled, not clickable |
| `variant` | `"default" \| "subtle" \| "standalone"` | `"default"` | Visual style |
| `underline` | `"always" \| "hover" \| "none"` | `"hover"` | Underline behavior |

## Motion

- Hover underline: width 0 → 100%, 200ms ease-out (from left)
- Press: color darken, 100ms
- Focus: ring fade in, 150ms ease-out

## Accessibility

- Renders `<a>` with proper `href` on web (native accessible)
- External links: `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` appends "(opens in new tab)"
- Disabled: `aria-disabled="true"`, `tabIndex={-1}`

## Usage

```tsx
<Link.Root href="/docs" variant="default">
  View documentation
</Link.Root>

<Link.Root href="https://github.com/inigay/intigo-ui" external>
  GitHub <ExternalLinkIcon />
</Link.Root>
```
