/**
 * useButton — headless hook for Button component.
 * Returns accessibility-compliant button props.
 */
import { useCallback } from 'react';

interface UseButtonOptions {
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onPress?: () => void;
  ariaLabel?: string;
}

interface UseButtonReturn {
  buttonProps: {
    role: 'button';
    'aria-disabled': boolean;
    'aria-busy': boolean;
    disabled: boolean;
    type: 'button' | 'submit' | 'reset';
    onClick: (e: React.MouseEvent) => void;
    'aria-label'?: string;
  };
}

export function useButton(options: UseButtonOptions = {}): UseButtonReturn {
  const { disabled = false, loading = false, type = 'button', onPress, ariaLabel } = options;

  const isDisabled = disabled || loading;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onPress?.();
    },
    [isDisabled, onPress]
  );

  return {
    buttonProps: {
      role: 'button',
      'aria-disabled': isDisabled,
      'aria-busy': loading,
      disabled: isDisabled,
      type,
      onClick: handleClick,
      ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
    },
  };
}
