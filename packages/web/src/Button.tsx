import React from 'react';
import { useButton } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

// Styles map
const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: tokens.color.primary[500], color: '#fff' },
  secondary: { background: tokens.color.gray[100], color: tokens.color.gray[900] },
  outline: { background: 'transparent', color: tokens.color.primary[500], border: `1px solid ${tokens.color.primary[500]}` },
  ghost: { background: 'transparent', color: tokens.color.gray[700] },
  destructive: { background: tokens.color.destructive, color: '#fff' },
  link: { background: 'transparent', color: tokens.color.primary[500] },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  xs: { height: '24px', padding: '0 8px', fontSize: tokens.fontSize.xs, borderRadius: tokens.radius.sm },
  sm: { height: '32px', padding: '0 12px', fontSize: tokens.fontSize.sm, borderRadius: tokens.radius.sm },
  md: { height: '40px', padding: '0 16px', fontSize: tokens.fontSize.sm, borderRadius: tokens.radius.md },
  lg: { height: '48px', padding: '0 24px', fontSize: tokens.fontSize.base, borderRadius: tokens.radius.md },
  xl: { height: '56px', padding: '0 32px', fontSize: tokens.fontSize.lg, borderRadius: tokens.radius.lg },
};

export interface ButtonRootProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: 'default' | 'pill' | 'none';
  onPress?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, disabled = false, fullWidth = false, rounded = 'default', onPress, type = 'button', 'aria-label': ariaLabel, style, className, ...rest }, ref) => {
    const { buttonProps } = useButton({ disabled, loading, type, onPress, ariaLabel });

    const borderRadius = rounded === 'pill' ? tokens.radius.full : rounded === 'none' ? '0' : sizeStyles[size].borderRadius;

    return (
      <button
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'inherit',
          fontWeight: 500,
          border: variantStyles[variant].border || 'none',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          whiteSpace: 'nowrap',
          outline: 'none',
          ...variantStyles[variant],
          ...sizeStyles[size],
          borderRadius,
          ...(fullWidth ? { width: '100%' } : {}),
          ...(loading || disabled ? { opacity: 0.5 } : {}),
          ...style,
        }}
        {...buttonProps}
        {...rest}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </button>
    );
  }
);
ButtonRoot.displayName = 'ButtonRoot';

export interface ButtonIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  position?: 'left' | 'right';
}

export const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ children, position = 'left', style, ...rest }, ref) => (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center', order: position === 'right' ? 1 : -1, ...style }} {...rest}>
      {children}
    </span>
  )
);
ButtonIcon.displayName = 'ButtonIcon';

export const ButtonLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, style, ...rest }, ref) => (
    <span ref={ref} style={{ ...style }}>{children}</span>
  )
);
ButtonLabel.displayName = 'ButtonLabel';

export const ButtonSpinner = () => (
  <svg style={{ animation: 'intigo-spin 1s linear infinite', width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
  </svg>
);

export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Label: ButtonLabel,
  Spinner: ButtonSpinner,
};
