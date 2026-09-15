import React, { useState, useEffect, useRef } from 'react';
import { useSelect, type SelectOption } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

export interface SelectRootProps {
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onValueChange?: (value: string | number | (string | number)[]) => void;
  options?: SelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
  ({ options = [], multiple, disabled, invalid, searchable, placeholder = 'Select...', value, defaultValue, onValueChange, className, style, ...rest }, ref) => {
    const { isOpen, selectedLabels, getTriggerProps, getListProps, getOptionProps, open, close, toggle, search, setSearch, filteredOptions, isDisabled, isInvalid } = useSelect({
      value, defaultValue, onValueChange, options, multiple, disabled, invalid, searchable,
    });
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) close();
      };
      if (isOpen) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, close]);

    return (
      <div ref={ref} className={className} style={{ position: 'relative', width: '100%', ...style }} {...rest}>
        <button
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', height: '40px', padding: '0 12px',
            border: `1px solid ${isInvalid ? tokens.color.destructive : tokens.color.gray[200]}`,
            borderRadius: tokens.radius.md, background: isDisabled ? tokens.color.gray[100] : '#fff',
            fontSize: tokens.fontSize.sm, cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'border-color 150ms ease',
            opacity: isDisabled ? 0.5 : 1,
          }}
          {...getTriggerProps()}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
          </span>
          <span style={{ transition: 'transform 200ms ease', transform: isOpen ? 'rotate(180deg)' : undefined, fontSize: '12px', color: tokens.color.gray[500] }}>▼</span>
        </button>
        {isOpen && (
          <div ref={popupRef} style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: '#fff', border: `1px solid ${tokens.color.gray[200]}`,
            borderRadius: tokens.radius.md, boxShadow: tokens.shadow.lg, zIndex: 100,
            animation: 'intigo-select-enter 200ms ease-out',
          }} {...getListProps()}>
            {searchable && (
              <input
                style={{ width: '100%', padding: '8px 12px', border: 'none', borderBottom: `1px solid ${tokens.color.gray[200]}`, fontSize: tokens.fontSize.sm, outline: 'none' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                autoFocus
              />
            )}
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredOptions.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: tokens.color.gray[500], fontSize: tokens.fontSize.sm }}>No results</div>
              ) : (
                filteredOptions.map((option) => {
                  const optProps = getOptionProps(option);
                  return (
                    <div key={String(option.value)} style={{
                      padding: '8px 12px', fontSize: tokens.fontSize.sm, cursor: option.disabled ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      opacity: option.disabled ? 0.5 : 1,
                      ...(optProps['aria-selected'] ? { background: tokens.color.primary[50], color: tokens.color.primary[500] } : {}),
                    }} {...optProps}>
                      {option.label}
                      {optProps['aria-selected'] && <span style={{ color: tokens.color.primary[500] }}>✓</span>}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
SelectRoot.displayName = 'SelectRoot';

export const Select = { Root: SelectRoot };
