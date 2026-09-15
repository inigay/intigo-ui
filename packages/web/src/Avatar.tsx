import React, { useState } from 'react';
import { tokens } from '@intigo-ui/tokens';

const sizeMap: Record<string, string> = { xs: '24px', sm: '32px', md: '40px', lg: '48px', xl: '64px' };
const statusColors: Record<string, string> = { online: tokens.color.success, offline: tokens.color.gray[500], away: tokens.color.warning, busy: tokens.color.destructive };

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string | React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'squircle';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  style?: React.CSSProperties;
}

export const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt = '', fallback, size = 'md', shape = 'circle', status, className, style }, ref) => {
    const [loaded, setLoaded] = useState(!!src);
    const s = sizeMap[size];
    const borderRadius = shape === 'circle' ? '50%' : shape === 'square' ? tokens.radius.sm : '30%';

    const initials = fallback || alt.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

    return (
      <span ref={ref} className={className} role="img" aria-label={alt} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: s, height: s, borderRadius, background: tokens.color.gray[100], overflow: 'hidden', ...style }}>
        {src && loaded && (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} />
        )}
        {(!src || !loaded) && (
          <span style={{ fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : tokens.fontSize.sm, fontWeight: 600, color: tokens.color.gray[700] }}>
            {initials}
          </span>
        )}
        {status && (
          <span aria-hidden="true" style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: statusColors[status], border: `2px solid #fff` }} />
        )}
      </span>
    );
  }
);
AvatarRoot.displayName = 'AvatarRoot';

export const Avatar = { Root: AvatarRoot };
