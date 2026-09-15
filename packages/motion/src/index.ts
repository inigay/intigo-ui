/**
 * Animation utilities and types for Intigo UI motion system.
 * Pure CSS-based transitions — no external animation library.
 */

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
}

export interface MotionConfig {
  press?: { scale?: number; spring?: SpringConfig };
  focus?: { duration?: string; easing?: string };
  enter?: { duration?: string; easing?: string };
  exit?: { duration?: string; easing?: string };
}

export const defaultSprings = {
  snappy: { stiffness: 300, damping: 20 },
  gentle: { stiffness: 100, damping: 20 },
  bouncy: { stiffness: 200, damping: 10 },
} as const;

export const defaultDurations = {
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
} as const;

export const easings = {
  snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
  gentle: 'cubic-bezier(0.65, 0, 0.35, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

/**
 * Create a spring-like CSS transition using cubic-bezier approximation.
 * For real spring physics, use a proper animation library.
 */
export function springTransition(
  property: string,
  config: SpringConfig = { stiffness: 300, damping: 20 }
): string {
  const { stiffness = 300, damping = 20 } = config;
  const duration = Math.round(400 / (stiffness / 300));
  return `${property} ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
}

/**
 * Generate CSS keyframes for a shimmer animation.
 */
export function shimmerKeyframes(): string {
  return `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;
}

/**
 * Generate CSS keyframes for a pulse animation.
 */
export function pulseKeyframes(): string {
  return `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
}

/**
 * Generate CSS keyframes for a spinner rotation.
 */
export function spinKeyframes(): string {
  return `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
}
