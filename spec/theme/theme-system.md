# Theme System Specification

## YML-First Token Pipeline

### Why YML?

1. **Human-editable by designers.** No code knowledge required.
2. **Multi-platform output.** One YML generates TypeScript, Kotlin, Swift.
3. **Hierarchical.** Tokens nest naturally: primitive → semantic → component.
4. **Diffable.** Line-based diffs in PRs. A color change is one line.
5. **Tooling-agnostic.** Style Dictionary, Theo, or custom transformers consume YML.

### Token Tiers

```
primitive  →  raw values (hex colors, px sizes, ms durations)
semantic   →  named roles (primary, success, destructive, surface)
component  →  per-component overrides (button.background, input.border)
```

### YML Structure

```yaml
meta:
  name: "Intigo Default"
  version: "1.0.0"

primitive:
  color:         # Raw color palette
    blue: { 50, 100, 200, ..., 900 }
    gray: { 50, 100, 200, ..., 900 }
    red:  { 50, 100, ..., 900 }
    ...
  spacing:       # 4px scale: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64
  radius:        # none, sm, md, lg, xl, full
  typography:    # fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
  motion:        # duration (instant, fast, normal, slow, glacial), easing presets
  shadow:        # sm, md, lg, xl elevation presets

semantic:
  color:         # Maps primitive colors to roles
    primary:     { base, hover, contrast }
    success:     { base }
    destructive: { base }
    surface:     { background, foreground, muted, border }
  radius:        # default → primitive.radius.md
  shadow:        # card, dialog, dropdown, toast → primitive.shadow presets

component:       # Per-component overrides (all optional — fall back to semantic)
  button:        { background, color, radius, paddingX, paddingY, fontSize, ... }
  input:         { background, border, focusBorder, focusRing, radius, ... }
  select:        { ... }
  dialog:        { overlayOpacity, contentShadow, ... }
  ...
```

### Token References

Tokens can reference other tokens using `${path.to.token}` syntax:

```yaml
semantic:
  color:
    primary:
      base: "${primitive.color.blue.500}"
      hover: "${primitive.color.blue.600}"
```

The CLI resolves references at build time. Circular references are detected and reported as errors.

### Build Output

Running `intigo tokens build theme.yml` generates:

```
packages/tokens/src/generated/
├── tokens.ts         # TypeScript: typed token object
├── tokens.json       # JSON: universal consumption
├── Tokens.kt         # Kotlin: Android data class
└── Tokens.swift      # Swift: iOS struct
```

### TypeScript Output Shape

```ts
export const tokens = {
  primitive: {
    color: {
      blue: { 50: "#eff6ff", 100: "#dbeafe", ..., 900: "#1e3a5f" },
      // ...
    },
    spacing: { 0: "0px", 1: "4px", ... },
    // ...
  },
  semantic: {
    color: {
      primary: { base: "#3b82f6", hover: "#2563eb", contrast: "#ffffff" },
      // ...
    },
    // ...
  },
  component: {
    button: {
      background: "#3b82f6",
      color: "#ffffff",
      // ...
    },
    // ...
  },
} as const;

export type Tokens = typeof tokens;
```

### Theme Modes (Light/Dark)

A single theme YML can define both modes:

```yaml
modes:
  light:
    semantic:
      color:
        surface:
          background: "${primitive.color.gray.50}"
          foreground: "${primitive.color.gray.900}"
  dark:
    semantic:
      color:
        surface:
          background: "${primitive.color.gray.900}"
          foreground: "${primitive.color.gray.50}"
```

Or separate files: `theme.light.yml` and `theme.dark.yml`.

### Custom Themes

Users create their own YML, override tokens, and build:

```yaml
# my-brand.yml
extends: "@intigo-ui/tokens/themes/default.yml"

primitive:
  color:
    blue:
      500: "#ff6b35"  # Override primary color

semantic:
  radius:
    default: "${primitive.radius.lg}"  # Rounder corners
```

### CLI Commands

```bash
# Build tokens from YML
intigo tokens build theme.yml -o packages/tokens/src/generated

# Watch mode (rebuild on YML changes)
intigo tokens build theme.yml --watch

# Validate YML without building
intigo tokens validate theme.yml

# Generate a new theme from defaults
intigo tokens init my-theme
```
