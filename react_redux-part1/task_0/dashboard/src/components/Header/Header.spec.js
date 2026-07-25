import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('renders the logo', () => {
    render(<Header />);

    expect(
      screen.getByAltText(/holberton logo/i),
    ).toBeInTheDocument();
  });

  test('renders the title', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', {
        name: /school dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  test('does not display logout section when user is logged out', () => {
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    };

    render(
      <Header
        user={user}
        logOut={jest.fn()}
      />,
    );

    expect(
      document.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();
  });

  test('displays logout section when user is logged in', () => {
    const user = {
      email: 'student@example.com',
      password: '',
      isLoggedIn: true,
    };

    render(
      <Header
        user={user}
        logOut={jest.fn()}
      />,
    );

    expect(
      document.querySelector('#logoutSection'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /welcome student@example\.com/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/\(logout\)/i),
    ).toBeInTheDocument();
  });

  test('calls logOut when logout link is clicked', () => {
    const logOut = jest.fn();

    const user = {
      email: 'student@example.com',
      password: '',
      isLoggedIn: true,
    };

    render(
      <Header
        user={user}
        logOut={logOut}
      />,
    );

    fireEvent.click(
      screen.getByText(/\(logout\)/i),
    );

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});