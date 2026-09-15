import React from 'react';
import { tokens } from '@intigo-ui/tokens';

const colorMap: Record<string, { bg: string; color: string; border: string }> = {
  primary: { bg: tokens.color.primary[50], color: tokens.color.primary[600], border: tokens.color.primary[500] },
  success: { bg: '#dcfce7', color: '#16a34a', border: tokens.color.success },
  destructive: { bg: '#fee2e2', color: '#dc2626', border: tokens.color.destructive },
  warning: { bg: '#fef3c7', color: '#d97706', border: tokens.color.warning },
  neutral: { bg: tokens.color.gray[100], color: tokens.color.gray[700], border: tokens.color.gray[500] },
};

const sizeMap: Record<string, { padding: string; fontSize: string; height: string }> = {
  sm: { padding: '0 6px', fontSize: tokens.fontSize.xs, height: '20px' },
  md: { padding: '0 8px', fontSize: tokens.fontSize.sm, height: '24px' },
  lg: { padding: '0 12px', fontSize: tokens.fontSize.base, height: '28px' },
};

export interface TagRootProps {
  variant?: 'filled' | 'outlined' | 'soft';
  color?: 'primary' | 'success' | 'destructive' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  selectable?: boolean;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const TagRoot = React.forwardRef<HTMLSpanElement, TagRootProps>(
  ({ variant = 'soft', color = 'neutral', size = 'md', selectable = false, selected, onSelectedChange, dismissible = false, onDismiss, disabled = false, className, children }, ref) => {
    const colors = colorMap[color];
    const s = sizeMap[size];
    const isSelected = selected || false;

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex', alignItems: 'center', gap: '4px', height: s.height, padding: s.padding,
      fontSize: s.fontSize, borderRadius: tokens.radius.full, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, transition: 'all 200ms ease',
    };

    if (variant === 'filled') {
      baseStyle.background = isSelected ? colors.color : colors.bg;
      baseStyle.color = isSelected ? '#fff' : colors.color;
    } else if (variant === 'outlined') {
      baseStyle.background = 'transparent';
      baseStyle.color = colors.color;
      baseStyle.border = `1px solid ${isSelected ? colors.color : colors.border}`;
    } else {
      baseStyle.background = colors.bg;
      baseStyle.color = colors.color;
    }

    return (
      <span ref={ref} role={selectable ? 'checkbox' : undefined} aria-pressed={selectable ? isSelected : undefined} className={className} style={baseStyle}>
        {children}
        {dismissible && (
          <button onClick={(e) => { e.stopPropagation(); onDismiss?.(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', fontSize: '12px', color: 'inherit', lineHeight: 1 }} aria-label="Remove tag">✕</button>
        )}
      </span>
    );
  }
);
TagRoot.displayName = 'TagRoot';

export const TagLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, style, ...rest }, ref) => <span ref={ref} style={style} {...rest}>{children}</span>
);
TagLabel.displayName = 'TagLabel';

export const TagIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, style, ...rest }, ref) => <span ref={ref} style={{ display: 'inline-flex', ...style }} {...rest}>{children}</span>
);
TagIcon.displayName = 'TagIcon';

export const Tag = { Root: TagRoot, Label: TagLabel, Icon: TagIcon };
