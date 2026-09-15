# Announcer

> **Headless hook:** `useAnnouncer`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Announces messages to screen readers without visual output. Used internally by Toast, Alert, and async operations. Supports polite and assertive announcement modes.

## API

### `useAnnouncer()`

Returns `{ announce }`.

```ts
const { announce } = useAnnouncer();

announce("File uploaded successfully.");                    // polite (default)
announce("Connection lost. Retrying...", "assertive");      // assertive
announce("5 new messages", "polite", 2000);                 // delayed
```

### `Announcer.Provider`

Wraps the app. Renders a visually hidden live region.

## Behavior

- Renders two visually hidden `<div>` elements with `aria-live="polite"` and `aria-live="assertive"`
- Updates content to trigger screen reader announcement
- Clears content after announcement to allow re-announcing the same text
- Respects `prefers-reduced-motion` (no effect on announcements — they're not visual)

## Usage

```tsx
<Announcer.Provider>
  <App />
</Announcer.Provider>
```
