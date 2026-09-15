export const tokens = {
  color: {
    primary: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
    gray: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 500: '#71717a', 700: '#3f3f46', 900: '#18181b' },
    success: '#22c55e',
    destructive: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px' },
  radius: { sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px' },
  motion: {
    duration: { fast: '150ms', normal: '250ms', slow: '400ms' },
    spring: { snappy: 'cubic-bezier(0.16, 1, 0.3, 1)', gentle: 'cubic-bezier(0.65, 0, 0.35, 1)' }
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
  }
} as const;

export type TokenColor = typeof tokens.color;
export type TokenSpacing = typeof tokens.spacing;
export type TokenRadius = typeof tokens.radius;
export type TokenFontSize = typeof tokens.fontSize;
export type TokenMotion = typeof tokens.motion;
export type TokenShadow = typeof tokens.shadow;
