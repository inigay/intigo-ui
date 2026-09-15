import React from 'react';
import { tokens } from '@intigo-ui/tokens';

const sizeMap: Record<string, number> = { xs: 16, sm: 20, md: 24, lg: 32, xl: 40 };

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  value?: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = 'md', value, color = 'currentColor', strokeWidth = 2, label, className, style }, ref) => {
    const s = sizeMap[size];
    const radius = (s - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const isDeterminate = value !== undefined;

    return (
      <svg ref={ref} className={className} role={isDeterminate ? 'progressbar' : 'img'} aria-label={label || 'Loading'} aria-busy="true" aria-valuenow={isDeterminate ? value : undefined} aria-valuemin={0} aria-valuemax={100} width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ ...style }}>
        <circle cx={s / 2} cy={s / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={isDeterminate ? circumference : `${circumference * 0.25} ${circumference * 0.75}`}
          strokeDashoffset={isDeterminate ? circumference * (1 - value! / 100) : undefined}
          style={!isDeterminate ? { animation: 'intigo-spin 1s linear infinite' } : { transition: 'stroke-dashoffset 400ms ease-out', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
      </svg>
    );
  }
);
Spinner.displayName = 'Spinner';
