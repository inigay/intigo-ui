# MotionProvider

> **Priority:** P0  
> **Status:** 🔴 Not started

---

## Overview

Global motion configuration provider. Sets default spring parameters, reduced-motion behavior, and animation enable/disable at the app level. All animated components read from this context.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `reduced` | `"always" \| "never" \| "system"` | `"system"` | Reduced motion mode. `"system"` reads `prefers-reduced-motion`. |
| `disabled` | `boolean` | `false` | Disable ALL animations globally |
| `spring` | `SpringConfig` | `{ stiffness: 100, damping: 20, mass: 1 }` | Default spring config for all components |
| `duration` | `DurationConfig` | `{ fast: 150, normal: 250, slow: 400 }` | Default duration tokens (ms) |

### `useMotion()`

Returns `{ reduced, disabled, spring, duration }`. Components use this to:
- Skip animations entirely when `disabled` or `reduced`
- Apply default spring/duration when no per-component override
- Switch to instant transitions when `prefers-reduced-motion` is active

## Behavior

- When `reduced="always"`: all animations collapse to `duration: 0ms` with single-frame opacity crossfade
- When `disabled`: components render in their final state, no transitions
- Per-component `motion` prop overrides these globals
- Web: watches `matchMedia('(prefers-reduced-motion: reduce)')` live

## Usage

```tsx
<MotionProvider reduced="system" spring={{ stiffness: 150, damping: 18 }}>
  <App />
</MotionProvider>

// Per-component override
<Button.Root motion={{ press: { scale: 0.95 } }}>Custom press</Button.Root>
<Button.Root motion={false}>No animation</Button.Root>
```
