import React from 'react';
import { useTabs } from '@intigo-ui/headless';
import { tokens } from '@intigo-ui/tokens';

export interface TabsRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'underline' | 'pill' | 'enclosed';
  className?: string;
  children?: React.ReactNode;
}

export const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  ({ value, defaultValue, onValueChange, orientation = 'horizontal', variant = 'underline', className, children, style }, ref) => {
    const { activeTab, getTabListProps, getTabProps, getPanelProps, setActiveTab } = useTabs({ value, defaultValue, onValueChange, orientation });

    // Register tab values from children
    const tabValues: string[] = [];
    const processChildren = (children: React.ReactNode) => {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          const props = child.props as any;
          if (child.type === TabsTrigger) tabValues.push(props.value);
          if (child.type === TabsList) processChildren(props.children);
        }
      });
    };
    processChildren(children);

    return (
      <div ref={ref} className={className} style={{ display: 'flex', flexDirection: orientation === 'vertical' ? 'row' : 'column', ...style }}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          if (child.type === TabsList) {
            return React.cloneElement(child, { getTabProps, activeTab, variant, tabValues } as any);
          }
          if (child.type === TabsPanel) {
            return React.cloneElement(child, { getPanelProps, activeTab } as any);
          }
          return child;
        })}
      </div>
    );
  }
);
TabsRoot.displayName = 'TabsRoot';

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { getTabProps?: (v: string, i: number) => Record<string, unknown>; activeTab?: string; variant?: string; tabValues?: string[] }>(
  ({ children, getTabProps, activeTab, variant, tabValues = [], className, style, ...rest }, ref) => (
    <div ref={ref} role="tablist" style={{ display: 'flex', gap: '4px', borderBottom: variant === 'underline' ? `2px solid ${tokens.color.gray[200]}` : 'none', position: 'relative', ...style }} {...rest}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === TabsTrigger && getTabProps) {
          return React.cloneElement(child, { ...getTabProps((child.props as any).value, i) } as any);
        }
        return child;
      })}
    </div>
  )
);
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string; badge?: number | string }>(
  ({ value, badge, className, children, style, ...rest }, ref) => {
    const isSelected = (rest as any)['aria-selected'];
    return (
      <button ref={ref} style={{
        background: 'none', border: 'none', padding: '8px 16px', fontSize: tokens.fontSize.sm, fontWeight: 500,
        color: isSelected ? tokens.color.primary[500] : tokens.color.gray[500],
        cursor: 'pointer', position: 'relative', transition: 'color 150ms ease', whiteSpace: 'nowrap',
        ...(variant === 'pill' && isSelected ? { background: tokens.color.primary[50], borderRadius: tokens.radius.sm } : {}),
        ...style,
      }} {...rest}>
        {children}
        {badge !== undefined && <span style={{ marginLeft: '4px', background: tokens.color.destructive, color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: tokens.radius.full }}>{badge}</span>}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string; getPanelProps?: (v: string) => Record<string, unknown>; activeTab?: string }>(
  ({ value, getPanelProps, activeTab, children, className, style, ...rest }, ref) => {
    const panelProps = getPanelProps?.(value) || { hidden: activeTab !== value };
    return (
      <div ref={ref} style={{ padding: '16px 0', ...style }} {...panelProps} {...rest}>
        {children}
      </div>
    );
  }
);
TabsPanel.displayName = 'TabsPanel';

export const Tabs = { Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Panel: TabsPanel };
