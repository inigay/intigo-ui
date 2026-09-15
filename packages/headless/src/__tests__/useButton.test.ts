import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useButton } from '../useButton';

describe('useButton', () => {
  it('returns button props with role="button"', () => {
    const { result } = renderHook(() => useButton({}));
    expect(result.current.buttonProps).toBeDefined();
    expect(result.current.buttonProps.role).toBe('button');
  });

  it('returns default type="button"', () => {
    const { result } = renderHook(() => useButton({}));
    expect(result.current.buttonProps.type).toBe('button');
  });

  it('calls onPress when onClick is triggered', () => {
    const onPress = vi.fn();
    const { result } = renderHook(() => useButton({ onPress }));
    act(() => {
      result.current.buttonProps.onClick();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('sets aria-disabled when disabled', () => {
    const { result } = renderHook(() => useButton({ disabled: true }));
    expect(result.current.buttonProps['aria-disabled']).toBe(true);
  });

  it('sets aria-busy when loading', () => {
    const { result } = renderHook(() => useButton({ loading: true }));
    expect(result.current.buttonProps['aria-busy']).toBe(true);
  });

  it('sets aria-disabled when loading', () => {
    const { result } = renderHook(() => useButton({ loading: true }));
    expect(result.current.buttonProps['aria-disabled']).toBe(true);
  });

  it('supports custom type prop', () => {
    const { result } = renderHook(() => useButton({ type: 'submit' }));
    expect(result.current.buttonProps.type).toBe('submit');
  });

  it('supports custom aria-label', () => {
    const { result } = renderHook(() => useButton({ 'aria-label': 'Close dialog' }));
    expect(result.current.buttonProps['aria-label']).toBe('Close dialog');
  });

  it('does not call onPress when disabled', () => {
    const onPress = vi.fn();
    const { result } = renderHook(() => useButton({ onPress, disabled: true }));
    act(() => {
      result.current.buttonProps.onClick();
    });
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = vi.fn();
    const { result } = renderHook(() => useButton({ onPress, loading: true }));
    act(() => {
      result.current.buttonProps.onClick();
    });
    expect(onPress).not.toHaveBeenCalled();
  });

  it('passes through data attributes', () => {
    const { result } = renderHook(() => useButton({ 'data-testid': 'my-btn' }));
    expect(result.current.buttonProps['data-testid']).toBe('my-btn');
  });
});
