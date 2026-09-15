/**
 * useSelect — headless hook for Select component.
 * Manages open state, value, search, and option selection.
 */
import { useState, useCallback, useMemo, useRef } from 'react';
import { useId } from '@intigo-ui/utils';
import { useControlled } from '@intigo-ui/utils';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  [key: string]: unknown;
}

interface UseSelectOptions {
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onValueChange?: (value: string | number | (string | number)[]) => void;
  options?: SelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  searchable?: boolean;
  placeholder?: string;
}

interface UseSelectReturn {
  isOpen: boolean;
  value: string | number | (string | number)[];
  selectedLabels: string[];
  getTriggerProps: () => Record<string, unknown>;
  getListProps: () => Record<string, unknown>;
  getOptionProps: (option: SelectOption) => Record<string, unknown>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  search: string;
  setSearch: (v: string) => void;
  filteredOptions: SelectOption[];
  isDisabled: boolean;
  isInvalid: boolean;
}

export function useSelect(options: UseSelectOptions = {}): UseSelectReturn {
  const {
    value,
    defaultValue,
    onValueChange,
    options: opts = [],
    multiple = false,
    disabled = false,
    invalid = false,
    searchable = false,
  } = options;

  const [controlledValue, setValue] = useControlled<string | number | (string | number)[]>({
    value,
    defaultValue: multiple ? [] : (defaultValue ?? ''),
    onChange: onValueChange,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const triggerId = useId('select-trigger');
  const listId = useId('select-list');

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return opts;
    const lower = search.toLowerCase();
    return opts.filter((o) => o.label.toLowerCase().includes(lower));
  }, [opts, search, searchable]);

  const selectedLabels = useMemo(() => {
    if (multiple && Array.isArray(controlledValue)) {
      return opts
        .filter((o) => (controlledValue as (string | number)[]).includes(o.value))
        .map((o) => o.label);
    }
    const found = opts.find((o) => o.value === controlledValue);
    return found ? [found.label] : [];
  }, [opts, controlledValue, multiple]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);
  const toggle = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const selectValue = useCallback(
    (optionValue: string | number) => {
      if (multiple) {
        const current = Array.isArray(controlledValue) ? controlledValue : [];
        if (current.includes(optionValue)) {
          setValue(current.filter((v) => v !== optionValue) as (string | number)[]);
        } else {
          setValue([...current, optionValue] as (string | number)[]);
        }
      } else {
        setValue(optionValue);
        close();
      }
    },
    [multiple, controlledValue, setValue, close]
  );

  const isSelected = useCallback(
    (optionValue: string | number) => {
      if (multiple && Array.isArray(controlledValue)) {
        return controlledValue.includes(optionValue);
      }
      return controlledValue === optionValue;
    },
    [controlledValue, multiple]
  );

  return {
    isOpen,
    value: controlledValue,
    selectedLabels,
    isDisabled: disabled,
    isInvalid: invalid,
    getTriggerProps: () => ({
      id: triggerId,
      'aria-haspopup': 'listbox',
      'aria-expanded': isOpen,
      'aria-invalid': invalid,
      disabled,
      onClick: disabled ? undefined : toggle,
    }),
    getListProps: () => ({
      id: listId,
      role: 'listbox',
      'aria-multiselectable': multiple,
      'aria-labelledby': triggerId,
    }),
    getOptionProps: (option: SelectOption) => ({
      role: 'option',
      'aria-selected': isSelected(option.value),
      'aria-disabled': option.disabled,
      onClick: () => {
        if (!option.disabled) selectValue(option.value);
      },
    }),
    open,
    close,
    toggle,
    search,
    setSearch,
    filteredOptions,
  };
}
