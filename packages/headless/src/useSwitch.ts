/**
 * useSwitch — headless hook for Switch component.
 * Binary on/off toggle with animated thumb.
 */
import { useState, useCallback } from 'react';
import { useControlled } from '@intigo-ui/utils';

interface UseSwitchOptions {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface UseSwitchReturn {
  isChecked: boolean;
  getRootProps: () => Record<string, unknown>;
  getThumbProps: () => Record<string, unknown>;
  toggle: () => void;
  isDisabled: boolean;
}

export function useSwitch(options: UseSwitchOptions = {}): UseSwitchReturn {
  const {
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    size = 'md',
  } = options;

  const [isChecked, setIsChecked] = useControlled({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const toggle = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked, setIsChecked]);

  return {
    isChecked,
    isDisabled: disabled,
    getRootProps: () => ({
      role: 'switch',
      'aria-checked': isChecked,
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      },
      onClick: disabled ? undefined : toggle,
    }),
    getThumbProps: () => ({ 'aria-hidden': 'true' }),
    toggle,
  };
}
