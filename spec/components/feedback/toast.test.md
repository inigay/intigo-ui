# Toast / Notification — Test Specification

> **Source spec:** `toast.md`  
> **Component:** Toast (info, success, warning, error, loading, promise variants; auto-dismiss; progress bar)

---

## E2E Tests

### Variants
- [ ] `variant="info"` renders with blue icon and styling
- [ ] `variant="success"` renders with green check icon
- [ ] `variant="warning"` renders with amber warning icon
- [ ] `variant="error"` renders with red X icon
- [ ] `variant="loading"` renders with spinner
- [ ] `variant="promise"` auto-resolves based on promise state

### Structure
- [ ] `Toast.Title` renders bold heading
- [ ] `Toast.Description` renders body text
- [ ] `Toast.Icon` renders variant-specific icon
- [ ] `Toast.Action` renders a clickable action button
- [ ] `Toast.Close` renders dismiss button
- [ ] `Toast.ProgressBar` renders auto-dismiss timer bar

### Auto-dismiss
- [ ] Toast auto-dismisses after `duration` ms (default 5000)
- [ ] `duration={0}` makes toast persistent (no auto-dismiss)
- [ ] Progress bar animates width 100% → 0% over duration (linear)
- [ ] Hovering over toast pauses progress bar
- [ ] Toast can be manually dismissed via close button before auto-dismiss

### Queue & stacking
- [ ] Multiple toasts stack in viewport position
- [ ] `maxVisible` limits number of visible toasts (default 5)
- [ ] New toasts push older toasts up (stack animation)
- [ ] When max is exceeded, oldest toast is removed

### Positioning
- [ ] `position="top-right"` renders toasts at top-right
- [ ] `position="top-left"` renders correctly
- [ ] `position="bottom-right"` renders correctly
- [ ] `position="bottom-left"` renders correctly
- [ ] `position="top-center"` renders correctly
- [ ] `position="bottom-center"` renders correctly

### Motion
- [ ] Enter: slide in from right + fade in, spring snappy, 300ms
- [ ] Exit: slide out to right + fade out, 200ms ease-in
- [ ] Stack: existing toasts slide up to make room, spring gentle, 250ms
- [ ] `motion={false}` disables animations

---

## Integration Tests

### useToast hook
- [ ] `toast()` function creates a new toast
- [ ] `dismiss(id)` dismisses a specific toast by ID
- [ ] `toasts` array reflects current visible toasts
- [ ] Toast.Provider wraps app and provides context

### With other components
- [ ] Toast action button uses Button component, fires correctly
- [ ] Toast triggered from a form submit success/error flow
- [ ] Toast triggered from async operation (loading → success/error)
- [ ] Multiple concurrent toasts from different app sections don't conflict

### Promise variant
- [ ] Promise toast shows loading state initially
- [ ] Resolves to success variant when promise resolves
- [ ] Resolves to error variant when promise rejects
- [ ] Action callback works inside promise toast

---

## Accessibility Tests

- [ ] Info/success toasts: `role="status"`, `aria-live="polite"`
- [ ] Error/warning toasts: `role="alert"`, `aria-live="assertive"`
- [ ] Close button: `aria-label="Close notification"`
- [ ] Focus is NOT moved to toast on appearance (non-intrusive)
- [ ] Toast content is announced by screen readers without interrupting current task
- [ ] Action button inside toast is keyboard accessible
- [ ] Progress bar is hidden from screen readers (decorative)
- [ ] Color contrast: toast text and icons meet WCAG AA
- [ ] Toast is dismissible via Escape key when focused

---

## Visual Regression

- [ ] All variant × position combinations render correctly
- [ ] Stack animation is smooth, no overlapping or gap issues
- [ ] Progress bar animation is smooth and linear
- [ ] Toast width is constrained, long text wraps correctly
- [ ] Toast has correct border-radius, shadow, and spacing
- [ ] Responsive: on mobile, toasts are full-width or appropriately sized
