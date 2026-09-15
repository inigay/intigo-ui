/**
 * useInput — headless hook for Input/TextField component.
 * Returns props for input, label, description, and state flags.
 */
import { useState, useCallback } from 'react';
import { useId } from '@intigo-ui/utils';

interface UseInputOptions {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  clearable?: boolean;
  showPasswordToggle?: boolean;
}

interface UseInputReturn {
  inputProps: {
    id: string;
    value: string;
    type: string;
    disabled: boolean;
    readOnly: boolean;
    required: boolean;
    'aria-invalid': boolean;
    'aria-describedby': string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  labelProps: {
    htmlFor: string;
  };
  descriptionProps: {
    id: string;
  };
  isInvalid: boolean;
  isDisabled: boolean;
  isClearable: boolean;
  hasValue: boolean;
  showPasswordToggle: boolean;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  clearValue: () => void;
}

export function useInput(options: UseInputOptions = {}): UseInputReturn {
  const {
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    disabled = false,
    readOnly = false,
    required = false,
    invalid = false,
    type = 'text',
    clearable = false,
    showPasswordToggle = false,
  } = options;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const value = isControlled ? controlledValue : internalValue;
  const hasValue = value !== '' && value !== undefined;
  const isDisabled = disabled;
  const isInvalid = invalid;
  const isClearable = clearable && hasValue && !disabled;

  const inputId = useId('input');
  const descId = useId('desc');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return {
    inputProps: {
      id: inputId,
      value,
      type: type === 'password' && isPasswordVisible ? 'text' : type,
      disabled: isDisabled,
      readOnly,
      required,
      'aria-invalid': isInvalid,
      'aria-describedby': descId,
      onChange: handleChange,
    },
    labelProps: {
      htmlFor: inputId,
    },
    descriptionProps: {
      id: descId,
    },
    isInvalid,
    isDisabled,
    isClearable,
    hasValue,
    showPasswordToggle: showPasswordToggle && type === 'password',
    isPasswordVisible,
    togglePasswordVisibility: () => setIsPasswordVisible((v) => !v),
    clearValue: () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onValueChange?.('');
    },
  };
}
