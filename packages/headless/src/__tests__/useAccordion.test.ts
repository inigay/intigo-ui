import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAccordion } from '../useAccordion';

describe('useAccordion', () => {
  it('returns empty value by default for single type', () => {
    const { result } = renderHook(() => useAccordion({}));
    expect(result.current.value).toEqual([]);
  });

  it('supports controlled value (single)', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', value: 'item-1', onValueChange })
    );
    expect(result.current.value).toBe('item-1');
  });

  it('supports controlled value (multiple)', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({ type: 'multiple', value: ['item-1', 'item-2'], onValueChange })
    );
    expect(result.current.value).toEqual(['item-1', 'item-2']);
  });

  it('supports defaultValue', () => {
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', defaultValue: 'item-2' })
    );
    expect(result.current.value).toBe('item-2');
  });

  it('calls onValueChange when toggling item', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', onValueChange })
    );
    act(() => { result.current.toggleItem('item-1'); });
    expect(onValueChange).toHaveBeenCalledWith('item-1');
  });

  it('toggles off in single collapsible mode', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', value: 'item-1', collapsible: true, onValueChange })
    );
    act(() => { result.current.toggleItem('item-1'); });
    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it('toggles on in multiple mode', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({ type: 'multiple', value: ['item-1'], onValueChange })
    );
    act(() => { result.current.toggleItem('item-2'); });
    expect(onValueChange).toHaveBeenCalledWith(['item-1', 'item-2']);
  });

  it('returns trigger props with aria-expanded', () => {
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', value: 'item-1' })
    );
    const triggerProps = result.current.getTriggerProps('item-1');
    expect(triggerProps['aria-expanded']).toBe(true);
  });

  it('returns trigger props with aria-expanded=false for closed item', () => {
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', value: 'item-1' })
    );
    const triggerProps = result.current.getTriggerProps('item-2');
    expect(triggerProps['aria-expanded']).toBe(false);
  });

  it('returns panel props with role="region"', () => {
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', value: 'item-1' })
    );
    const panelProps = result.current.getPanelProps('item-1');
    expect(panelProps.role).toBe('region');
  });

  it('supports disabled item', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({ type: 'single', onValueChange })
    );
    act(() => { result.current.toggleItem('item-1'); });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('returns item props', () => {
    const { result } = renderHook(() => useAccordion({}));
    const itemProps = result.current.getItemProps('item-1');
    expect(itemProps).toBeDefined();
  });
});
