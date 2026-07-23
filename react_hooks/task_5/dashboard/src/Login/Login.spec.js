import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component tests', () => {
  test('renders 2 labels and 3 inputs', () => {
    const { container } = render(<Login />);

    const labels =
      container.querySelectorAll('label');

    const inputs =
      container.querySelectorAll('input');

    expect(labels).toHaveLength(2);
    expect(inputs).toHaveLength(3);

    expect(
      container.querySelector(
        'input[type="submit"]',
      ),
    ).toBeInTheDocument();
  });

  test('focuses the corresponding input when each label is clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    const emailLabel =
      screen.getByText(/^email:$/i);

    const passwordLabel =
      screen.getByText(/^password:$/i);

    await user.click(emailLabel);

    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);

    expect(passwordInput).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    render(<Login />);

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();
  });

  test('submit input stays disabled with an invalid email', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByLabelText(/email/i),
      'invalid-email',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();
  });

  test('submit input stays disabled with a password shorter than 8 characters', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'pass123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();
  });

  test('submit input becomes enabled when the email and password are valid', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeEnabled();
  });

  test('calls logIn with the email and password when the form is submitted', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();

    render(<Login logIn={logIn} />);

    await user.type(
      screen.getByLabelText(/email/i),
      'student@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    await user.click(
      screen.getByDisplayValue('OK'),
    );

    expect(logIn).toHaveBeenCalledTimes(1);

    expect(logIn).toHaveBeenCalledWith(
      'student@example.com',
      'password123',
    );
  });

  test('does not call logIn when the form is invalid', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();

    render(<Login logIn={logIn} />);

    await user.type(
      screen.getByLabelText(/email/i),
      'invalid-email',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();

    expect(logIn).not.toHaveBeenCalled();
  });
});
