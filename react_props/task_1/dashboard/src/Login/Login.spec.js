
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
    render(<Login />);

    // Select elements by exact text matching
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    // Simulate clicking the labels (implicitly done by clicking the linked input/label relation)
    await userEvent.click(screen.getByText('Email:'));
    expect(emailInput).toHaveFocus();

    await userEvent.click(screen.getByText('Password:'));
    expect(passwordInput).toHaveFocus();
  });
});
