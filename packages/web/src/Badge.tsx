import React from 'react';
import { tokens } from '@intigo-ui/tokens';

const colorMap: Record<string, string> = {
  primary: tokens.color.primary[500],
  success: tokens.color.success,
  destructive: tokens.color.destructive,
  warning: tokens.color.warning,
  neutral: tokens.color.gray[500],
};

const sizeMap: Record<string, { width: string; height: string; fontSize: string }> = {
  sm: { width: '16px', height: '16px', fontSize: '10px' },
  md: { width: '20px', height: '20px', fontSize: '12px' },
  lg: { width: '24px', height: '24px', fontSize: '14px' },
};

export interface BadgeProps {
  variant?: 'number' | 'dot' | 'label';
  value?: number | string;
  max?: number;
  color?: 'primary' | 'success' | 'destructive' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'number', value, max = 99, color = 'primary', size = 'md', placement = 'top-right', className, style }, ref) => {
    const bg = colorMap[color];
    const s = sizeMap[size];
    const displayValue = typeof value === 'number' && value > max ? `${max}+` : value;

    if (variant === 'dot') {
      return <span ref={ref} aria-hidden="true" className={className} style={{ width: s.width, height: s.height, borderRadius: '50%', background: bg, display: 'inline-block', ...style }} />;
    }

    const isLabel = variant === 'label';
    return (
      <span ref={ref} className={className} aria-label={typeof value === 'number' ? `${value} notifications` : undefined} style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: isLabel ? undefined : s.width, height: s.height, padding: isLabel ? '2px 8px' : undefined,
        borderRadius: isLabel ? tokens.radius.full : '50%',
        background: bg, color: '#fff', fontSize: s.fontSize, fontWeight: 600,
        ...style,
      }}>
        {variant === 'label' ? value : displayValue}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
