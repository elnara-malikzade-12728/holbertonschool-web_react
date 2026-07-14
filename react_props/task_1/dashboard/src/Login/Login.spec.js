import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component tests', () => {
  test('renders Login without crashing', () => {
    render(<Login />);
  });

  test('renders 2 labels, 2 inputs, and 1 button', () => {
    render(<Login />);

    expect(document.querySelectorAll('label')).toHaveLength(2);
    expect(document.querySelectorAll('input')).toHaveLength(2);
    expect(document.querySelectorAll('button')).toHaveLength(1);
  });

  test('focuses the related input when a label is clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailLabel = screen.getByText(/^email:$/i);
    const passwordLabel = screen.getByText(/^password:$/i);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });
});
