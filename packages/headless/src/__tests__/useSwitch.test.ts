import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSwitch } from '../useSwitch';

describe('useSwitch', () => {
  it('returns unchecked by default', () => {
    const { result } = renderHook(() => useSwitch({}));
    expect(result.current.checked).toBe(false);
  });

  it('supports controlled checked state', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() =>
      useSwitch({ checked: true, onCheckedChange })
    );
    expect(result.current.checked).toBe(true);
  });

  it('supports defaultChecked', () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: true }));
    expect(result.current.checked).toBe(true);
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() => useSwitch({ onCheckedChange }));
    act(() => { result.current.rootProps.onClick(); });
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() =>
      useSwitch({ checked: true, onCheckedChange })
    );
    act(() => { result.current.rootProps.onClick(); });
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('sets role="switch"', () => {
    const { result } = renderHook(() => useSwitch({}));
    expect(result.current.rootProps.role).toBe('switch');
  });

  it('sets aria-checked based on state', () => {
    const { result } = renderHook(() => useSwitch({ checked: true }));
    expect(result.current.rootProps['aria-checked']).toBe(true);
  });

  it('supports disabled state', () => {
    const { result } = renderHook(() => useSwitch({ disabled: true }));
    expect(result.current.rootProps['aria-disabled']).toBe(true);
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() =>
      useSwitch({ disabled: true, onCheckedChange })
    );
    act(() => { result.current.rootProps.onClick(); });
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('supports size prop', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      const { result } = renderHook(() => useSwitch({ size: s }));
      expect(result.current.size).toBe(s);
    });
  });

  it('supports labelPlacement prop', () => {
    const { result } = renderHook(() => useSwitch({ labelPlacement: 'start' }));
    expect(result.current.labelPlacement).toBe('start');
  });
});
