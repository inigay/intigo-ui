import { useState, useCallback, useRef } from 'react';

interface UseControlledOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * Hook for controlled/uncontrolled state management.
 * If `value` is provided, the component is controlled.
 * Otherwise, it manages its own state with `defaultValue`.
 */
export function useControlled<T>({
  value,
  defaultValue,
  onChange,
}: UseControlledOptions<T>): [T, (value: T) => void] {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<T>(
    isControlled ? (value as T) : defaultValue as T
  );

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChangeRef.current?.(newValue);
    },
    [isControlled]
  );

  const currentValue = isControlled ? (value as T) : internalValue;

  return [currentValue, setValue];
}
