/**
 * useToast — headless hook for toast queue management.
 * Manages a stack of toasts with auto-dismiss.
 */
import { useState, useCallback, useRef } from 'react';

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'loading';
  duration?: number; // ms, 0 = persistent
  action?: { label: string; onPress: () => void };
}

export interface ToastItem extends Required<Pick<ToastOptions, 'title' | 'variant' | 'duration'>> {
  id: string;
  description?: string;
  action?: ToastOptions['action'];
  createdAt: number;
}

interface UseToastReturn {
  toasts: ToastItem[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

let toastCounter = 0;

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id || `toast-${++toastCounter}`;
      const duration = options.duration ?? 5000;

      const toastItem: ToastItem = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant || 'info',
        duration,
        action: options.action,
        createdAt: Date.now(),
      };

      setToasts((prev) => [...prev, toastItem]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          dismiss(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismiss]
  );

  return { toasts, toast, dismiss, dismissAll };
}
