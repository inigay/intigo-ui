import React, { createContext, useContext } from 'react';
import { useInput } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

const inputStyle: React.CSSProperties = {
  border: '1px solid ' + tokens.color.gray[200],
  borderRadius: tokens.radius.md,
  padding: '0 12px',
  fontSize: tokens.fontSize.sm,
  outline: 'none',
  background: '#fff',
  width: '100%',
  height: '40px',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
};

const InputContext = createContext<ReturnType<typeof useInput> | null>(null);

export interface InputRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  ({ children, value, defaultValue, onValueChange, type = 'text', disabled = false, invalid = false, required = false, clearable = false, showPasswordToggle = false, size = 'md', fullWidth = true, placeholder, className, style, ...rest }, ref) => {
    const hook = useInput({ value, defaultValue, onValueChange, type, disabled, required, invalid, clearable, showPasswordToggle });

    const sizeMap: Record<string, React.CSSProperties> = {
      sm: { height: '32px', fontSize: tokens.fontSize.xs, padding: '0 8px' },
      md: { height: '40px', fontSize: tokens.fontSize.sm, padding: '0 12px' },
      lg: { height: '48px', fontSize: tokens.fontSize.base, padding: '0 16px' },
    };

    return (
      <InputContext.Provider value={hook}>
        <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...(fullWidth ? { width: '100%' } : {}), ...style }} {...rest}>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            const displayName = (child.type as any)?.displayName || '';
            if (displayName === 'InputField') {
              return React.cloneElement(child, {
                ...hook.inputProps,
                placeholder,
                style: { ...inputStyle, ...sizeMap[size], ...(invalid ? { borderColor: tokens.color.destructive } : {}), ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}) },
              } as any);
            }
            return child;
          })}
        </div>
      </InputContext.Provider>
    );
  }
);
InputRoot.displayName = 'InputRoot';

export const InputLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }>(
  ({ children, required, style, ...rest }, ref) => (
    <label ref={ref} style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: tokens.color.gray[700], ...style }} {...rest}>
      {children}
      {required && <span style={{ color: tokens.color.destructive, marginLeft: '2px' }}>*</span>}
    </label>
  )
);
InputLabel.displayName = 'InputLabel';

export const InputField = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ style, ...rest }, ref) => (
    <input ref={ref} style={{ ...inputStyle, ...style }} {...rest} />
  )
);
InputField.displayName = 'InputField';

export const InputLeading = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, style, ...rest }, ref) => (
    <span ref={ref} style={{ display: 'flex', alignItems: 'center', marginRight: '8px', color: tokens.color.gray[500], ...style }} {...rest}>{children}</span>
  )
);
InputLeading.displayName = 'InputLeading';

export const InputTrailing = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, style, ...rest }, ref) => (
    <span ref={ref} style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', color: tokens.color.gray[500], ...style }} {...rest}>{children}</span>
  )
);
InputTrailing.displayName = 'InputTrailing';

export const InputDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'description' | 'error' }>(
  ({ children, variant = 'description', style, ...rest }, ref) => (
    <div ref={ref} style={{ fontSize: tokens.fontSize.xs, color: variant === 'error' ? tokens.color.destructive : tokens.color.gray[500], ...style }} {...rest}>{children}</div>
  )
);
InputDescription.displayName = 'InputDescription';

export const InputClearButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, ...rest }, ref) => (
    <button ref={ref} type="button" onClick={onClick} aria-label="Clear input" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '14px', color: tokens.color.gray[500] }} {...rest}>
      {children || '✕'}
    </button>
  )
);
InputClearButton.displayName = 'InputClearButton';

export const InputPasswordToggle = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { isPasswordVisible?: boolean; onToggle?: () => void }>(
  ({ children, isPasswordVisible, onToggle, ...rest }, ref) => (
    <button ref={ref} type="button" onClick={onToggle} aria-label={isPasswordVisible ? 'Hide password' : 'Show password'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '14px', color: tokens.color.gray[500] }} {...rest}>
      {children || (isPasswordVisible ? '🙈' : '👁')}
    </button>
  )
);
InputPasswordToggle.displayName = 'InputPasswordToggle';

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
  Leading: InputLeading,
  Trailing: InputTrailing,
  Description: InputDescription,
  ClearButton: InputClearButton,
  PasswordToggle: InputPasswordToggle,
};
