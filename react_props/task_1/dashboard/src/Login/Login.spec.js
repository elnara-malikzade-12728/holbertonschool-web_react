
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

    // 1. screen.getByLabelText directly finds the <input> linked to that label
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // 2. To get the actual <label> elements to click them, use getByText
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    
    // 3. Simulate clicking the labels and assert the input receives focus
    await userEvent.click(emailLabel);
    expect(emailInput).toHaveFocus(); // Note: Don't forget the execution parentheses ()

    await userEvent.click(passwordLabel); // Fixed typo from 'passworLabel'
    expect(passwordInput).toHaveFocus();
  });
});
