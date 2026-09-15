# Intigo UI

> **A luxurious, open-source cross-platform component library for React Native and Web.**
> The free, community-owned alternative to Prime UI — designed to make employers' jaws drop.

---

## Vision

Intigo UI is a **design system library** that ships three things every component library should but few do:

1. **Truly shared logic** — A headless core that runs identically on React DOM and React Native. No `document`, no `useWindowDimensions`, no platform imports. Just pure state, keyboard, ARIA, and behavior hooks.

2. **Platform-native rendering** — Separate, thin renderers for web and native that consume the same headless hooks. Web gets semantic HTML + CSS. Native gets `<View>`/`<Pressable>`/`<Text>`. Same API. Same behavior. Right feel for each platform.

3. **Bespoke motion by default** — Every component ships with a curated animation preset. Spring-loaded buttons, staggered list entrances, fluid sheet transitions. Feels like a Linear or Vercel product out of the box. Every preset is overridable. Every preset can be disabled.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  YOUR APP                        │
│    imports from @intigo-ui/web or @intigo-ui/native │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │ STYLED WEB   │  │ STYLED NATIVE│  ← Themed   │
│  │ (@intigo-ui/ │  │ (@intigo-ui/ │    components│
│  │   web)       │  │   native)    │    with tokens│
│  └──────┬───────┘  └──────┬───────┘             │
│         │                 │                     │
│  ┌──────┴───────┐  ┌──────┴───────┐             │
│  │ PRIMITIVES   │  │ PRIMITIVES   │  ← Unstyled │
│  │ WEB          │  │ NATIVE       │    composable│
│  │ (HTML/DOM)   │  │ (View/Text)  │    parts     │
│  └──────┬───────┘  └──────┬───────┘             │
│         │                 │                     │
│         └────────┬────────┘                     │
│                  │                              │
│         ┌────────┴────────┐                     │
│         │   HEADLESS      │  ← 100% shared     │
│         │   (pure hooks)  │    zero platform   │
│         │   state, ARIA,  │    imports         │
│         │   keyboard,     │                     │
│         │   focus logic   │                     │
│         └────────┬────────┘                     │
│                  │                              │
│         ┌────────┴────────┐                     │
│         │   TOKENS        │  ← Design decisions │
│         │   colors, space,│    as data          │
│         │   type, motion  │    (YML → JS/TS)   │
│         └─────────────────┘                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### The Three Layers (modeled on Prime UI v11)

| Layer | Package | Renders? | Styled? | Contains |
|---|---|---|---|---|
| **Headless** | `@intigo-ui/headless` | No | No | Pure hooks: `useButton`, `useSelect`, `useDialog`, etc. State machines, keyboard nav, ARIA prop getters. |
| **Primitives** | `@intigo-ui/primitives-web` / `@intigo-ui/primitives-native` | Yes | No | Unstyled, composable component parts (Root, Trigger, List, Option, etc.) built on headless hooks. |
| **Styled** | `@intigo-ui/web` / `@intigo-ui/native` | Yes | Yes | The same primitives with design tokens applied. Ready-to-use, beautiful out of the box. |

### Key Design Decisions

- **Platform-specific renderers, not React Native Web.** We write separate thin renderers for web and native. This gives us semantic HTML on web (proper `<button>`, `<select>`, `<dialog>`) and real native components on mobile. No compromise on platform feel.
- **Headless hooks are the product.** The hooks are independently usable. You don't need our renderers. Grab `useSelect` and build your own UI on top.
- **Tokens are data, not code.** One YML file is the source of truth. A build step generates TypeScript, Kotlin, and Swift token files. Designers can edit the YML. Non-React platforms can consume the output.
- **Motion is not an afterthought.** Every component ships with a motion preset. We ship shared spring configurations. Animations respect `prefers-reduced-motion`.

---

## Theme System (YML-First)

### Why YML?

YML is the right format for design tokens because:

1. **Human-editable by designers.** No code knowledge needed. No JSON commas, no JS syntax.
2. **Multi-platform output.** The same YML generates TypeScript for web/native, Kotlin for Android, Swift for iOS. One truth, many targets.
3. **Hierarchical by nature.** Tokens nest naturally: `primitive.blue.500` → `semantic.primary.color` → `component.button.background`.
4. **Diffable and reviewable.** Meaningful line-based diffs in PRs. A color change is one line.
5. **Tooling-agnostic.** Style Dictionary, Theo, custom transformers — all consume YML. No lock-in.

