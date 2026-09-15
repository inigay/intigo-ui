import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Select', () => {
  it('renders a trigger button', () => {
    render(
      <Select.Root options={options}>
        <Select.Trigger><Select.Value /></Select.Trigger>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(
      <Select.Root options={options} placeholder="Choose a fruit">
        <Select.Trigger><Select.Value /></Select.Trigger>
      </Select.Root>
    );
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
  });

  it('opens popup on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Select.Root options={options}>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects an option on click', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select.Root options={options} onValueChange={onValueChange}>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Banana'));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('shows selected value in trigger', async () => {
    const user = userEvent.setup();
    render(
      <Select.Root options={options} defaultValue="banana">
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports controlled value', () => {
    render(
      <Select.Root options={options} value="cherry">
        <Select.Trigger><Select.Value /></Select.Trigger>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded when open', async () => {
    const user = userEvent.setup();
    render(
      <Select.Root options={options}>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports disabled state', () => {
    render(
      <Select.Root options={options} disabled>
        <Select.Trigger><Select.Value /></Select.Trigger>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('supports searchable mode', async () => {
    const user = userEvent.setup();
    render(
      <Select.Root options={options} searchable>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.Search />
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('supports multi-select', () => {
    render(
      <Select.Root options={options} multiple>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('supports invalid state', () => {
    render(
      <Select.Root options={options} invalid>
        <Select.Trigger><Select.Value /></Select.Trigger>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports clearable', () => {
    render(
      <Select.Root options={options} value="apple" clearable>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.ClearButton />
      </Select.Root>
    );
    expect(screen.getByLabelText('Clear selection')).toBeInTheDocument();
  });

  it('supports loading state', () => {
    render(
      <Select.Root options={options} loading>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Popup>
          <Select.List />
        </Select.Popup>
      </Select.Root>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-busy', 'true');
  });
});
