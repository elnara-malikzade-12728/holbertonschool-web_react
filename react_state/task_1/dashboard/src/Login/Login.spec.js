import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component tests', () => {
  test('renders 2 labels and 3 inputs', () => {
    const { container } = render(<Login />);

    const labels = container.querySelectorAll('label');
    const inputs = container.querySelectorAll('input');

    expect(labels).toHaveLength(2);
    expect(inputs).toHaveLength(3);

    expect(
      container.querySelector('input[type="email"]'),
    ).toBeInTheDocument();

    expect(
      container.querySelector('input[type="password"]'),
    ).toBeInTheDocument();

    expect(
      container.querySelector('input[type="submit"]'),
    ).toBeInTheDocument();
  });

  test('focuses the corresponding input when each label is clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    render(<Login />);

    const submitInput = screen.getByDisplayValue('OK');

    expect(submitInput).toBeDisabled();
  });

  test('submit input stays disabled when the email is invalid', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByDisplayValue('OK');

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');

    expect(submitInput).toBeDisabled();
  });

  test('submit input stays disabled when password has fewer than 8 characters', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByDisplayValue('OK');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '1234567');

    expect(submitInput).toBeDisabled();
  });

  test('submit input becomes enabled when email and password are valid', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByDisplayValue('OK');

    expect(submitInput).toBeDisabled();

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(submitInput).toBeEnabled();
  });

  test('submitting the form does not reload the page', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByDisplayValue('OK');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(submitInput).toBeEnabled();

    await user.click(submitInput);

    expect(submitInput).toBeInTheDocument();
  });
});
