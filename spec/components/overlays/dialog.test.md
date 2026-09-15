# Dialog / Modal — Test Specification

> **Source spec:** `dialog.md`  
> **Component:** Dialog (modal overlay; focus trap; scroll lock; alert/fullscreen variants)

---

## E2E Tests

### Core behavior
- [ ] Dialog opens when `open={true}` or trigger is clicked
- [ ] Dialog closes when close button is clicked
- [ ] Dialog closes on Escape key (`closeOnEscape={true}`)
- [ ] Dialog closes on overlay click (`closeOnOutsideClick={true}`)
- [ ] `closeOnEscape={false}` prevents Escape from closing
- [ ] `closeOnOutsideClick={false}` prevents overlay click from closing
- [ ] `modal={true}` blocks interaction with background content
- [ ] `modal={false}` allows interaction with background

### Parts
- [ ] `Dialog.Trigger` renders opener element
- [ ] `Dialog.Overlay` renders semi-transparent backdrop
- [ ] `Dialog.Content` renders the dialog panel
- [ ] `Dialog.Header` renders title + close button row
- [ ] `Dialog.Title` renders heading
- [ ] `Dialog.Description` renders accessible description
- [ ] `Dialog.Body` renders scrollable content area
- [ ] `Dialog.Footer` renders action buttons row
- [ ] `Dialog.Close` renders close button

### Variants
- [ ] `dialog` (default): centered modal with backdrop
- [ ] `alert`: small dialog for confirmations (icon + message + 1-2 buttons)
- [ ] `fullscreen`: fills the entire viewport
- [ ] `sheet`: slides up from bottom (see Drawer spec)

### Sizes
- [ ] All size presets render correct width: `sm`, `md`, `lg`, `xl`, `full`
- [ ] `Dialog.Content position="center"` centers vertically
- [ ] `Dialog.Content position="top"` aligns to top
- [ ] `Dialog.Content position="bottom"` aligns to bottom

### Scroll behavior
- [ ] `scrollBehavior="inside"`: content scrolls internally, header + footer sticky
- [ ] `scrollBehavior="outside"`: page scrolls, dialog stays centered
- [ ] Body scroll is locked when dialog is open

### States
- [ ] **Closed:** not rendered (or `display: none`)
- [ ] **Opening:** overlay fades in, content scales + fades in
- [ ] **Open:** fully visible, focus trapped inside
- [ ] **Closing:** overlay fades out, content scales down + fades out

### Motion
- [ ] Overlay enter: opacity 0 → 1, 200ms ease-out
- [ ] Content enter: opacity 0 → 1, scale 0.95 → 1, translateY 10px → 0, spring, 250ms
- [ ] Overlay exit: opacity 1 → 0, 150ms ease-in
- [ ] Content exit: opacity 1 → 0, scale 1 → 0.95, 150ms ease-in
- [ ] Alert variant: content scale 0.9 → 1, spring bouncy, 300ms
- [ ] `motion={false}` disables animations

---

## Integration Tests

### With other components
- [ ] Dialog contains form with Input, Select, Checkbox — all work correctly
- [ ] Dialog.Footer contains Button components — click handlers fire
- [ ] Dialog with DataTable inside Body — table scrolls correctly
- [ ] Dialog with Tabs inside — tab switching works
- [ ] Nested Dialogs (dialog opens another dialog) — focus management works
- [ ] Dialog triggered from a Drawer — z-index layering is correct

### Focus management
- [ ] Focus moves to first focusable element inside dialog on open
- [ ] If no focusable element, focus moves to Dialog.Content
- [ ] Tab cycles through focusable elements inside dialog only (focus trap)
- [ ] Shift+Tab cycles backwards
- [ ] Focus returns to trigger element on close
- [ ] Closing via Escape restores focus
- [ ] Closing via overlay click restores focus

---

## Accessibility Tests

- [ ] Renders as `<dialog>` element on web with `showModal()`
- [ ] Fallback to `<div role="dialog">` for older browsers
- [ ] `role="dialog"`, `aria-modal="true"`
- [ ] `aria-labelledby` points to Dialog.Title ID
- [ ] `aria-describedby` points to Dialog.Description ID
- [ ] Focus trap: Tab/Shift+Tab cycle within dialog only
- [ ] Focus restoration: focus returns to trigger on close
- [ ] Scroll lock: `overflow: hidden` on `<body>` while open
- [ ] Escape key closes (unless `closeOnEscape={false}`)
- [ ] Click outside closes (unless `closeOnOutsideClick={false}`)
- [ ] Overlay has `aria-hidden="true"` (decorative)
- [ ] Alert variant: `role="alertdialog"` for destructive actions
- [ ] Screen reader announces dialog title and description on open
- [ ] Content outside dialog is hidden from accessibility tree (`aria-hidden`)

---

## Visual Regression

- [ ] Overlay: semi-transparent black (50% opacity), covers full viewport
- [ ] Dialog panel: white background, border-radius, box-shadow
- [ ] All size presets render correct width at all viewport sizes
- [ ] Header and footer are sticky during body scroll (inside mode)
- [ ] Close button (X) is positioned correctly in header
- [ ] Alert variant: smaller width, icon centered above message
- [ ] Fullscreen variant: fills entire viewport, no border-radius
- [ ] Open/close animations are smooth, no flickering
- [ ] Responsive: on narrow viewports, dialog uses full width
- [ ] No layout shift when scrollbar disappears (scroll lock)
