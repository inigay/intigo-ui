import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../Button';

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Button onPress={onPress}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has aria-busy when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('has aria-disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onPress when disabled', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onPress={onPress}>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('supports variant prop', () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-variant', 'destructive');
  });

  it('supports size prop', () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-size', 'lg');
  });

  it('supports fullWidth prop', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveStyle('width: 100%');
  });

  it('supports icon prop', () => {
    render(
      <Button icon={<span data-testid="icon">+</span>}>Add</Button>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('supports custom aria-label for icon-only buttons', () => {
    render(
      <Button aria-label="Close dialog" icon={<span data-testid="icon">✕</span>} />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog');
  });

  it('renders as submit type when specified', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies data attributes', () => {
    render(<Button data-testid="primary-btn">Data Test</Button>);
    expect(screen.getByTestId('primary-btn')).toBeInTheDocument();
  });

  it('sets data-state="loading" when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'loading');
  });

  it('sets data-state="disabled" when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'disabled');
  });

  it('sets data-state="idle" by default', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'idle');
  });

  it('displays spinner when loading', () => {
    render(<Button loading>Saving</Button>);
    const spinner = screen.getByRole('button').querySelector('svg[viewBox="0 0 24 24"]');
    expect(spinner).not.toBeNull();
  });

  it('hides children content when loading', () => {
    render(<Button loading>Saving</Button>);
    const button = screen.getByRole('button');
    const spans = Array.from(button.querySelectorAll('span'));
    // The content wrapper is the last span child
    const contentSpan = spans[spans.length - 1];
    expect(contentSpan).toHaveStyle({ opacity: '0' });
  });
});
