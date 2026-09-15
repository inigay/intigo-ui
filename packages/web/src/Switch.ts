import React from 'react';
import { useSwitch } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

export interface SwitchRootProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  labelPlacement?: 'start' | 'end';
  className?: string;
  children?: React.ReactNode;
}

const sizeMap = { sm: { track: '32px', thumb: '14px' }, md: { track: '44px', thumb: '20px' }, lg: { track: '52px', thumb: '24px' } };

export const SwitchRoot = React.forwardRef<HTMLButtonElement, SwitchRootProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled = false, size = 'md', labelPlacement = 'end', className, children, style, ...rest }, ref) => {
    const { isChecked, getRootProps, getThumbProps, isDisabled } = useSwitch({ checked, defaultChecked, onCheckedChange, disabled, size });
    const s = sizeMap[size];

    return (
      <div ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexDirection: labelPlacement === 'start' ? 'row-reverse' : 'row', ...style }}>
        <button ref={ref as React.Ref<HTMLButtonElement>} style={{
          border: 'none', padding: '2px', display: 'flex', alignItems: 'center',
          background: isChecked ? tokens.color.primary[500] : tokens.color.gray[200],
          cursor: isDisabled ? 'not-allowed' : 'pointer', transition: 'background 200ms ease',
          borderRadius: s.thumb, width: s.track, height: s.thumb, outline: 'none',
          opacity: isDisabled ? 0.5 : 1,
        }} {...getRootProps()} {...rest}>
          <div style={{
            width: s.thumb, height: s.thumb, background: '#fff', borderRadius: '50%',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
            transform: isChecked ? `translateX(calc(${s.track} - ${s.thumb} - 4px))` : 'translateX(0)',
          }} {...getThumbProps()} />
        </button>
        {children && <span style={{ fontSize: tokens.fontSize.sm, color: tokens.color.gray[900] }}>{children}</span>}
      </div>
    );
  }
);
SwitchRoot.displayName = 'SwitchRoot';

export const Switch = { Root: SwitchRoot };
