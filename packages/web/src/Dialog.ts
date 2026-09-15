import React from 'react';
import { useDialog } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

export interface DialogRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
}

const sizeMap: Record<string, React.CSSProperties> = {
  sm: { maxWidth: '320px' },
  md: { maxWidth: '512px' },
  lg: { maxWidth: '768px' },
  xl: { maxWidth: '1024px' },
  full: { maxWidth: '100%', height: '100%', borderRadius: 0 },
};

export const DialogRoot = React.forwardRef<HTMLDivElement, DialogRootProps>(
  ({ children, open, defaultOpen, onOpenChange, modal, closeOnEscape, closeOnOutsideClick, size = 'md' }, ref) => {
    const { isOpen, getOverlayProps, getContentProps, getTitleProps, getDescriptionProps, close } = useDialog({
      open, defaultOpen, onOpenChange, modal, closeOnEscape, closeOnOutsideClick,
    });

    if (!isOpen) return null;

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'intigo-dialog-fade 200ms ease-out' }} {...getOverlayProps()} ref={ref as React.Ref<HTMLDivElement>}>
        <div style={{ background: '#fff', borderRadius: tokens.radius.lg, boxShadow: tokens.shadow.xl, width: '100%', display: 'flex', flexDirection: 'column', animation: 'intigo-dialog-scale 250ms cubic-bezier(0.16,1,0.3,1)', ...sizeMap[size] }} {...getContentProps()}>
          {children}
        </div>
      </div>
    );
  }
);
DialogRoot.displayName = 'DialogRoot';

export const DialogTrigger = React.forwardRef<HTMLDivElement, React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & { onClick?: () => void }>(
  ({ children, onClick, ...rest }, ref) => (
    <div ref={ref} onClick={onClick} {...rest}>{children}</div>
  )
);
DialogTrigger.displayName = 'DialogTrigger';

export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, style, ...rest }, ref) => (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${tokens.color.gray[200]}`, ...style }} {...rest}>{children}</div>
  )
);
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, style, ...rest }, ref) => (
    <h2 ref={ref} style={{ fontSize: tokens.fontSize.xl, fontWeight: 600, margin: 0, color: tokens.color.gray[900], ...style }} {...rest}>{children}</h2>
  )
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, style, ...rest }, ref) => (
    <p ref={ref} style={{ fontSize: tokens.fontSize.sm, color: tokens.color.gray[500], margin: 0, ...style }} {...rest}>{children}</p>
  )
);
DialogDescription.displayName = 'DialogDescription';

export const DialogBody = React.forwardRef<HTMLDivElement, React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>>(
  ({ children, style, ...rest }, ref) => (
    <div ref={ref} style={{ padding: '24px', overflowY: 'auto', flex: 1, ...style }} {...rest}>{children}</div>
  )
);
DialogBody.displayName = 'DialogBody';

export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, style, ...rest }, ref) => (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '16px 24px', borderTop: `1px solid ${tokens.color.gray[200]}`, ...style }} {...rest}>{children}</div>
  )
);
DialogFooter.displayName = 'DialogFooter';

export const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, style, ...rest }, ref) => (
    <button ref={ref} type="button" onClick={onClick} aria-label="Close dialog" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontSize: '18px', color: tokens.color.gray[500], borderRadius: tokens.radius.sm }} {...rest}>
      {children || '✕'}
    </button>
  )
);
DialogClose.displayName = 'DialogClose';

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};
