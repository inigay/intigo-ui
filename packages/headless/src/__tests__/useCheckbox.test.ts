import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCheckbox } from '../useCheckbox';

describe('useCheckbox', () => {
  it('returns unchecked by default', () => {
    const { result } = renderHook(() => useCheckbox({}));
    expect(result.current.checked).toBe(false);
  });

  it('supports controlled checked state', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() =>
      useCheckbox({ checked: true, onCheckedChange })
    );
    expect(result.current.checked).toBe(true);
  });

  it('supports defaultChecked', () => {
    const { result } = renderHook(() => useCheckbox({ defaultChecked: true }));
    expect(result.current.checked).toBe(true);
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() => useCheckbox({ onCheckedChange }));
    act(() => { result.current.rootProps.onChange(); });
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() =>
      useCheckbox({ checked: true, onCheckedChange })
    );
    act(() => { result.current.rootProps.onChange(); });
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('sets role="checkbox"', () => {
    const { result } = renderHook(() => useCheckbox({}));
    expect(result.current.rootProps.role).toBe('checkbox');
  });

  it('sets aria-checked based on state', () => {
    const { result } = renderHook(() => useCheckbox({ checked: true }));
    expect(result.current.rootProps['aria-checked']).toBe(true);
  });

  it('supports disabled state', () => {
    const { result } = renderHook(() => useCheckbox({ disabled: true }));
    expect(result.current.rootProps['aria-disabled']).toBe(true);
  });

  it('supports required state', () => {
    const { result } = renderHook(() => useCheckbox({ required: true }));
    expect(result.current.rootProps['aria-required']).toBe(true);
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    const { result } = renderHook(() =>
      useCheckbox({ disabled: true, onCheckedChange })
    );
    act(() => { result.current.rootProps.onChange(); });
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('supports name prop for form submission', () => {
    const { result } = renderHook(() => useCheckbox({ name: 'terms' }));
    expect(result.current.rootProps.name).toBe('terms');
  });

  it('supports value prop for form submission', () => {
    const { result } = renderHook(() => useCheckbox({ value: 'accepted' }));
    expect(result.current.rootProps.value).toBe('accepted');
  });

  it('supports invalid state', () => {
    const { result } = renderHook(() => useCheckbox({ invalid: true }));
    expect(result.current.rootProps['aria-invalid']).toBe(true);
  });
});
