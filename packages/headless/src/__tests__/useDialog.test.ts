import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDialog } from '../useDialog';

describe('useDialog', () => {
  it('returns open state', () => {
    const { result } = renderHook(() => useDialog({}));
    expect(result.current.open).toBe(false);
  });

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ open: true, onOpenChange }));
    expect(result.current.open).toBe(true);
  });

  it('supports defaultOpen', () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    expect(result.current.open).toBe(true);
  });

  it('calls onOpenChange when opening', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ onOpenChange }));
    act(() => { result.current.openDialog(); });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('calls onOpenChange when closing', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ open: true, onOpenChange }));
    act(() => { result.current.closeDialog(); });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on escape by default', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ open: true, onOpenChange }));
    act(() => {
      result.current.overlayProps.onKeyDown({ key: 'Escape' } as React.KeyboardEvent);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not close on escape when closeOnEscape=false', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useDialog({ open: true, closeOnEscape: false, onOpenChange })
    );
    act(() => {
      result.current.overlayProps.onKeyDown({ key: 'Escape' } as React.KeyboardEvent);
    });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('returns overlay props', () => {
    const { result } = renderHook(() => useDialog({}));
    expect(result.current.overlayProps).toBeDefined();
  });

  it('returns content props with aria-modal="true"', () => {
    const { result } = renderHook(() => useDialog({ open: true }));
    expect(result.current.contentProps['aria-modal']).toBe(true);
  });

  it('returns content props with role="dialog"', () => {
    const { result } = renderHook(() => useDialog({ open: true }));
    expect(result.current.contentProps.role).toBe('dialog');
  });

  it('returns title props with id for aria-labelledby', () => {
    const { result } = renderHook(() => useDialog({ open: true }));
    expect(result.current.titleProps.id).toBeDefined();
  });

  it('returns description props with id for aria-describedby', () => {
    const { result } = renderHook(() => useDialog({ open: true }));
    expect(result.current.descriptionProps.id).toBeDefined();
  });

  it('supports closeOnOutsideClick=false', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useDialog({ open: true, closeOnOutsideClick: false, onOpenChange })
    );
    act(() => {
      result.current.overlayProps.onClick();
    });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('supports size prop', () => {
    const { result } = renderHook(() => useDialog({ size: 'lg' }));
    expect(result.current.size).toBe('lg');
  });
});
