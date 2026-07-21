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
      screen.getByText(/email/i);

    const passwordLabel =
      screen.getByText(/password/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    render(<Login />);

    const submitInput =
      screen.getByDisplayValue('OK');

    expect(submitInput).toBeDisabled();
  });

  test('submit input becomes enabled when the email and password are valid', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    const submitInput =
      screen.getByDisplayValue('OK');

    await user.type(
      emailInput,
      'test@example.com',
    );

    await user.type(
      passwordInput,
      'password123',
    );

    expect(submitInput).toBeEnabled();
  });

  test('calls logIn with the email and password when the form is submitted', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();

    render(
      <Login logIn={logIn} />,
    );

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    const submitInput =
      screen.getByDisplayValue('OK');

    await user.type(
      emailInput,
      'student@example.com',
    );

    await user.type(
      passwordInput,
      'password123',
    );

    await user.click(submitInput);

    expect(logIn).toHaveBeenCalledTimes(1);

    expect(logIn).toHaveBeenCalledWith(
      'student@example.com',
      'password123',
    );
  });
});
