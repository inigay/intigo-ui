import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../Button';

describe('Button', () => {
  it('renders a button element', () => {
    render(
      <Button.Root>
        <Button.Label>Click me</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(
      <Button.Root>
        <Button.Label>Save changes</Button.Label>
      </Button.Root>
    );
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(
      <Button.Root onPress={onPress}>
        <Button.Label>Click</Button.Label>
      </Button.Root>
    );
    await user.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Button.Root disabled>
        <Button.Label>Disabled</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has aria-busy when loading', () => {
    render(
      <Button.Root loading>
        <Button.Label>Loading</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('has aria-disabled when loading', () => {
    render(
      <Button.Root loading>
        <Button.Label>Loading</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onPress when disabled', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(
      <Button.Root disabled onPress={onPress}>
        <Button.Label>Disabled</Button.Label>
      </Button.Root>
    );
    await user.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('supports variant prop', () => {
    render(
      <Button.Root variant="destructive">
        <Button.Label>Delete</Button.Label>
      </Button.Root>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-variant', 'destructive');
  });

  it('supports size prop', () => {
    render(
      <Button.Root size="lg">
        <Button.Label>Large</Button.Label>
      </Button.Root>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-size', 'lg');
  });

  it('supports fullWidth prop', () => {
    render(
      <Button.Root fullWidth>
        <Button.Label>Full Width</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveStyle('width: 100%');
  });

  it('supports icon slot', () => {
    render(
      <Button.Root>
        <Button.Icon position="left">
          <span data-testid="icon">+</span>
        </Button.Icon>
        <Button.Label>Add</Button.Label>
      </Button.Root>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('supports custom aria-label for icon-only buttons', () => {
    render(
      <Button.Root aria-label="Close dialog">
        <Button.Icon><span data-testid="icon">✕</span></Button.Icon>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog');
  });

  it('renders as submit type when specified', () => {
    render(
      <Button.Root type="submit">
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies data attributes', () => {
    render(
      <Button.Root data-testid="primary-btn">
        <Button.Label>Data Test</Button.Label>
      </Button.Root>
    );
    expect(screen.getByTestId('primary-btn')).toBeInTheDocument();
  });

  it('sets data-state="loading" when loading', () => {
    render(
      <Button.Root loading>
        <Button.Label>Loading</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'loading');
  });

  it('sets data-state="disabled" when disabled', () => {
    render(
      <Button.Root disabled>
        <Button.Label>Disabled</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'disabled');
  });

  it('sets data-state="idle" by default', () => {
    render(
      <Button.Root>
        <Button.Label>Click</Button.Label>
      </Button.Root>
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'idle');
  });

  it('displays spinner when loading', () => {
    render(
      <Button.Root loading>
        <Button.Label>Saving</Button.Label>
      </Button.Root>
    );
    const spinner = screen.getByRole('button').querySelector('svg[viewBox="0 0 24 24"]');
    expect(spinner).not.toBeNull();
  });

  it('hides children content when loading', () => {
    render(
      <Button.Root loading>
        <Button.Label>Saving</Button.Label>
      </Button.Root>
    );
    const contentSpan = screen.getByText('Saving').parentElement;
    expect(contentSpan).toHaveStyle({ opacity: '0' });
  });
});
