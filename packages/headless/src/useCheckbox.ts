/**
 * useCheckbox — headless hook for Checkbox component.
 * Supports checked, unchecked, and indeterminate states.
 */
import { useState, useCallback } from 'react';
import { useControlled } from '@intigo-ui/utils';

interface UseCheckboxOptions {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
}

interface UseCheckboxReturn {
  isChecked: boolean | 'indeterminate';
  getRootProps: () => Record<string, unknown>;
  getIndicatorProps: () => Record<string, unknown>;
  toggle: () => void;
  isDisabled: boolean;
}

export function useCheckbox(options: UseCheckboxOptions = {}): UseCheckboxReturn {
  const {
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
  } = options;

  const [isChecked, setIsChecked] = useControlled<boolean | 'indeterminate'>({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const toggle = useCallback(() => {
    if (isChecked === 'indeterminate') {
      setIsChecked(true);
    } else {
      setIsChecked(!isChecked);
    }
  }, [isChecked, setIsChecked]);

  return {
    isChecked,
    isDisabled: disabled,
    getRootProps: () => ({
      role: 'checkbox',
      'aria-checked': isChecked,
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          toggle();
        }
      },
      onClick: disabled ? undefined : toggle,
    }),
    getIndicatorProps: () => ({
      'aria-hidden': 'true',
    }),
    toggle,
  };
}
