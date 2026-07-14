import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component tests', () => {
  test('renders 2 labels, 2 inputs, and 1 button', () => {
    const { container } = render(<Login />);

    const labels = container.querySelectorAll('label');
    const inputs = container.querySelectorAll('input');
    const buttons = container.querySelectorAll('button');

    expect(labels).toHaveLength(2);
    expect(inputs).toHaveLength(2);
    expect(buttons).toHaveLength(1);
  });

  test('focuses the corresponding input when each label is clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailLabel = screen.getByText(/^email:$/i);
    const passwordLabel = screen.getByText(/^password:$/i);

    const emailInput = screen.getByLabelText(/^email:$/i);
    const passwordInput = screen.getByLabelText(/^password:$/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });
});
