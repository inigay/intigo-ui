# ThemeProvider

> **Headless hook:** `useTheme`  
> **Priority:** P0  
> **Status:** 🔴 Not started

---

## Overview

Provides the design token theme to all descendant components. Supports light/dark/system modes, custom themes, nested theme overrides, and runtime token switching without a page reload.

## API

### `ThemeProvider`

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `Theme` | default theme | Theme object (from generated tokens) |
| `mode` | `"light" \| "dark" \| "system"` | `"system"` | Color scheme |
| `defaultMode` | `"light" \| "dark" \| "system"` | `"system"` | Initial mode (uncontrolled) |
| `onModeChange` | `(mode: string) => void` | — | Mode change handler |
| `disableTransitionOnChange` | `boolean` | `false` | Disable token transition animation |

### `useTheme()`

Returns `{ theme, mode, setMode, toggleMode, tokens }`.

## Behavior

- **Web:** Sets CSS variables on `:root` or scoped container. Applies `.dark` / `.light` class on `<html>`. Reads `prefers-color-scheme` for system mode.
- **Native:** Uses `Appearance` API for system mode. Applies tokens via React Context + StyleSheet.
- **Nested themes:** A child `ThemeProvider` overrides tokens for its subtree (useful for branded sections).
- **Token transitions:** When theme/mode changes, CSS variable values transition smoothly (200ms) — unless `disableTransitionOnChange` is set.

## Motion

- Token transition: CSS variable values interpolate over 200ms ease-out (web only; native re-renders instantly)
- Mode toggle: no animation on the provider itself — individual components handle their own transitions

## Usage

```tsx
import { ThemeProvider } from '@intigo-ui/web';
import { tokens } from '@intigo-ui/tokens';

<ThemeProvider theme={tokens} mode="system">
  <App />
</ThemeProvider>

// Inside a component
const { mode, toggleMode } = useTheme();
<Button.Root onPress={toggleMode}>
  Switch to {mode === 'light' ? 'dark' : 'light'} mode
</Button.Root>
```