### Token Tiers

```
primitive  →  raw values (hex colors, px sizes, ms durations)
semantic   →  named roles (primary, success, destructive, muted)
component  →  per-component overrides (button.background, input.border)
```

### Example Theme YML

```yaml
# theme.yml — single source of truth for all platforms
meta:
  name: "Intigo Default"
  version: "1.0.0"

primitive:
  color:
    blue:
      50: "#eff6ff"
      100: "#dbeafe"
      500: "#3b82f6"
      900: "#1e3a5f"
    gray:
      50: "#f9fafb"
      100: "#f3f4f6"
      500: "#6b7280"
      900: "#111827"
    red:
      500: "#ef4444"
    green:
      500: "#22c55e"
    amber:
      500: "#f59e0b"

  spacing:
    0: "0px"
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    6: "24px"
    8: "32px"
    12: "48px"
    16: "64px"

  radius:
    none: "0px"
    sm: "4px"
    md: "8px"
    lg: "12px"
    xl: "16px"
    full: "9999px"

  typography:
    fontFamily:
      sans: "Inter, system-ui, sans-serif"
      mono: "JetBrains Mono, monospace"
    fontSize:
      xs: "12px"
      sm: "14px"
      base: "16px"
      lg: "18px"
      xl: "20px"
      "2xl": "24px"
      "4xl": "36px"
    fontWeight:
      normal: 400
      medium: 500
      semibold: 600
      bold: 700

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
      spring: "spring(1, 100, 20)"
      springBouncy: "spring(1, 100, 10)"

semantic:
  color:
    primary:
      base: "${primitive.color.blue.500}"
      hover: "${primitive.color.blue.600}"
      contrast: "#ffffff"
    success:
      base: "${primitive.color.green.500}"
    destructive:
      base: "${primitive.color.red.500}"
    warning:
      base: "${primitive.color.amber.500}"
    surface:
      background: "${primitive.color.gray.50}"
      foreground: "${primitive.color.gray.900}"
      muted: "${primitive.color.gray.500}"
      border: "${primitive.color.gray.200}"

  radius:
    default: "${primitive.radius.md}"
    pill: "${primitive.radius.full}"

component:
  button:
    background: "${semantic.color.primary.base}"
    color: "${semantic.color.primary.contrast}"
    radius: "${semantic.radius.default}"
    paddingX: "${primitive.spacing.4}"
    paddingY: "${primitive.spacing.2}"
    fontSize: "${primitive.typography.fontSize.sm}"
    fontWeight: "${primitive.typography.fontWeight.medium}"
    motion:
      press: "${primitive.motion.duration.fast} ${primitive.motion.easing.easeOut}"

  input:
    background: "#ffffff"
    border: "${semantic.color.surface.border}"
    focusBorder: "${semantic.color.primary.base}"
    focusRing: "0 0 0 3px ${semantic.color.primary.base}33"
    radius: "${semantic.radius.default}"
    paddingX: "${primitive.spacing.3}"
    paddingY: "${primitive.spacing.2}"
    fontSize: "${primitive.typography.fontSize.base}"
    placeholderColor: "${semantic.color.surface.muted}"
    motion:
      focus: "${primitive.motion.duration.fast} ${primitive.motion.easing.easeOut}"
```

### Build Output

The YML is processed by the token CLI (`@intigo-ui/cli`) into:

```
packages/tokens/src/generated/
├── tokens.ts         # TypeScript token object (web + native)
├── tokens.json       # JSON (universal)
├── Tokens.kt         # Kotlin data class (Android)
└── Tokens.swift      # Swift struct (iOS)
```

---

## Motion System

### Philosophy

Every component ships with a **default animation preset** that makes it feel premium. No configuration needed. Every preset can be overridden, extended, or disabled entirely.

### Motion Architecture

```
┌──────────────────────────────────────┐
│           MOTION CONFIG              │
│  (from theme.yml → tokens.motion)    │
├──────────────────────────────────────┤
│                                      │
│  Spring Presets:                     │
│    gentle    stiffness=100 damp=20   │
│    snappy    stiffness=300 damp=25   │
│    bouncy    stiffness=200 damp=10   │
│    slow      stiffness=50  damp=20   │
│                                      │
│  Duration Presets:                   │
│    instant   0ms                     │
│    fast      150ms                   │
│    normal    250ms                   │
│    slow      400ms                   │
│    glacial   700ms                   │
│                                      │
│  Easing Presets:                     │
│    easeOut       cubic-bezier(...)   │
│    easeInOut     cubic-bezier(...)   │
│    anticipate    cubic-bezier(...)   │
│                                      │
└──────────────────────────────────────┘
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│  WEB RENDERER   │  │ NATIVE RENDERER │
│  (Framer Motion) │  │ (Reanimated 3)  │
│                 │  │                 │
│  <Motion.div>   │  │ <Animated.View> │
│  animate=        │  │ entering=       │
│  layout          │  │ layout          │
└─────────────────┘  └─────────────────┘
```

