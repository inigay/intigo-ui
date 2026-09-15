"use client";

import { useState } from 'react';
import {
  Button, Input, Select, Dialog, Checkbox, Switch,
  Tabs, Accordion, Toast, Badge, Avatar, Card,
  Skeleton, Tag, Spinner, ToastProvider, useToastContext,
} from '@intigo-ui/web';
import { tokens } from '@intigo-ui/tokens';

const sectionStyle: React.CSSProperties = { borderBottom: '1px solid #262626', padding: '32px 0' };
const headingStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#fafafa' };
const descStyle: React.CSSProperties = { fontSize: '14px', color: '#a1a1aa', marginBottom: '20px' };
const gridStyle: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' };
const cardStyle: React.CSSProperties = { background: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '24px', marginBottom: '16px' };
const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#71717a', minWidth: '60px', marginBottom: '8px' };

function ToastDemo() {
  const { toast } = useToastContext();
  return (
    <div style={gridStyle}>
      <Button variant="primary" onPress={() => toast({ title: 'Success!', description: 'Action completed', variant: 'success' })}>
        Success Toast
      </Button>
      <Button variant="destructive" onPress={() => toast({ title: 'Error', description: 'Something went wrong', variant: 'error' })}>
        Error Toast
      </Button>
      <Button variant="outline" onPress={() => toast({ title: 'Warning', description: 'Check this out', variant: 'warning' })}>
        Warning Toast
      </Button>
      <Button onPress={() => toast({ title: 'Info', description: 'Just letting you know', variant: 'info' })}>
        Info Toast
      </Button>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onPress={() => setOpen(true)}>Open Dialog</Button>
      <Dialog.Root open={open} onOpenChange={setOpen} size="md">
        <Dialog.Header>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <p style={{ color: tokens.color.gray[500], fontSize: '14px' }}>
            Make changes to your profile here. Click save when you&apos;re done.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
          <Button onPress={() => setOpen(false)}>Save changes</Button>
        </Dialog.Footer>
      </Dialog.Root>
    </div>
  );
}

function TabsDemo() {
  const [tab, setTab] = useState('account');
  return (
    <Tabs.Root value={tab} onValueChange={setTab} variant="underline">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="billing" badge={1}>Billing</Tabs.Trigger>
        <Tabs.Trigger value="team">Team</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="account">
        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Manage your account settings and preferences.</p>
      </Tabs.Panel>
      <Tabs.Panel value="billing">
        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>View billing history and manage subscriptions.</p>
      </Tabs.Panel>
      <Tabs.Panel value="team">
        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Invite team members and manage roles.</p>
      </Tabs.Panel>
    </Tabs.Root>
  );
}

