import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input.Root><Input.Field /></Input.Root>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('supports controlled value', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Input.Root value="hello" onValueChange={onValueChange}>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });

  it('calls onValueChange on input', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Input.Root onValueChange={onValueChange}>
        <Input.Field />
      </Input.Root>
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    expect(onValueChange).toHaveBeenCalled();
  });

  it('supports label with htmlFor', () => {
    render(
      <Input.Root>
        <Input.Label>Email address</Input.Label>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  });

  it('supports description text', () => {
    render(
      <Input.Root>
        <Input.Field />
        <Input.Description>We'll never share your email.</Input.Description>
      </Input.Root>
    );
    expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
  });

  it('supports error variant on description', () => {
    render(
      <Input.Root invalid>
        <Input.Field />
        <Input.Description variant="error">Name is required.</Input.Description>
      </Input.Root>
    );
    expect(screen.getByText('Name is required.')).toHaveAttribute('data-variant', 'error');
  });

  it('sets aria-invalid when invalid', () => {
    render(
      <Input.Root invalid>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports disabled state', () => {
    render(
      <Input.Root disabled>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('supports readOnly state', () => {
    render(
      <Input.Root readOnly>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('supports required state', () => {
    render(
      <Input.Root required>
        <Input.Label>Full name</Input.Label>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByLabelText('Full name')).toBeRequired();
  });

  it('supports placeholder', () => {
    render(
      <Input.Root placeholder="you@example.com">
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('supports type variants', () => {
    const { rerender } = render(
      <Input.Root type="password"><Input.Field /></Input.Root>
    );
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('supports maxLength', () => {
    render(
      <Input.Root maxLength={10}>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '10');
  });

  it('supports leading adornment', () => {
    render(
      <Input.Root>
        <Input.Leading><span data-testid="leading-icon">@</span></Input.Leading>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('supports trailing adornment', () => {
    render(
      <Input.Root>
        <Input.Field />
        <Input.Trailing><span data-testid="trailing-icon">✕</span></Input.Trailing>
      </Input.Root>
    );
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });
});