### Motion Categories

| Category | What gets animated | Example components |
|---|---|---|
| **Press** | Scale, opacity, color shift on press/hover | Button, IconButton, Chip, Tab |
| **Enter** | Mount animation (fade, slide, scale, stagger children) | Dialog, Toast, Tooltip, Popover, Sheet |
| **Exit** | Unmount animation | Dialog, Toast, Tooltip |
| **Layout** | Smooth size/position transitions when content changes | Select list, Accordion, Tabs indicator |
| **Focus** | Ring fade-in, border color transition | Input, Select, Textarea |
| **Drag** | Gesture-driven spring physics | Sheet, Slider, Drawer |
| **Attention** | Pulse, shake, glow for feedback | Badge count change, validation error |
| **Stagger** | Child element delay cascade | List items, Menu options, DataTable rows |

### `prefers-reduced-motion`

Every animation is gated behind a media query / accessibility setting check. When reduced motion is preferred, all animations collapse to `duration: 0ms` with a single opacity crossfade. This is handled automatically by the motion system — component authors don't need to think about it.

---

## Component Catalog

### Organization

Components are organized by their interaction pattern, not by visual category:

- **Inputs** — Components that capture user data
- **Overlays** — Components that float above the page
- **Navigation** — Components that move users between views
- **Data Display** — Components that present information
- **Feedback** — Components that communicate state
- **Layout** — Components that structure other components
- **Utilities** — Shared behaviors and providers

### Component Matrix

