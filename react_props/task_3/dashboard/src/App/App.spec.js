import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  test('renders the email and password input elements', () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders the Email and Password labels', () => {
    render(<App />);

    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders the OK button', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /^ok$/i });

    expect(button).toBeInTheDocument();
  });
});
