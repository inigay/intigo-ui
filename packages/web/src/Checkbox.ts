import React from 'react';
import { useCheckbox } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

export interface CheckboxRootProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CheckboxRoot = React.forwardRef<HTMLDivElement, CheckboxRootProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled = false, required, invalid, className, children, style, ...rest }, ref) => {
    const { isChecked, getRootProps, getIndicatorProps, isDisabled } = useCheckbox({ checked, defaultChecked, onCheckedChange, disabled, required, invalid });
    const isCheckedBool = isChecked === true || isChecked === 'indeterminate';

    return (
      <div ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: isDisabled ? 'not-allowed' : 'pointer', ...style }} {...getRootProps()} {...rest}>
        <div style={{
          width: '18px', height: '18px', border: `2px solid ${isCheckedBool ? tokens.color.primary[500] : tokens.color.gray[200]}`,
          borderRadius: tokens.radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isCheckedBool ? tokens.color.primary[500] : '#fff',
          transition: 'all 150ms ease', opacity: isDisabled ? 0.5 : 1,
        }} {...getIndicatorProps()}>
          {isChecked === true && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
          {isChecked === 'indeterminate' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6H9" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </div>
        {children && <span style={{ fontSize: tokens.fontSize.sm, color: tokens.color.gray[900] }}>{children}</span>}
      </div>
    );
  }
);
CheckboxRoot.displayName = 'CheckboxRoot';

export const Checkbox = { Root: CheckboxRoot };
