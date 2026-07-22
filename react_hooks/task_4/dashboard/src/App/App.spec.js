import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders Login by default', () => {
    render(<App />);

    expect(
      screen.getByText(
        /login to access the full dashboard/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('ES6'),
    ).not.toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();
  });

  test('displays the notifications drawer by default', () => {
    render(<App />);

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).toBeInTheDocument();
  });

  test('hides the notifications drawer when close is clicked', () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).not.toBeInTheDocument();
  });

  test('displays the notifications drawer when the title is clicked', () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByText(
        /your notifications/i,
      ),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).toBeInTheDocument();
  });

  test('updates the user state after successful login', async () => {
    const user = userEvent.setup();

    render(<App />);

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    await user.type(
      emailInput,
      'student@example.com',
    );

    await user.type(
      passwordInput,
      'password123',
    );

    await user.click(
      screen.getByDisplayValue('OK'),
    );

    expect(
      screen.getByText('ES6'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Webpack'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('React'),
    ).toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /welcome student@example\.com/i,
      ),
    ).toBeInTheDocument();
  });

  test('clears the user state after logout', async () => {
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

    await user.click(
      screen.getByText(/\(logout\)/i),
    );

    expect(
      screen.getByText(
        /login to access the full dashboard/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('ES6'),
    ).not.toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i),
    ).toHaveValue('');

    expect(
      screen.getByLabelText(/password/i),
    ).toHaveValue('');
  });

  test('removes a notification and logs its ID when clicked', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<App />);

    expect(
      screen.getByText(
        /new course available/i,
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText(
        /new course available/i,
      ),
    );

    expect(
      screen.queryByText(
        /new course available/i,
      ),
    ).not.toBeInTheDocument();

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );
  });
});
