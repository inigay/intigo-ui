import React from 'react';
import { tokens } from '@intigo-ui/tokens';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rectangle' | 'rounded';
  width?: number | string;
  height?: number | string;
  lines?: number;
  lastLineWidth?: number | string;
  animation?: 'shimmer' | 'pulse' | 'none';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  style?: React.CSSProperties;
}

const speedMap: Record<string, string> = { slow: '2.5s', normal: '1.5s', fast: '0.8s' };

const SkeletonBlock = React.forwardRef<HTMLDivElement, { width: string | number; height: string | number; animation: string; speed: string; style?: React.CSSProperties }>(
  ({ width, height, animation, speed, style }, ref) => {
    const bg = animation === 'pulse' ? tokens.color.gray[100] : `linear-gradient(90deg, ${tokens.color.gray[100]} 25%, ${tokens.color.gray[200]} 50%, ${tokens.color.gray[100]} 75%)`;
    return (
      <div ref={ref} aria-hidden="true" style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: tokens.radius.sm,
        background: bg,
        backgroundSize: '200% 100%',
        animation: animation === 'shimmer' ? `intigo-shimmer ${speedMap[speed]} infinite ease-in-out` : animation === 'pulse' ? `intigo-pulse ${speedMap[speed]} infinite ease-in-out` : 'none',
        ...style,
      }} />
    );
  }
);

export const SkeletonRoot = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width = '100%', height, lines = 1, lastLineWidth = '60%', animation = 'shimmer', speed = 'normal', className, style }, ref) => {
    if (variant === 'circle') {
      return <SkeletonBlock width={width} height={height || width} animation={animation} speed={speed} style={{ borderRadius: '50%', ...style }} ref={ref} />;
    }
    if (variant === 'rectangle' || variant === 'rounded') {
      return <SkeletonBlock width={width} height={height || '100%'} animation={animation} speed={speed} style={{ borderRadius: variant === 'rounded' ? tokens.radius.md : '0', ...style }} ref={ref} />;
    }

    // text variant
    return (
      <div ref={ref} aria-busy="true" className={className} style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...style }}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBlock key={i} width={i === lines - 1 ? lastLineWidth : width} height={height || '1em'} animation={animation} speed={speed} />
        ))}
      </div>
    );
  }
);
SkeletonRoot.displayName = 'SkeletonRoot';

export const Skeleton = { Root: SkeletonRoot };
