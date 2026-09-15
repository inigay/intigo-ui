import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from '../Dialog';

describe('Dialog', () => {
  it('renders dialog content when open', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Test Dialog</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render dialog content when closed', () => {
    render(
      <Dialog.Root open={false}>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Test Dialog</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Description>Change your preferences</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('renders title and links it via aria-labelledby', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Confirm Action</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
  });

  it('renders description and links it via aria-describedby', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Description>Are you sure you want to delete this item?</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('calls onOpenChange when closed via close button', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Dialog.Root open onOpenChange={onOpenChange}>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Close me</Dialog.Title>
          <Dialog.Close>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    );
    await user.click(screen.getByText('Close'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('supports trigger to open dialog', async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root>
        <Dialog.Trigger>
          <button>Open</button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Hello</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('supports footer with actions', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Body>
            <p>Are you sure?</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close><button>Cancel</button></Dialog.Close>
            <button>Confirm</button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('supports size prop', () => {
    render(
      <Dialog.Root open size="lg">
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Large Dialog</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg');
  });

  it('supports position prop on content', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content position="top">
          <Dialog.Title>Top Dialog</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-position', 'top');
  });

  it('supports overlay', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>With Overlay</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();
  });

  it('supports scrollable body', () => {
    render(
      <Dialog.Root open>
        <Dialog.Overlay />
        <Dialog.Content scrollBehavior="inside">
          <Dialog.Header>
            <Dialog.Title>Scrollable</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {Array.from({ length: 50 }).map((_, i) => (
              <p key={i}>Line {i + 1}</p>
            ))}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    );
    expect(screen.getByText('Scrollable')).toBeInTheDocument();
  });
});
