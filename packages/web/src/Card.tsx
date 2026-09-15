import React from 'react';
import { tokens } from '@intigo-ui/tokens';

const variantStyles: Record<string, React.CSSProperties> = {
  elevated: { boxShadow: tokens.shadow.md, border: 'none', background: '#fff' },
  outlined: { boxShadow: 'none', border: `1px solid ${tokens.color.gray[200]}`, background: '#fff' },
  flat: { boxShadow: 'none', border: 'none', background: tokens.color.gray[50] },
};

const paddingMap: Record<string, string> = { none: '0', sm: '12px', md: '16px', lg: '24px' };

export interface CardRootProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  interactive?: boolean;
  fullWidth?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onPress?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ variant = 'elevated', interactive = false, fullWidth = false, padding = 'md', onPress, className, children, style }, ref) => (
    <div ref={ref} role={onPress ? 'button' : undefined} tabIndex={onPress ? 0 : undefined} onClick={onPress} className={className} style={{
      borderRadius: tokens.radius.lg, overflow: 'hidden', ...(fullWidth ? { width: '100%' } : {}),
      padding: paddingMap[padding],
      ...(interactive ? { cursor: 'pointer', transition: 'transform 200ms ease, box-shadow 200ms ease' } : {}),
      ...variantStyles[variant],
      ...style,
    }}>
      {children}
    </div>
  )
);
CardRoot.displayName = 'CardRoot';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, style, ...rest }, ref) => <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style }} {...rest}>{children}</div>
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>>(
  ({ children, style, ...rest }, ref) => <div ref={ref} style={{ ...style }} {...rest}>{children}</div>
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, style, ...rest }, ref) => <div ref={ref} style={{ display: 'flex', gap: '8px', ...style }} {...rest}>{children}</div>
);
CardFooter.displayName = 'CardFooter';

export const CardImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ style, ...rest }, ref) => <img ref={ref} style={{ width: '100%', display: 'block', ...style }} {...rest} />
);
CardImage.displayName = 'CardImage';

export const Card = { Root: CardRoot, Header: CardHeader, Body: CardBody, Footer: CardFooter, Image: CardImage };
