/**
 * Merge multiple prop objects, chaining event handlers.
 * Later props override earlier ones, except for className (merged)
 * and event handlers (chained).
 */
type EventKey = string;
type EventValue = (...args: unknown[]) => void;

export function mergeProps(...props: (Record<string, unknown> | undefined)[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const propsObj of props) {
    if (!propsObj) continue;
    for (const key in propsObj) {
      const existing = result[key];
      const next = propsObj[key];

      // Chain event handlers (onXxx functions)
      if (key.startsWith('on') && typeof existing === 'function' && typeof next === 'function') {
        result[key] = (...args: unknown[]) => {
          existing(...args);
          next(...args);
        };
      }
      // Merge className
      else if (key === 'className' && typeof existing === 'string' && typeof next === 'string') {
        result[key] = `${existing} ${next}`;
      }
      // Merge style objects
      else if (key === 'style' && typeof existing === 'object' && typeof next === 'object') {
        result[key] = { ...(existing as object), ...(next as object) };
      }
      // Override
      else {
        result[key] = next;
      }
    }
  }

  return result;
}