| # | Component | Headless Hook | Web Primitive | Native Primitive | Motion | Priority |
|---|---|---|---|---|---|---|
| **Inputs** |
| 1 | Button | `useButton` | `Button` | `Button` | Press scale + color | P0 |
| 2 | Input | `useInput` | `Input` | `Input` | Focus ring | P0 |
| 3 | Textarea | `useTextarea` | `Textarea` | `Textarea` | Focus ring | P1 |
| 4 | Select | `useSelect` | `Select` | `Select` | List enter/exit | P0 |
| 5 | Checkbox | `useCheckbox` | `Checkbox` | `Checkbox` | Check draw + scale | P1 |
| 6 | Radio Group | `useRadioGroup` | `RadioGroup` | `RadioGroup` | Dot scale | P1 |
| 7 | Switch / Toggle | `useSwitch` | `Switch` | `Switch` | Thumb slide + color | P1 |
| 8 | Slider | `useSlider` | `Slider` | `Slider` | Thumb drag + track fill | P2 |
| 9 | Combobox / Autocomplete | `useCombobox` | `Combobox` | `Combobox` | List enter + option stagger | P1 |
| 10 | DatePicker | `useDatePicker` | `DatePicker` | `DatePicker` | Calendar popover + day hover | P2 |
| 11 | ColorPicker | `useColorPicker` | `ColorPicker` | `ColorPicker` | Swatch scale + popover | P3 |
| 12 | FileUpload | `useFileUpload` | `FileUpload` | `FileUpload` | Drag highlight + progress | P2 |
| 13 | PinInput / OTP | `usePinInput` | `PinInput` | `PinInput` | Digit enter + focus shift | P2 |
| 14 | Rating | `useRating` | `Rating` | `Rating` | Star fill + stagger | P3 |
| **Overlays** |
| 15 | Dialog / Modal | `useDialog` | `Dialog` | `Dialog` | Backdrop fade + panel scale | P0 |
| 16 | Drawer / Sheet | `useDrawer` | `Drawer` | `Drawer` | Gesture-driven slide + rubberband | P1 |
| 17 | Popover | `usePopover` | `Popover` | `Popover` | Fade + slide + arrow | P1 |
| 18 | Tooltip | `useTooltip` | `Tooltip` | `Tooltip` | Fade + slide + delay | P1 |
| 19 | Context Menu | `useContextMenu` | `ContextMenu` | `ContextMenu` | Scale + fade origin | P2 |
| 20 | Toast / Notification | `useToast` | `Toast` | `Toast` | Slide in + stack + auto-dismiss | P1 |
| 21 | Command Palette | `useCommand` | `Command` | `Command` | Overlay fade + list filter + selection | P3 |
| **Navigation** |
| 22 | Tabs | `useTabs` | `Tabs` | `Tabs` | Indicator slide + content fade | P1 |
| 23 | Breadcrumbs | `useBreadcrumbs` | `Breadcrumbs` | `Breadcrumbs` | Separator + hover | P2 |
| 24 | Pagination | `usePagination` | `Pagination` | `Pagination` | Page transition + number scale | P2 |
| 25 | Stepper / Wizard | `useStepper` | `Stepper` | `Stepper` | Step transition + check draw | P2 |
| 26 | Link | `useLink` | `Link` | `Link` | Underline draw + color | P2 |
| **Data Display** |
| 27 | Avatar | `useAvatar` | `Avatar` | `Avatar` | Image load fade + fallback | P1 |
| 28 | Badge | `useBadge` | `Badge` | `Badge` | Count change pulse | P1 |
| 29 | Card | — | `Card` | `Card` | Hover lift + shadow | P1 |
| 30 | Table / DataTable | `useDataTable` | `DataTable` | `DataTable` | Row hover + sort indicator + virtual scroll | P1 |
| 31 | List / ListBox | `useListBox` | `ListBox` | `ListBox` | Option hover + selection check | P2 |
| 32 | Tree / TreeView | `useTreeView` | `TreeView` | `TreeView` | Expand/collapse rotate + child stagger | P2 |
| 33 | Tag / Chip | `useTag` | `Tag` | `Tag` | Dismiss scale + enter stagger | P1 |
| 34 | Progress Bar | `useProgressBar` | `ProgressBar` | `ProgressBar` | Fill width + indeterminate shimmer | P2 |
| 35 | Skeleton | — | `Skeleton` | `Skeleton` | Shimmer pulse | P1 |
| 36 | Divider | — | `Divider` | `Divider` | — | P2 |
| 37 | KBD | — | `KBD` | `KBD` | — | P3 |
| 38 | Timeline | `useTimeline` | `Timeline` | `Timeline` | Item enter stagger + line draw | P3 |
| **Feedback** |
| 39 | Alert / Banner | `useAlert` | `Alert` | `Alert` | Slide in + icon pulse | P2 |
| 40 | Empty State | — | `EmptyState` | `EmptyState` | Illustration fade + content stagger | P3 |
| 41 | Loading Spinner | — | `Spinner` | `Spinner` | Rotate + dash animation | P2 |
| **Layout** |
| 42 | Accordion | `useAccordion` | `Accordion` | `Accordion` | Content height expand + chevron rotate | P1 |
| 43 | Collapsible | `useCollapsible` | `Collapsible` | `Collapsible` | Height animation | P2 |
| 44 | Separator | — | `Separator` | `Separator` | — | P3 |
| 45 | Aspect Ratio | — | `AspectRatio` | `AspectRatio` | — | P3 |
| 46 | Container | — | `Container` | `Container` | — | P3 |
| 47 | Flex / Stack | — | `Flex` | `Flex` | — | P3 |
| 48 | Grid | — | `Grid` | `Grid` | — | P3 |
| 49 | ScrollArea | `useScrollArea` | `ScrollArea` | `ScrollArea` | Fade edges + scrollbar | P2 |
| **Utilities** |
| 50 | VisuallyHidden | — | `VisuallyHidden` | `VisuallyHidden` | — | P2 |
| 51 | FocusTrap | `useFocusTrap` | `FocusTrap` | `FocusTrap` | — | P1 |
| 52 | Portal | `usePortal` | `Portal` | `Portal` | — | P2 |
| 53 | Announcer | `useAnnouncer` | `Announcer` | `Announcer` | — | P2 |
| 54 | ThemeProvider | `useTheme` | `ThemeProvider` | `ThemeProvider` | Token transition | P0 |
| 55 | MotionProvider | — | `MotionProvider` | `MotionProvider` | Global motion config | P0 |

### Priority Legend

- **P0** — Ship first. Core components. Every app needs these.
- **P1** — Ship second. High-use components. Most apps need most of these.
- **P2** — Ship third. Specialized but common. Fills out the library.
- **P3** — Ship last. Nice-to-have. Completes the Prime UI replacement.

---

## Project Plan

