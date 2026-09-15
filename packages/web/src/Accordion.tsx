import React from 'react';
import { useAccordion } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

export interface AccordionRootProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ value, defaultValue, onValueChange, type: accordionType = 'single', collapsible = true, className, children, style }, ref) => {
    const { openItems, getTriggerProps, getPanelProps, toggle } = useAccordion({ value, defaultValue, onValueChange, type: accordionType, collapsible });

    return (
      <div ref={ref} className={className} style={{ border: `1px solid ${tokens.color.gray[200]}`, borderRadius: tokens.radius.md, overflow: 'hidden', ...style }}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          if (child.type === AccordionItem) {
            return React.cloneElement(child, { openItems, getTriggerProps, getPanelProps } as any);
          }
          return child;
        })}
      </div>
    );
  }
);
AccordionRoot.displayName = 'AccordionRoot';

export const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string; disabled?: boolean; openItems?: string[]; getTriggerProps?: (v: string, d?: boolean) => Record<string, unknown>; getPanelProps?: (v: string) => Record<string, unknown> }>(
  ({ value, disabled = false, children, className, openItems = [], getTriggerProps, getPanelProps, style, ...rest }, ref) => {
    const isOpen = openItems.includes(value);

    let triggerEl: React.ReactNode = null;
    let panelEl: React.ReactNode = null;
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      if ((child.type as any)?.displayName === 'AccordionTrigger') {
        triggerEl = React.cloneElement(child, { ...getTriggerProps?.(value, disabled), disabled } as any);
      } else if ((child.type as any)?.displayName === 'AccordionPanel') {
        panelEl = React.cloneElement(child, { ...getPanelProps?.(value) } as any);
      }
    });

    return (
      <div ref={ref} className={className} style={{ borderBottom: `1px solid ${tokens.color.gray[200]}`, ...style }} {...rest}>
        {triggerEl}
        {panelEl}
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, style, ...rest }, ref) => (
    <button ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 16px', background: 'none', border: 'none', fontSize: tokens.fontSize.sm, fontWeight: 500, color: tokens.color.gray[900], cursor: 'pointer', textAlign: 'left', ...style }} {...rest}>
      {children}
    </button>
  )
);
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionIndicator = () => (
  <svg style={{ width: '16px', height: '16px', transition: 'transform 200ms ease', color: tokens.color.gray[500] }} viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AccordionPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, style, ...rest }, ref) => (
    <div ref={ref} style={{ padding: '0 16px 16px', fontSize: tokens.fontSize.sm, color: tokens.color.gray[700], lineHeight: 1.6, ...style }} {...rest}>{children}</div>
  )
);
AccordionPanel.displayName = 'AccordionPanel';

export const Accordion = { Root: AccordionRoot, Item: AccordionItem, Trigger: AccordionTrigger, Indicator: AccordionIndicator, Panel: AccordionPanel };
