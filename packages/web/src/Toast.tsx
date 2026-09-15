import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast, type ToastItem, type ToastOptions } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

const variantColors: Record<string, string> = {
  info: tokens.color.info,
  success: tokens.color.success,
  warning: tokens.color.warning,
  error: tokens.color.destructive,
  loading: tokens.color.gray[500],
};

const variantIcons: Record<string, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
  loading: '⟳',
};

export const ToastProvider = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ position?: string; maxVisible?: number; className?: string }>>(
  ({ children, position = 'bottom-right', maxVisible = 5, className, style }, ref) => {
    const { toasts, toast, dismiss, dismissAll } = useToast();

    const posStyles: Record<string, React.CSSProperties> = {
      'top-right': { top: '16px', right: '16px' },
      'top-left': { top: '16px', left: '16px' },
      'bottom-right': { bottom: '16px', right: '16px' },
      'bottom-left': { bottom: '16px', left: '16px' },
      'top-center': { top: '16px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '16px', left: '50%', transform: 'translateX(-50%)' },
    };

    return (
      <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
        {children}
        <div ref={ref} style={{ position: 'fixed', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px', ...posStyles[position] }} className={className}>
          {toasts.slice(0, maxVisible).map((t) => (
            <div key={t.id} role={t.variant === 'error' || t.variant === 'warning' ? 'alert' : 'status'} aria-live="polite" style={{
              background: '#fff', border: `1px solid ${tokens.color.gray[200]}`, borderRadius: tokens.radius.md,
              boxShadow: tokens.shadow.lg, padding: '12px 16px', minWidth: '280px', maxWidth: '400px',
              display: 'flex', gap: '8px', alignItems: 'flex-start', animation: 'intigo-toast-enter 300ms ease-out',
            }}>
              <span style={{ color: variantColors[t.variant], fontSize: '18px' }}>{variantIcons[t.variant]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: tokens.fontSize.sm, color: tokens.color.gray[900] }}>{t.title}</div>
                {t.description && <div style={{ fontSize: tokens.fontSize.xs, color: tokens.color.gray[500], marginTop: '2px' }}>{t.description}</div>}
              </div>
              <button onClick={() => dismiss(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tokens.color.gray[500], fontSize: '16px' }} aria-label="Close notification">✕</button>
            </div>
          ))}
        </div>
      </ToastContext.Provider>
    );
  }
);
ToastProvider.displayName = 'ToastProvider';

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
}

export const Toast = { Provider: ToastProvider };
