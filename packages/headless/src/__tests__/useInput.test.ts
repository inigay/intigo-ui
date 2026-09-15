import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInput } from '../useInput';

describe('useInput', () => {
  it('returns input props with default type="text"', () => {
    const { result } = renderHook(() => useInput({}));
    expect(result.current.inputProps.type).toBe('text');
  });

  it('supports controlled value', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() => useInput({ value: 'hello', onValueChange }));
    expect(result.current.inputProps.value).toBe('hello');
  });

  it('supports uncontrolled defaultValue', () => {
    const { result } = renderHook(() => useInput({ defaultValue: 'initial' }));
    expect(result.current.inputProps.defaultValue).toBe('initial');
  });

  it('calls onValueChange on input change', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() => useInput({ onValueChange }));
    act(() => {
      const event = { target: { value: 'new value' } };
      result.current.inputProps.onChange(event);
    });
    expect(onValueChange).toHaveBeenCalledWith('new value');
  });

  it('sets disabled attribute', () => {
    const { result } = renderHook(() => useInput({ disabled: true }));
    expect(result.current.inputProps.disabled).toBe(true);
  });

  it('sets readOnly attribute', () => {
    const { result } = renderHook(() => useInput({ readOnly: true }));
    expect(result.current.inputProps.readOnly).toBe(true);
  });

  it('sets required attribute', () => {
    const { result } = renderHook(() => useInput({ required: true }));
    expect(result.current.inputProps.required).toBe(true);
  });

  it('sets aria-invalid when invalid', () => {
    const { result } = renderHook(() => useInput({ invalid: true }));
    expect(result.current.inputProps['aria-invalid']).toBe(true);
  });

  it('supports maxLength', () => {
    const { result } = renderHook(() => useInput({ maxLength: 50 }));
    expect(result.current.inputProps.maxLength).toBe(50);
  });

  it('supports placeholder', () => {
    const { result } = renderHook(() => useInput({ placeholder: 'Enter email' }));
    expect(result.current.inputProps.placeholder).toBe('Enter email');
  });

  it('supports input type variants', () => {
    const types: Array<'email' | 'password' | 'number' | 'tel' | 'url' | 'search'> = [
      'email', 'password', 'number', 'tel', 'url', 'search',
    ];
    types.forEach((t) => {
      const { result } = renderHook(() => useInput({ type: t }));
      expect(result.current.inputProps.type).toBe(t);
    });
  });

  it('returns labelProps with htmlFor', () => {
    const { result } = renderHook(() => useInput({ id: 'email-input' }));
    expect(result.current.labelProps.htmlFor).toBe('email-input');
  });

  it('returns descriptionProps with id for aria-describedby', () => {
    const { result } = renderHook(() => useInput({ id: 'email-input', invalid: true }));
    expect(result.current.descriptionProps).toBeDefined();
  });
});
