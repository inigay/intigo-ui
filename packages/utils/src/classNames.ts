type ClassValue = string | number | boolean | undefined | null | Record<string, boolean | undefined | null> | ClassValue[];

/**
 * Merge class names, similar to clsx.
 * Handles strings, arrays, objects, and falsy values.
 */
export function classNames(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      const inner = classNames(...arg);
      if (inner) classes.push(inner);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) classes.push(key);
      }
    }
  }

  return classes.join(' ').trim();
}
