import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  test('renders Login by default', () => {
    render(<App />);

    expect(
      screen.getByText(
        /login to access the full dashboard/i,
      ),
    ).toBeInTheDocument();
  });

  test('renders CourseList after successful login', async () => {
    const user = userEvent.setup();

    render(<App />);

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

    expect(
      screen.getByText('ES6'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        /login to access the full dashboard/i,
      ),
    ).not.toBeInTheDocument();
  });
});