### Phase 0 — Foundation (Week 1)

**Goal:** Monorepo, tooling, CI, token pipeline working.

- [ ] Initialize pnpm workspace + Turborepo
- [ ] TypeScript strict config (shared across packages)
- [ ] ESLint + Prettier config (shared)
- [ ] CI pipeline: lint → typecheck → test → build (GitHub Actions)
- [ ] Changeset versioning setup
- [ ] Token CLI: YML → TypeScript token generation
- [ ] Token CLI: YML → Kotlin token generation
- [ ] Token CLI: YML → Swift token generation
- [ ] `@intigo-ui/tokens` package with generated output
- [ ] Default theme YML (light + dark)
- [ ] Token documentation

### Phase 1 — Headless Core (Week 2-3)

**Goal:** All P0 + P1 headless hooks implemented and tested.

- [ ] `@intigo-ui/headless` package setup
- [ ] Shared utilities: `useControlled`, `useId`, `useTypeahead`, `mergeProps`, `chainFns`
- [ ] **P0 hooks:** `useButton`, `useInput`, `useSelect`, `useDialog`, `useTheme`
- [ ] **P1 hooks:** `useCheckbox`, `useRadioGroup`, `useSwitch`, `useCombobox`, `useTabs`, `useToast`, `useAccordion`, `useFocusTrap`
- [ ] Keyboard navigation engine (roving tabindex, arrow keys, typeahead)
- [ ] ARIA attribute generation per component
- [ ] Focus management (trap, restore, focusVisible)
- [ ] Unit tests for every hook
- [ ] Accessibility audit (axe-core + manual screen reader)

### Phase 2 — Web Renderer (Week 3-4)

**Goal:** P0 + P1 web primitives + styled components.

- [ ] `@intigo-ui/primitives-web` package setup
- [ ] Compound component part system (Root, Trigger, List, Option, etc.)
- [ ] **P0 primitives:** Button, Input, Select, Dialog, ThemeProvider
- [ ] **P1 primitives:** Checkbox, RadioGroup, Switch, Combobox, Tabs, Toast, Accordion, Avatar, Badge, Card, DataTable, Tag, Skeleton
- [ ] `@intigo-ui/web` styled package (primitives + token theme applied)
- [ ] CSS variable generation from tokens
- [ ] Tailwind plugin for token integration
- [ ] Dark mode via class + system preference
- [ ] Component snapshot tests
- [ ] Visual regression tests (Chromatic/Percy)

### Phase 3 — Native Renderer (Week 4-5)

**Goal:** P0 + P1 native primitives + styled components.

- [ ] `@intigo-ui/primitives-native` package setup
- [ ] **P0 primitives:** Button, Input, Select, Dialog, ThemeProvider
- [ ] **P1 primitives:** Checkbox, RadioGroup, Switch, Combobox, Tabs, Toast, Accordion, Avatar, Badge, Card, DataTable, Tag, Skeleton
- [ ] `@intigo-ui/native` styled package
- [ ] StyleSheet generation from tokens
- [ ] Dark mode via Appearance API
- [ ] Safe area handling
- [ ] Platform-specific touch feedback (Android ripple, iOS opacity)
- [ ] Metro config for monorepo
- [ ] Component tests (React Native Testing Library)

### Phase 4 — Motion System (Week 5-6)

**Goal:** Every P0 + P1 component has its motion preset.

- [ ] `@intigo-ui/motion` package setup
- [ ] Spring configuration presets
- [ ] Duration/easing tokens from theme
- [ ] `prefers-reduced-motion` integration
- [ ] Web motion engine (Framer Motion wrappers)
- [ ] Native motion engine (Reanimated 3 wrappers)
- [ ] Motion per component:
  - Button: press scale (0.97) + spring release
  - Input: focus ring fade-in (150ms ease-out)
  - Select: list enter (stagger children, 30ms per option)
  - Dialog: backdrop fade (200ms) + panel scale-in (spring snappy)
  - Checkbox: check mark draw + box scale bounce
  - Switch: thumb slide (spring) + track color transition
  - Tabs: indicator slide (spring) + content crossfade
  - Toast: slide-in from right + stack + auto-dismiss shrink
  - Accordion: content height expand (spring) + chevron rotate
  - Avatar: image load fade (300ms)
  - Badge: count change pulse (scale 1.3 → 1.0, spring)
  - Card: hover lift (translateY -2px + shadow increase)
  - DataTable: row hover highlight + sort arrow rotate
  - Tag: dismiss scale-to-0 + siblings slide
  - Skeleton: shimmer animation (gradient translate)
