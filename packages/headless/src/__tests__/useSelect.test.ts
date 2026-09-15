import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSelect } from '../useSelect';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('useSelect', () => {
  it('returns trigger props with role="combobox"', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps.role).toBe('combobox');
  });

  it('sets aria-expanded based on open state', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps['aria-expanded']).toBe(false);
    act(() => { result.current.open(); });
    expect(result.current.triggerProps['aria-expanded']).toBe(true);
  });

  it('sets aria-haspopup="listbox"', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps['aria-haspopup']).toBe('listbox');
  });

  it('supports controlled value', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useSelect({ options, value: 'banana', onValueChange })
    );
    expect(result.current.selectedValue).toBe('banana');
  });

  it('supports uncontrolled defaultValue', () => {
    const { result } = renderHook(() =>
      useSelect({ options, defaultValue: 'apple' })
    );
    expect(result.current.selectedValue).toBe('apple');
  });

  it('calls onValueChange when selecting an option', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useSelect({ options, onValueChange })
    );
    act(() => {
      result.current.selectOption('cherry');
    });
    expect(onValueChange).toHaveBeenCalledWith('cherry');
  });

  it('supports placeholder', () => {
    const { result } = renderHook(() =>
      useSelect({ options, placeholder: 'Choose a fruit' })
    );
    expect(result.current.placeholder).toBe('Choose a fruit');
  });

  it('sets disabled on trigger when disabled', () => {
    const { result } = renderHook(() => useSelect({ options, disabled: true }));
    expect(result.current.triggerProps['aria-disabled']).toBe(true);
  });

  it('supports searchable mode', () => {
    const { result } = renderHook(() => useSelect({ options, searchable: true }));
    expect(result.current.searchable).toBe(true);
  });

  it('supports multi-select', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useSelect({ options, multiple: true, onValueChange })
    );
    act(() => {
      result.current.selectOption('apple');
      result.current.selectOption('banana');
    });
    expect(onValueChange).toHaveBeenCalledWith(['apple', 'banana']);
  });

  it('sets aria-invalid when invalid', () => {
    const { result } = renderHook(() => useSelect({ options, invalid: true }));
    expect(result.current.triggerProps['aria-invalid']).toBe(true);
  });

  it('returns listboxProps with role="listbox"', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.listboxProps.role).toBe('listbox');
  });

  it('returns option props with role="option"', () => {
    const { result } = renderHook(() => useSelect({ options }));
    const optionProps = result.current.getOptionProps('apple');
    expect(optionProps.role).toBe('option');
    expect(optionProps['aria-selected']).toBe(false);
  });
});
