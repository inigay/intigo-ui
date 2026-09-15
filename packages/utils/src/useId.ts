import { useState, useRef } from 'react';

let idCounter = 0;

/**
 * Generate a unique ID for accessibility attributes.
 * Returns a stable ID across re-renders.
 */
export function useId(prefix = 'intigo'): string {
  const [id] = useState(() => {
    idCounter += 1;
    return `${prefix}-${idCounter}`;
  });
  return id;
}

/**
 * Generate a unique ID (non-hook, for use outside React).
 */
export function generateId(prefix = 'intigo'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
