import React, { useState, useEffect } from 'react';
import { useButton } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';
import { easings } from '@intigo-ui/motion';

// ── Variant style definitions (base + hover + active) ──
interface VariantStyle {
  base: React.CSSProperties;
  hover: React.CSSProperties;
  active: React.CSSProperties;
}

const variantStyles: Record<string, VariantStyle> = {
  primary: {
    base: { background: tokens.color.primary[500], color: '#fff', border: 'none' },
    hover: { background: tokens.color.primary[600] },
    active: { background: tokens.color.primary[700] },
  },
  secondary: {
    base: { background: tokens.color.gray[100], color: tokens.color.gray[900], border: 'none' },
    hover: { background: tokens.color.gray[200] },
    active: { background: tokens.color.gray[300] },
  },
  outline: {
    base: { background: 'transparent', color: tokens.color.primary[500], border: `1px solid ${tokens.color.primary[500]}` },
    hover: { background: `${tokens.color.primary[500]}18` },
    active: { background: `${tokens.color.primary[500]}30` },
  },
  ghost: {
    base: { background: 'transparent', color: tokens.color.gray[700], border: 'none' },
    hover: { background: `${tokens.color.gray[300]}40`, color: tokens.color.gray[900] },
    active: { background: `${tokens.color.gray[300]}60` },
  },
  destructive: {
    base: { background: tokens.color.destructive, color: '#fff', border: 'none' },
    hover: { filter: 'brightness(1.1)' },
    active: { filter: 'brightness(0.9)' },
  },
  link: {
    base: { background: 'transparent', color: tokens.color.primary[500], border: 'none' },
    hover: { textDecoration: 'underline' },
    active: { color: tokens.color.primary[700] },
  },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  xs: { height: '24px', padding: '0 8px', fontSize: tokens.fontSize.xs, borderRadius: tokens.radius.sm },
  sm: { height: '32px', padding: '0 12px', fontSize: tokens.fontSize.sm, borderRadius: tokens.radius.sm },
  md: { height: '40px', padding: '0 16px', fontSize: tokens.fontSize.sm, borderRadius: tokens.radius.md },
  lg: { height: '48px', padding: '0 24px', fontSize: tokens.fontSize.base, borderRadius: tokens.radius.md },
  xl: { height: '56px', padding: '0 32px', fontSize: tokens.fontSize.lg, borderRadius: tokens.radius.lg },
};

// ── CSS for states & animations ──
const buttonStatesKeyframes = `
@keyframes intigo-spinner-spin {
  to { transform: rotate(360deg); }
}
@keyframes intigo-fade-in {
  from { opacity: 0; transform: scale(0.7); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes intigo-content-fade-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}
`;

// Inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('intigo-btn-keyframes')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'intigo-btn-keyframes';
  styleEl.textContent = buttonStatesKeyframes;
  document.head.appendChild(styleEl);
}

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
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);
    const [hasJustLoaded, setHasJustLoaded] = useState(false);

    // Detect transition from loading → not loading for exit animation
    useEffect(() => {
      if (!loading) {
        setHasJustLoaded(true);
        const t = setTimeout(() => setHasJustLoaded(false), 300);
        return () => clearTimeout(t);
      }
    }, [loading]);

    const borderRadius = rounded === 'pill' ? tokens.radius.full : rounded === 'none' ? '0' : sizeStyles[size].borderRadius;
    const isDisabled = disabled || loading;
    const vStyles = variantStyles[variant];

    const isClickable = !isDisabled;

    const compositeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'inherit',
      fontWeight: 500,
      border: vStyles.base.border || 'none',
      cursor: disabled ? 'not-allowed' : loading ? 'progress' : 'pointer',
      transition: `all 200ms ${easings.snappy}`,
      whiteSpace: 'nowrap',
      outline: 'none',
      position: 'relative',
      // Base variant styles
      ...vStyles.base,
      ...sizeStyles[size],
      borderRadius,
      ...(fullWidth ? { width: '100%' } : {}),

      // ── Hover state (only when clickable) ──
      ...(isClickable && hovered ? vStyles.hover : {}),

      // ── Active/pressed state (only when clickable) ──
      ...(isClickable && pressed ? {
        ...vStyles.active,
        transform: 'scale(0.97)',
      } : {}),

      // ── Focus ring ──
      ...(focusVisible ? {
        boxShadow: `0 0 0 2px ${tokens.color.primary[500]}40, 0 0 0 4px ${tokens.color.primary[500]}`,
      } : {}),

      // ── Disabled state ──
      ...(disabled && !loading ? {
        opacity: 0.4,
        filter: 'grayscale(0.3)',
      } : {}),

      // ── Loading state ──
      ...(loading ? {
        opacity: 0.85,
        pointerEvents: 'none' as const,
        filter: 'none',
      } : {}),

      ...style,
    };

    return (
      <button
        ref={ref}
        style={compositeStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) setFocusVisible(true); }}
        onBlur={() => setFocusVisible(false)}
        {...buttonProps}
        {...rest}
        data-variant={variant}
        data-size={size}
        data-state={disabled ? 'disabled' : loading ? 'loading' : 'idle'}
      >
        {/* Loading spinner + content swap */}
        {loading && (
          <span style={{
            position: 'absolute',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'intigo-fade-in 200ms ease-out forwards',
          }}>
            <svg
              style={{
                animation: 'intigo-spinner-spin 0.8s linear infinite',
                width: size === 'xs' ? 12 : size === 'sm' ? 14 : 16,
                height: size === 'xs' ? 12 : size === 'sm' ? 14 : 16,
              }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                opacity="0.6"
              />
              <circle
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                strokeDashoffset="-15.7"
                opacity="0.3"
                style={{ animation: 'intigo-spinner-spin 0.5s linear infinite reverse' }}
              />
            </svg>
          </span>
        )}

        {/* Children content with fade during loading transitions */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'opacity 150ms ease, transform 150ms ease',
          ...(loading ? { opacity: 0, transform: 'scale(0.95)', pointerEvents: 'none' as const } : {}),
          ...(hasJustLoaded ? { animation: 'intigo-fade-in 250ms ease-out forwards' } : {}),
        }}>
          {children}
        </span>
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
