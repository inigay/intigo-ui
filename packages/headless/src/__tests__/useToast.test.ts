import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, ToastProvider } from '../useToast';

describe('useToast', () => {
  it('returns empty toasts array initially', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast when toast() is called', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ title: 'Hello' });
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Hello');
  });

  it('generates unique id for each toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ title: 'First' });
      result.current.toast({ title: 'Second' });
    });
    expect(result.current.toasts[0].id).not.toBe(result.current.toasts[1].id);
  });

  it('supports variant', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ title: 'Error', variant: 'error' });
    });
    expect(result.current.toasts[0].variant).toBe('error');
  });

  it('supports description', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ title: 'Saved', description: 'Your changes were saved.' });
    });
    expect(result.current.toasts[0].description).toBe('Your changes were saved.');
  });

  it('supports action', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    const actionFn = vi.fn();
    act(() => {
      result.current.toast({
        title: 'File uploaded',
        action: { label: 'View', onPress: actionFn },
      });
    });
    expect(result.current.toasts[0].action.label).toBe('View');
  });

  it('dismisses a toast by id', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    let toastId = '';
    act(() => {
      const toast = result.current.toast({ title: 'Dismiss me' });
      toastId = toast.id;
    });
    act(() => {
      result.current.dismiss(toastId);
    });
    expect(result.current.toasts).toEqual([]);
  });

  it('respects maxVisible limit', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, { maxVisible: 2 }, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ title: 'One' });
      result.current.toast({ title: 'Two' });
      result.current.toast({ title: 'Three' });
    });
    expect(result.current.toasts.length).toBeLessThanOrEqual(2);
  });

  it('supports duration=0 for persistent toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ title: 'Persistent', duration: 0 });
    });
    expect(result.current.toasts[0].duration).toBe(0);
  });

  it('provides dismiss function', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ToastProvider, {}, children);
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.dismiss).toBe('function');
  });
});
