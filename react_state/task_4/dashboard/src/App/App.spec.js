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

    const submitInput =
      screen.getByDisplayValue('OK');

    expect(submitInput).toBeEnabled();

    await user.click(submitInput);

    expect(
      screen.getByText('ES6'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Webpack'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('React'),
    ).toBeInTheDocument();
  });

  test('renders logoutSection after successful login', async () => {
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
      document.querySelector('#logoutSection'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /welcome student@example\.com/i,
      ),
    ).toBeInTheDocument();
  });

  test('returns to Login after logout is clicked', async () => {
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
  });

  test('removes a notification and logs its ID when clicked', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<App />);

    fireEvent.click(
      screen.getByText(/your notifications/i),
    );

    expect(
      screen.getByText(/new course available/i),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText(/new course available/i),
    );

    expect(
      screen.queryByText(/new course available/i),
    ).not.toBeInTheDocument();

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );
  });

  test('removes every notification and keeps the drawer usable when empty', async () => {
    const user = userEvent.setup();
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);

    await user.click(screen.getByText(/your notifications/i));
    const items = [/new course available/i, /new resume available/i, /urgent requirement/i];
    for (const [index, text] of items.entries()) {
      await user.click(screen.getByText(text));
      expect(screen.queryByText(text)).not.toBeInTheDocument();
      expect(logSpy).toHaveBeenCalledWith(`Notification ${index + 1} has been marked as read`);
      expect(screen.queryAllByRole('listitem')).toHaveLength(2 - index);
    }

    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/no new notification for now/i)).not.toBeInTheDocument();
    await user.click(screen.getByText(/your notifications/i));
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });
});
