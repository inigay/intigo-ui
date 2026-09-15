/**
 * useTabs — headless hook for Tabs component.
 * Manages active tab, keyboard navigation, and panel visibility.
 */
import { useState, useCallback, useRef } from 'react';
import { useControlled } from '@intigo-ui/utils';

interface UseTabsOptions {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
}

interface UseTabsReturn {
  activeTab: string;
  getTabListProps: () => Record<string, unknown>;
  getTabProps: (value: string, index: number) => Record<string, unknown>;
  getPanelProps: (value: string) => Record<string, unknown>;
  setActiveTab: (value: string) => void;
  tabValues: string[];
}

export function useTabs(options: UseTabsOptions = {}): UseTabsReturn {
  const {
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
  } = options;

  const [activeTab, setActiveTab] = useControlled({
    value,
    defaultValue: defaultValue || '',
    onChange: onValueChange,
  });

  const tabValuesRef = useRef<string[]>([]);
  const listId = useRef(`tabs-list-${Math.random().toString(36).slice(2)}`).current;

  const registerTab = useCallback((val: string) => {
    if (!tabValuesRef.current.includes(val)) {
      tabValuesRef.current.push(val);
    }
  }, []);

  const getTabListProps = () => ({
    role: 'tablist',
    'aria-orientation': orientation,
    id: listId,
  });

  const getTabProps = (tabValue: string, index: number) => {
    registerTab(tabValue);
    const isSelected = activeTab === tabValue;
    const tabs = tabValuesRef.current;
    return {
      role: 'tab',
      'aria-selected': isSelected,
      'aria-controls': `panel-${tabValue}`,
      id: `tab-${tabValue}`,
      tabIndex: isSelected ? 0 : -1,
      onClick: () => setActiveTab(tabValue),
      onKeyDown: (e: React.KeyboardEvent) => {
        const dir = orientation === 'horizontal' ? ['ArrowRight', 'ArrowLeft'] : ['ArrowDown', 'ArrowUp'];
        if (e.key === dir[0]) {
          e.preventDefault();
          setActiveTab(tabs[(index + 1) % tabs.length]);
        } else if (e.key === dir[1]) {
          e.preventDefault();
          setActiveTab(tabs[(index - 1 + tabs.length) % tabs.length]);
        } else if (e.key === 'Home') {
          e.preventDefault();
          setActiveTab(tabs[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          setActiveTab(tabs[tabs.length - 1]);
        }
      },
    };
  };

  const getPanelProps = (tabValue: string) => ({
    role: 'tabpanel',
    id: `panel-${tabValue}`,
    'aria-labelledby': `tab-${tabValue}`,
    hidden: activeTab !== tabValue,
    tabIndex: 0,
  });

  return {
    activeTab,
    getTabListProps,
    getTabProps,
    getPanelProps,
    setActiveTab,
    tabValues: tabValuesRef.current,
  };
}
