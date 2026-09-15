# Stepper / Wizard

> **Headless hook:** `useStepper`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Multi-step process with numbered steps, progress indicator, and step content panels. Supports linear (must complete step N before N+1) and non-linear (jump between steps) modes, optional steps, and validation per step.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `activeStep` | `number` | — | Controlled step index |
| `onStepChange` | `(step: number) => void` | — | Change handler |
| `steps` | `Step[]` | **required** | Array of { label, description?, optional? } |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout |
| `linear` | `boolean` | `true` | Must complete steps in order |
| `completedSteps` | `number[]` | — | Controlled completed step indices |

## Motion

- Step transition: content crossfade + slight slide (direction-aware), 250ms ease-out
- Step indicator: number → checkmark draw animation, 300ms spring
- Progress bar: width transition between steps, 300ms ease-out
- Active step pulse: subtle glow on current step indicator

## Accessibility

- `role="group"`, `aria-label="Progress"`
- Current step: `aria-current="step"`
- Completed steps: `aria-label="Completed: {label}"`
- Step buttons (non-linear): `role="button"`, `aria-disabled` when locked

## Usage

```tsx
<Stepper.Root activeStep={step} onStepChange={setStep} linear>
  <Stepper.Steps>
    <Stepper.Step label="Account" description="Email and password" />
    <Stepper.Step label="Profile" description="Name and photo" />
    <Stepper.Step label="Billing" description="Payment method" />
  </Stepper.Steps>
  <Stepper.Panels>
    <Stepper.Panel><AccountForm /></Stepper.Panel>
    <Stepper.Panel><ProfileForm /></Stepper.Panel>
    <Stepper.Panel><BillingForm /></Stepper.Panel>
  </Stepper.Panels>
  <Stepper.Actions>
    <Button.Root variant="outline" disabled={step === 0}>Back</Button.Root>
    <Button.Root>{step === 2 ? 'Finish' : 'Next'}</Button.Root>
  </Stepper.Actions>
</Stepper.Root>
```
