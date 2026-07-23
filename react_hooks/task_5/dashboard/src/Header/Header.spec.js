import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Header from './Header';
import AppContext from '../Context/context';

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
    const contextValue = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>,
    );

    expect(
      document.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();
  });

  test('displays logout section when user is logged in', () => {
    const logOut = jest.fn();

    const contextValue = {
      user: {
        email: 'student@example.com',
        password: '',
        isLoggedIn: true,
      },
      logOut,
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>,
    );

    expect(
      document.querySelector('#logoutSection'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/welcome student@example\.com/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/\(logout\)/i),
    ).toBeInTheDocument();
  });

  test('calls logOut when logout link is clicked', () => {
    const logOut = jest.fn();

    const contextValue = {
      user: {
        email: 'student@example.com',
        password: '',
        isLoggedIn: true,
      },
      logOut,
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>,
    );

    fireEvent.click(
      screen.getByText(/\(logout\)/i),
    );

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