function AccordionDemo() {
  return (
    <Accordion.Root type="single" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>What is Intigo UI? <Accordion.Indicator /></Accordion.Trigger>
        <Accordion.Panel>A cross-platform component library for React Native and Web.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it free? <Accordion.Indicator /></Accordion.Trigger>
        <Accordion.Panel>Yes. MIT licensed. Forever free.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>How do I get started? <Accordion.Indicator /></Accordion.Trigger>
        <Accordion.Panel>Install the package and import components. Check the docs for guides.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default function ShowcasePage() {
  const [checked, setChecked] = useState(false);
  const [swChecked, setSwChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnLoading2, setBtnLoading2] = useState(false);

  const selectOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Solid', value: 'solid' },
  ];

  return (
    <ToastProvider position="bottom-right">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <header style={{ padding: '48px 0 32px', borderBottom: '1px solid #262626' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fafafa' }}>Intigo UI</h1>
          </div>
          <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Component Library — Developer Showcase</p>
        </header>

        {/* Button */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Button</h2>
          <p style={descStyle}>6 variants, 5 sizes, loading & disabled states, icon support, hover/focus/active animations.</p>
          <div style={{ marginBottom: '16px' }}>
            <div style={labelStyle}>Variants</div>
            <div style={gridStyle}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={labelStyle}>Sizes</div>
            <div style={{ ...gridStyle, alignItems: 'center' }}>
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={labelStyle}>States</div>
            <div style={gridStyle}>
              <Button disabled>Disabled</Button>
              <Button variant="primary" disabled>Disabled Primary</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
              <Button variant="destructive" disabled>Disabled Destructive</Button>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={labelStyle}>Loading (auto-spinner, content fades out)</div>
            <div style={gridStyle}>
              <Button loading>Loading</Button>
              <Button variant="primary" loading>Saving…</Button>
              <Button variant="outline" loading>Loading</Button>
              <Button variant="destructive" loading>Deleting…</Button>
              <Button variant="secondary" loading>Processing…</Button>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={labelStyle}>Loading → Idle (interactive demo — click to toggle)</div>
            <div style={gridStyle}>
              <Button loading={btnLoading} onPress={() => setBtnLoading(v => !v)}>
                {btnLoading ? 'Loading…' : 'Click to Load'}
              </Button>
              <Button variant="primary" loading={btnLoading2} onPress={() => setBtnLoading2(v => !v)} icon={<span>💾</span>}>
                {btnLoading2 ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </div>
          <div style={gridStyle}>
            <Button icon={<span>+</span>}>With Icon</Button>
            <Button variant="outline" size="sm" rounded="pill">Pill</Button>
            <Button variant="ghost" rounded="none">Square</Button>
          </div>
        </section>

        {/* Input */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Input</h2>
          <p style={descStyle}>Label, description, error, leading/trailing adornments.</p>
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input.Root value={email} onValueChange={setEmail} placeholder="you@example.com">
              <Input.Label>Email address</Input.Label>
              <Input.Field />
              <Input.Description>We&apos;ll never share your email.</Input.Description>
            </Input.Root>
            <Input.Root placeholder="Search..." invalid>
              <Input.Label>Username</Input.Label>
              <Input.Field />
              <Input.Description variant="error">This username is taken.</Input.Description>
            </Input.Root>
          </div>
        </section>

        {/* Select */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Select</h2>
          <p style={descStyle}>Single/multi-select, searchable dropdown.</p>
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select.Root options={selectOptions} placeholder="Choose a framework" />
            <Select.Root options={selectOptions} searchable multiple placeholder="Select multiple..." />
          </div>
        </section>

        {/* Dialog */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Dialog</h2>
          <p style={descStyle}>Modal dialog with overlay, focus trap, escape-to-close.</p>
          <DialogDemo />
        </section>

        {/* Checkbox */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Checkbox</h2>
          <p style={descStyle}>Binary toggle with checked/indeterminate states.</p>
          <div style={gridStyle}>
            <Checkbox.Root checked={checked} onCheckedChange={setChecked}>Accept terms</Checkbox.Root>
            <Checkbox.Root defaultChecked>Pre-checked</Checkbox.Root>
            <Checkbox.Root checked="indeterminate">Indeterminate</Checkbox.Root>
            <Checkbox.Root disabled>Disabled</Checkbox.Root>
          </div>
        </section>

        {/* Switch */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Switch</h2>
          <p style={descStyle}>On/off toggle with animated thumb.</p>
          <div style={gridStyle}>
            <Switch.Root checked={swChecked} onCheckedChange={setSwChecked}>Enable notifications</Switch.Root>
            <Switch.Root defaultChecked>Dark mode</Switch.Root>
            <Switch.Root size="sm">Small</Switch.Root>
            <Switch.Root size="lg">Large</Switch.Root>
            <Switch.Root disabled>Disabled</Switch.Root>
          </div>
        </section>

        {/* Tabs */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Tabs</h2>
          <p style={descStyle}>Organize content into selectable panels with animated indicator.</p>
          <TabsDemo />
        </section>

        {/* Accordion */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Accordion</h2>
          <p style={descStyle}>Collapsible sections with animated expand/collapse.</p>
          <AccordionDemo />
        </section>

        {/* Toast */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Toast</h2>
          <p style={descStyle}>Auto-dismissing notifications with variants.</p>
          <ToastDemo />
        </section>

        {/* Badge */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Badge</h2>
          <p style={descStyle}>Count, dot, and label status indicators.</p>
          <div style={gridStyle}>
            <Badge value={5} max={99} color="destructive" />
            <Badge value={42} color="primary" />
            <Badge variant="dot" color="success" />
            <Badge variant="label" value="NEW" color="primary" />
            <Badge value={100} color="warning" />
          </div>
        </section>

        {/* Avatar */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Avatar</h2>
          <p style={descStyle}>Profile images with initials fallback and status.</p>
          <div style={{ ...gridStyle, gap: '16px' }}>
            <Avatar.Root src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" status="online" />
            <Avatar.Root fallback="JD" alt="John Doe" status="away" />
            <Avatar.Root fallback="AK" alt="Alice Kim" size="lg" />
            <Avatar.Root fallback="XS" size="xs" />
            <Avatar.Root fallback="SM" size="sm" />
          </div>
        </section>

        {/* Card */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Card</h2>
          <p style={descStyle}>Container for grouped content and actions.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Card.Root style={{ width: '280px' }}>
              <Card.Header>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Pricing Plan</h3>
                <Badge variant="label" value="POPULAR" color="primary" />
              </Card.Header>
              <Card.Body>
                <p style={{ fontSize: '14px', color: '#a1a1aa' }}>
                  $29/mo — Full access to all components, tokens, and updates.
                </p>
              </Card.Body>
              <Card.Footer>
                <Button fullWidth size="sm">Subscribe</Button>
              </Card.Footer>
            </Card.Root>
            <Card.Root variant="outlined" style={{ width: '280px' }}>
              <Card.Body>
                <p style={{ fontSize: '14px', color: '#a1a1aa' }}>Outlined variant with border and no shadow.</p>
              </Card.Body>
            </Card.Root>
          </div>
        </section>

        {/* Skeleton */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Skeleton</h2>
          <p style={descStyle}>Loading placeholders with shimmer animation.</p>
          <div style={cardStyle}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <Skeleton.Root variant="circle" width="40px" height="40px" />
              <div style={{ flex: 1 }}>
                <Skeleton.Root variant="text" width="60%" style={{ marginBottom: '6px' }} />
                <Skeleton.Root variant="text" width="40%" />
              </div>
            </div>
            <Skeleton.Root variant="text" lines={3} lastLineWidth="50%" />
          </div>
        </section>

        {/* Tag */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Tag</h2>
          <p style={descStyle}>Compact category/filter chips with dismiss and select.</p>
          <div style={gridStyle}>
            <Tag.Root color="primary"><Tag.Label>React</Tag.Label></Tag.Root>
            <Tag.Root color="success"><Tag.Label>TypeScript</Tag.Label></Tag.Root>
            <Tag.Root color="warning"><Tag.Label>JavaScript</Tag.Label></Tag.Root>
            <Tag.Root dismissible color="neutral"><Tag.Label>Dismissible</Tag.Label></Tag.Root>
            <Tag.Root variant="outlined" color="primary"><Tag.Label>Outlined</Tag.Label></Tag.Root>
            <Tag.Root variant="filled" color="destructive"><Tag.Label>Filled</Tag.Label></Tag.Root>
          </div>
        </section>

        {/* Spinner */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Spinner</h2>
          <p style={descStyle}>Loading indicators — indeterminate and determinate.</p>
          <div style={{ ...gridStyle, alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}><Spinner size="xs" /><div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>XS</div></div>
            <div style={{ textAlign: 'center' }}><Spinner size="sm" /><div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>SM</div></div>
            <div style={{ textAlign: 'center' }}><Spinner size="md" /><div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>MD</div></div>
            <div style={{ textAlign: 'center' }}><Spinner size="lg" /><div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>LG</div></div>
            <div style={{ textAlign: 'center' }}><Spinner size="xl" /><div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>XL</div></div>
            <div style={{ textAlign: 'center' }}><Spinner value={65} label="Uploading" /><div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>65%</div></div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '32px 0', borderTop: '1px solid #262626', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#52525b' }}>Intigo UI — Built with headless hooks + design tokens</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
