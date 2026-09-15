import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTabs } from '../useTabs';

describe('useTabs', () => {
  it('returns undefined value by default', () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.value).toBeUndefined();
  });

  it('supports controlled value', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ value: 'account', onValueChange })
    );
    expect(result.current.value).toBe('account');
  });

  it('supports defaultValue', () => {
    const { result } = renderHook(() =>
      useTabs({ defaultValue: 'billing' })
    );
    expect(result.current.value).toBe('billing');
  });

  it('calls onValueChange when selecting a tab', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ value: 'account', onValueChange })
    );
    act(() => { result.current.selectTab('billing'); });
    expect(onValueChange).toHaveBeenCalledWith('billing');
  });

  it('returns tablist props with role="tablist"', () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.tablistProps.role).toBe('tablist');
  });

  it('sets aria-orientation on tablist', () => {
    const { result } = renderHook(() => useTabs({ orientation: 'horizontal' }));
    expect(result.current.tablistProps['aria-orientation']).toBe('horizontal');
  });

  it('returns tab props with role="tab"', () => {
    const { result } = renderHook(() => useTabs({ value: 'account' }));
    const tabProps = result.current.getTabProps('account');
    expect(tabProps.role).toBe('tab');
    expect(tabProps['aria-selected']).toBe(true);
  });

  it('sets aria-selected=false for non-active tab', () => {
    const { result } = renderHook(() => useTabs({ value: 'account' }));
    const tabProps = result.current.getTabProps('billing');
    expect(tabProps['aria-selected']).toBe(false);
  });

  it('returns panel props with role="tabpanel"', () => {
    const { result } = renderHook(() => useTabs({ value: 'account' }));
    const panelProps = result.current.getPanelProps('account');
    expect(panelProps.role).toBe('tabpanel');
  });

  it('supports vertical orientation', () => {
    const { result } = renderHook(() => useTabs({ orientation: 'vertical' }));
    expect(result.current.tablistProps['aria-orientation']).toBe('vertical');
  });

  it('supports activationMode="manual"', () => {
    const { result } = renderHook(() =>
      useTabs({ activationMode: 'manual' })
    );
    expect(result.current.activationMode).toBe('manual');
  });

  it('handles keyboard navigation', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ value: 'tab1', tabs: ['tab1', 'tab2', 'tab3'], onValueChange })
    );
    act(() => {
      result.current.tablistProps.onKeyDown({ key: 'ArrowRight' } as React.KeyboardEvent);
    });
    expect(onValueChange).toHaveBeenCalledWith('tab2');
  });

  it('wraps around with arrow keys', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ value: 'tab3', tabs: ['tab1', 'tab2', 'tab3'], onValueChange })
    );
    act(() => {
      result.current.tablistProps.onKeyDown({ key: 'ArrowRight' } as React.KeyboardEvent);
    });
    expect(onValueChange).toHaveBeenCalledWith('tab1');
  });
});
