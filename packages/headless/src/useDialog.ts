/**
 * useDialog — headless hook for Dialog component.
 * Manages open state, focus trap, escape, and outside click.
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { useControlled } from '@intigo-ui/utils';

interface UseDialogOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

interface UseDialogReturn {
  isOpen: boolean;
  getOverlayProps: () => Record<string, unknown>;
  getContentProps: () => Record<string, unknown>;
  getTitleProps: () => Record<string, unknown>;
  getDescriptionProps: () => Record<string, unknown>;
  open: () => void;
  close: () => void;
}

export function useDialog(options: UseDialogOptions = {}): UseDialogReturn {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    modal = true,
    closeOnEscape = true,
    closeOnOutsideClick = true,
  } = options;

  const [isOpen, setIsOpen] = useControlled({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useRef(`dialog-title-${Math.random().toString(36).slice(2)}`).current;
  const descId = useRef(`dialog-desc-${Math.random().toString(36).slice(2)}`).current;

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, close]);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      const el = contentRef.current;
      if (el) {
        const focusable = el.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusable?.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && triggerRef.current) { triggerRef.current.focus(); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  return {
    isOpen,
    getOverlayProps: () => ({
      'aria-hidden': 'true',
      onClick: closeOnOutsideClick
        ? (e: React.MouseEvent) => { if (e.target === e.currentTarget) close(); }
        : undefined,
    }),
    getContentProps: () => ({
      ref: contentRef, role: 'dialog', 'aria-modal': modal,
      'aria-labelledby': titleId, 'aria-describedby': descId,
    }),
    getTitleProps: () => ({ id: titleId }),
    getDescriptionProps: () => ({ id: descId }),
    open,
    close,
  };
}
