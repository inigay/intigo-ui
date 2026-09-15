# Motion System Specification

## Philosophy

Every component ships with a curated animation preset. Feels premium out of the box. Every preset is overridable. Every preset can be disabled. Respects `prefers-reduced-motion`.

## Architecture

```
theme.yml (motion tokens)
    ↓
@intigo-ui/tokens (duration, easing, spring presets)
    ↓
@intigo-ui/motion (MotionProvider, spring presets, platform wrappers)
    ↓
Components (default motion presets, overridable per component)
```

## Motion Tokens (in theme.yml)

```yaml
primitive:
  motion:
    duration:
      instant: "0ms"
      fast: "150ms"
      normal: "250ms"
      slow: "400ms"
      glacial: "700ms"
    
    easing:
      easeOut: "cubic-bezier(0.16, 1, 0.3, 1)"
      easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)"
      anticipate: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
    
    spring:
      gentle:  { stiffness: 100, damping: 20, mass: 1 }
      snappy:  { stiffness: 300, damping: 25, mass: 1 }
      bouncy:  { stiffness: 200, damping: 10, mass: 1 }
      stiff:   { stiffness: 400, damping: 30, mass: 1 }
      slow:    { stiffness: 50,  damping: 20, mass: 1 }
```

## Motion Categories

| Category | Description | Example Components | Spring |
|---|---|---|---|
| **Press** | Scale/color on press/hover | Button, Chip, Tab, Card | snappy |
| **Enter** | Mount animation | Dialog, Toast, Tooltip, Popover | snappy |
| **Exit** | Unmount animation | Dialog, Toast, Tooltip | — (ease-in) |
| **Layout** | Size/position transitions | Select list, Accordion, Tabs indicator | gentle |
| **Focus** | Ring fade-in, border color | Input, Select, Textarea | — (ease-out) |
| **Drag** | Gesture-driven physics | Sheet, Slider, Drawer | bouncy |
| **Attention** | Pulse, shake, glow | Badge count, validation error | bouncy |
| **Stagger** | Child delay cascade | List items, Menu options, Table rows | snappy |

## Per-Component Motion API

Every animated component accepts a `motion` prop:

```tsx
// Use default preset (no prop needed)
<Button.Root>Press me</Button.Root>

// Override specific properties
<Button.Root motion={{ press: { scale: 0.95, spring: { stiffness: 200 } } }}>
  Custom press
</Button.Root>

// Disable animation for this instance
<Button.Root motion={false}>
  No animation
</Button.Root>

// Extend the preset (add entrance animation to a button)
<Button.Root motion={{ enter: { type: 'fade', duration: 300 } }}>
  Animated entrance
</Button.Root>
```

## MotionProvider (Global Config)

```tsx
<MotionProvider
  reduced="system"                          // "always" | "never" | "system"
  spring={{ stiffness: 150, damping: 18 }}   // Global spring defaults
>
  <App />
</MotionProvider>
```

### `useMotion()` Hook

```ts
const { reduced, disabled, spring, duration } = useMotion();
// reduced: boolean — true when prefers-reduced-motion
// disabled: boolean — true when all animations are off
// spring: SpringConfig — default spring parameters
// duration: DurationTokens — default duration tokens
```

## `prefers-reduced-motion` Integration

When reduced motion is active (user preference OR `reduced="always"`):

1. All spring/duration animations collapse to `duration: 0ms`
2. Fade animations become single-frame opacity toggles (0 or 1)
3. Infinite animations (spinner, shimmer) stop
4. Scroll-based animations become static
5. Layout animations (accordion height, tab indicator) become instant

Implementation per platform:
- **Web:** `window.matchMedia('(prefers-reduced-motion: reduce)')` — live listener
- **Native:** `AccessibilityInfo.isReduceMotionEnabled()` — React Native API

## Platform-Specific Motion Engines

### Web (`@intigo-ui/motion/web`)

Uses **Framer Motion** under the hood:
- `motion.div` for animated elements
- `AnimatePresence` for enter/exit animations
- Spring physics via Framer Motion's `spring` type
- Layout animations via `layout` prop

### Native (`@intigo-ui/motion/native`)

Uses **React Native Reanimated 3** under the hood:
- `Animated.View` for animated elements
- `withSpring`, `withTiming` for spring/duration animations
- `useAnimatedStyle` for gesture-driven animations
- `LayoutAnimation` for layout transitions

### Shared API

The `@intigo-ui/motion` package exports a unified API:

```ts
import { motion } from '@intigo-ui/motion';

// Works on web (Framer Motion) AND native (Reanimated)
<motion.div
  animate={{ opacity: 1, scale: 1 }}
  initial={{ opacity: 0, scale: 0.95 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
  Content
</motion.div>
```

## Component Motion Presets (Default Behaviors)

| Component | Trigger | Animation | Spring/Duration |
|---|---|---|---|
| Button | Press down | scale: 1 → 0.97 | 150ms ease-out |
| Button | Press release | scale: 0.97 → 1 | spring snappy |
| Input | Focus | ring opacity: 0 → 1, border color | 150ms ease-out |
| Select | Open | popup opacity + translateY | 200ms ease-out |
| Select | Options | stagger: fade + slide, 30ms/child | 30ms delay each |
| Select | Chevron | rotate: 0 → 180° | 200ms spring snappy |
| Dialog | Open | overlay fade + content scale | 250ms spring snappy |
| Dialog | Close | overlay fade + content scale down | 150ms ease-in |
| Checkbox | Check | checkmark scale + draw | 200ms spring snappy |
| Switch | Toggle | thumb slide + track color | 250ms spring stiff |
| Tabs | Switch | indicator slide | 250ms spring snappy |
| Tabs | Content | crossfade | 200ms ease-out |
| Toast | Enter | slide + fade from right | 300ms spring snappy |
| Toast | Exit | slide + fade to right | 200ms ease-in |
| Toast | Progress | width 100% → 0% | linear over duration |
| Accordion | Expand | height + chevron rotate | 300ms spring gentle |
| Avatar | Load | image fade in | 300ms ease-out |
| Badge | Update | scale pulse: 1 → 1.3 → 1 | 250ms spring bouncy |
| Card | Hover | translateY -2px + shadow | 200ms ease-out |
| DataTable | Row hover | background highlight | 150ms ease-out |
| DataTable | Sort | arrow rotate + color | 200ms ease-out |
| Tag | Dismiss | scale → 0 + fade | 150ms ease-in |
| Skeleton | Load | shimmer sweep | 1.5s infinite |
| Drawer | Open | slide from edge | 300ms ease-out |
| Popover | Open | fade + scale + slide | 200ms ease-out |
| Tooltip | Show | fade + slide (no scale) | 200ms ease-out |
| Slider | Release | spring to step | 200ms spring gentle |
| DatePicker | Day select | scale pulse | 150ms spring |
| PinInput | Digit enter | scale pulse + border | 150ms spring snappy |
| ContextMenu | Open | scale + fade, origin cursor | 150ms ease-out |
| Stepper | Step change | content crossfade + slide | 250ms ease-out |
| ProgressBar | Fill | width transition | 400ms ease-out |
| ListBox | Hover | background highlight | 100ms ease-out |
| TreeView | Expand | children stagger | 30ms/child, 200ms |
| Alert | Enter | slide down + fade | 200ms spring snappy |
| Collapsible | Open | height + content fade | 300ms spring gentle |
