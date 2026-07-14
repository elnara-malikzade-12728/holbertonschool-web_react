import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component tests', () => {
  test('renders 2 labels, 2 inputs, and 1 button', () => {
    render(<Login />);

    const labels = document.querySelectorAll('label');
    const inputs = document.querySelectorAll('input');
    const buttons = document.querySelectorAll('button');

    expect(labels).toHaveLength(2);
    expect(inputs).toHaveLength(2);
    expect(buttons).toHaveLength(1);
  });

  test('focuses the related input when a label is clicked', () => {
    render(<Login />);

    const emailLabel = screen.getByText(/^email:$/i);
    const passwordLabel = screen.getByText(/^password:$/i);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.click(emailLabel);
    emailInput.focus();
    expect(emailInput).toHaveFocus();

    fireEvent.click(passwordLabel);
    passwordInput.focus();
    expect(passwordInput).toHaveFocus();
  });
});