- [ ] `MotionProvider` for global config
- [ ] Per-component `motion` prop to override/customize/disable

### Phase 5 — Remaining Components (Week 6-8)

**Goal:** P2 + P3 components across all layers.

- [ ] **P2 headless:** `useSlider`, `useDatePicker`, `useFileUpload`, `usePinInput`, `useBreadcrumbs`, `usePagination`, `useStepper`, `useListBox`, `useTreeView`, `useProgressBar`, `useAlert`, `useCollapsible`, `useScrollArea`, `usePortal`, `useAnnouncer`, `useDrawer`, `usePopover`, `useTooltip`, `useContextMenu`
- [ ] **P2 web primitives + styled:** all above
- [ ] **P2 native primitives + styled:** all above
- [ ] **P2 motion:** all above with presets
- [ ] **P3 components:** ColorPicker, Rating, Command, Timeline, EmptyState, Spinner, Separator, AspectRatio, Container, Flex, Grid, KBD
- [ ] **P3 motion presets**

### Phase 6 — Documentation & Showcase (Week 8-10)

**Goal:** World-class docs site that doubles as a portfolio piece.

- [ ] Documentation site (Next.js, MDX)
- [ ] Component pages: API table, live playground, code examples, motion demo
- [ ] Theme editor (interactive YML → live preview)
- [ ] Motion lab (tweak springs, see results in real-time)
- [ ] Accessibility statement per component
- [ ] Migration guide (Prime UI → Intigo UI)
- [ ] Showcase app (Expo + Next.js): demo app using every component
- [ ] Storybook integration for development
- [ ] Figma design kit (synced with token YML)

### Phase 7 — Polish & Launch (Week 10-12)

**Goal:** Production-ready, documented, tested, published.

- [ ] Bundle size audit and optimization (tree-shaking verification)
- [ ] Performance profiling (render count, layout thrashing)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device testing (iOS, Android, tablets)
- [ ] Accessibility audit pass (WCAG 2.2 AA)
- [ ] Security audit (no vulnerable deps, XSS-safe)
- [ ] npm publish (`@intigo-ui/*` packages)
- [ ] Launch blog post
- [ ] Social proof (demo video, comparison with Prime UI)
- [ ] Open source community setup (contributing guide, code of conduct, issue templates)

---

## Package Summary

| Package | npm Name | Description |
|---|---|---|
| Headless | `@intigo-ui/headless` | Pure React hooks for component logic, state, ARIA, and keyboard |
| Tokens | `@intigo-ui/tokens` | Generated token files (TS, JSON, Kotlin, Swift) from YML |
| Motion | `@intigo-ui/motion` | Spring presets, duration tokens, animation wrappers for web + native |
| Utils | `@intigo-ui/utils` | Shared utilities: mergeProps, useId, useControlled, etc. |
| CLI | `@intigo-ui/cli` | Token generation CLI: YML → multi-platform output |
| Primitives Web | `@intigo-ui/primitives-web` | Unstyled composable web components |
| Primitives Native | `@intigo-ui/primitives-native` | Unstyled composable native components |
| Styled Web | `@intigo-ui/web` | Themed web components, ready to use |
| Styled Native | `@intigo-ui/native` | Themed native components, ready to use |

---

## What Makes This Employer-Worthy

1. **Architecture depth.** Three-layer separation. Headless hooks. Platform-specific renderers. Token pipeline. This is not another Tailwind component dump — it's a real design system.

2. **Open source from day one.** MIT licensed. Community-ready. Proper contribution guide. CI/CD. Changesets. npm publishing.

3. **Cross-platform that actually works.** Not "write once, pray it renders." Deliberate, tested, platform-respecting renderers.

4. **Motion as a first-class citizen.** Every component animated. Spring physics. Reduced motion support. Configurable. This is what separates good from premium.

5. **Token pipeline that's real.** YML → TypeScript, Kotlin, Swift. Not a gimmick — a working multi-platform token system that a design team could actually use.

6. **Documentation that sells.** Live playground. Theme editor. Motion lab. Showcase apps. This is what you show in an interview.

7. **Scope.** 55 components. 3 layers. 2 platforms. 1 token pipeline. This is a complete Prime UI replacement — not a weekend project.

---

## Quick Start

```bash
npm install
npm run showcase
```

## License

MIT © Intigo UI contributors
