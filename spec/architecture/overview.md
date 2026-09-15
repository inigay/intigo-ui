# Architecture Specification

## Layers

Intigo UI is a three-layer component library, modeled on Prime UI v11.

```
┌─────────────────────────────────┐
│         YOUR APPLICATION        │
├─────────────────────────────────┤
│  STYLED WEB       STYLED NATIVE │  ← @intigo-ui/web / @intigo-ui/native
│  (themed, ready)  (themed, ready)│
├─────────────────────────────────┤
│  PRIMITIVES WEB   PRIMITIVES NATIVE│ ← @intigo-ui/primitives-web / -native
│  (unstyled parts) (unstyled parts) │
├─────────────────────────────────┤
│            HEADLESS              │  ← @intigo-ui/headless
│     (pure hooks, 100% shared)    │
├─────────────────────────────────┤
│            TOKENS                │  ← @intigo-ui/tokens
│     (design data from YML)      │
└─────────────────────────────────┘
```

### Layer 1: Tokens (`@intigo-ui/tokens`)

- Generated from a single YML file
- Outputs: TypeScript, JSON, Kotlin, Swift
- Three tiers: primitive → semantic → component
- No runtime dependencies
- Version-controlled generated files

### Layer 2: Headless (`@intigo-ui/headless`)

- Pure React hooks with ZERO platform imports
- No `document`, no `window`, no `View`, no `useWindowDimensions`
- Each hook: state machine + keyboard nav + ARIA prop generation
- Hooks return prop getters, not rendered elements
- Independently usable — consumers can build their own UI on top

### Layer 3: Primitives (`@intigo-ui/primitives-web`, `@intigo-ui/primitives-native`)

- Thin renderers that consume headless hooks
- Compound component pattern (Root, Trigger, List, Option, etc.)
- Web: semantic HTML elements (`<button>`, `<dialog>`, `<input>`)
- Native: React Native primitives (`<Pressable>`, `<View>`, `<TextInput>`)
- Unstyled — no CSS/StyleSheet applied
- Same component API across platforms

### Layer 4: Styled (`@intigo-ui/web`, `@intigo-ui/native`)

- Wraps primitives with token-based styling
- Web: CSS variables + Tailwind plugin
- Native: StyleSheet + token context
- Ships with default theme (light + dark)
- Themeable via `ThemeProvider` and token overrides

### Supporting Packages

- `@intigo-ui/motion` — Spring presets, animation wrappers, reduced-motion support
- `@intigo-ui/utils` — `mergeProps`, `useId`, `useControlled`, `useTypeahead`, `chainFns`
- `@intigo-ui/cli` — Token generation CLI: `intigo tokens build theme.yml`

## Component Architecture

Every component follows this pattern:

```
Headless Hook (pure logic)
    ↓
Primitive Parts (platform renderer, unstyled)
    ↓
Styled Parts (platform renderer, themed)
    ↓
Motion Wrapper (animation preset)
```

### Headless Hook Contract

```ts
// Every hook follows this contract:
function useComponentName(props: ComponentProps): {
  // State
  isOpen: boolean;
  value: T;
  
  // Prop getters (spread onto elements)
  getRootProps: () => HTMLProps / RNProps;
  getTriggerProps: () => HTMLProps / RNProps;
  // ... part-specific getters
  
  // Actions
  open: () => void;
  close: () => void;
  toggle: () => void;
}
```

### Compound Part Pattern

Multi-element components are split into named parts:

```tsx
<Select.Root>       {/* State, data props */}
  <Select.Trigger>  {/* Click target */}
    <Select.Value />  {/* Display value */}
  </Select.Trigger>
  <Select.Popup>    {/* Floating list */}
    <Select.List />   {/* Options */}
  </Select.Popup>
</Select.Root>
```

Each part is independently importable and customizable. Parts accept `className`, `style`, `ref`, and event handlers.

### Prop Getter Pattern

Instead of rendering elements internally, hooks return prop objects that consumers spread:

```ts
const { getTriggerProps } = useSelect({ options, value });

// Consumer spreads onto their element:
<button {...getTriggerProps()}>Select...</button>
```

This is how Prime UI achieves headless mode — the hook owns behavior, the consumer owns markup.

## Monorepo Structure

```
intigo-ui/
├── packages/
│   ├── headless/          # @intigo-ui/headless
│   ├── tokens/            # @intigo-ui/tokens
│   ├── motion/            # @intigo-ui/motion
│   ├── utils/             # @intigo-ui/utils
│   ├── cli/               # @intigo-ui/cli
│   ├── primitives-web/    # @intigo-ui/primitives-web
│   ├── primitives-native/ # @intigo-ui/primitives-native
│   ├── web/               # @intigo-ui/web
│   └── native/            # @intigo-ui/native
├── apps/
│   ├── showcase-web/      # Next.js demo
│   ├── showcase-mobile/   # Expo demo
│   └── docs/              # Documentation site
├── configs/
│   └── theme.yml          # Default theme (source of truth)
├── spec/                  # Component specifications (this directory)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Dependency Flow

```
tokens → headless → primitives → styled
                    → utils
                    → motion
```

- `tokens` depends on nothing
- `headless` depends on `utils`
- `primitives` depends on `headless` + `utils`
- `styled` depends on `primitives` + `tokens` + `motion`
- Apps depend on `styled` + `tokens`
- Nothing circular

## Build & Distribution

- Each package ships TypeScript source (`"main": "./src/index.ts"`)
- Consuming apps' bundlers compile (Next.js SWC, Metro, etc.)
- No pre-compiled `dist/` — enables tree-shaking and source maps
- pnpm workspace protocol for internal dependencies
- Changesets for versioning and changelogs
- npm publish under `@intigo-ui/*` scope
