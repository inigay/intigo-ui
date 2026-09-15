/**
 * useAccordion — headless hook for Accordion component.
 * Supports single or multiple open items with animated expand/collapse.
 */
import { useState, useCallback } from 'react';
import { useControlled } from '@intigo-ui/utils';

interface UseAccordionOptions {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
}

interface UseAccordionReturn {
  openItems: string[];
  getItemProps: (value: string, disabled?: boolean) => Record<string, unknown>;
  getTriggerProps: (value: string, disabled?: boolean) => Record<string, unknown>;
  getPanelProps: (value: string) => Record<string, unknown>;
  toggle: (value: string) => void;
}

export function useAccordion(options: UseAccordionOptions = {}): UseAccordionReturn {
  const {
    value,
    defaultValue,
    onValueChange,
    type = 'single',
    collapsible = true,
  } = options;

  const normalize = (v: string | string[] | undefined): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  const [openItems, setOpenItems] = useControlled<string[]>({
    value: normalize(value),
    defaultValue: normalize(defaultValue),
    onChange: (v) => onValueChange?.(type === 'single' ? v[0] : v),
  });

  const toggle = useCallback(
    (itemValue: string) => {
      const isOpen = openItems.includes(itemValue);

      if (type === 'multiple') {
        if (isOpen) {
          setOpenItems(openItems.filter((v) => v !== itemValue));
        } else {
          setOpenItems([...openItems, itemValue]);
        }
      } else {
        if (isOpen && collapsible) {
          setOpenItems([]);
        } else if (!isOpen) {
          setOpenItems([itemValue]);
        }
      }
    },
    [openItems, type, collapsible, setOpenItems]
  );

  const getItemProps = (_value: string, _disabled?: boolean) => ({});

  const getTriggerProps = (itemValue: string, disabled?: boolean) => {
    const isOpen = openItems.includes(itemValue);
    return {
      'aria-expanded': isOpen,
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      onClick: disabled ? undefined : () => toggle(itemValue),
      onKeyDown: (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          toggle(itemValue);
        }
      },
    };
  };

  const getPanelProps = (itemValue: string) => {
    const isOpen = openItems.includes(itemValue);
    return {
      role: 'region',
      'aria-labelledby': `accordion-trigger-${itemValue}`,
      id: `accordion-panel-${itemValue}`,
      hidden: !isOpen,
    };
  };

  return {
    openItems,
    getItemProps,
    getTriggerProps,
    getPanelProps,
    toggle,
  };
}
