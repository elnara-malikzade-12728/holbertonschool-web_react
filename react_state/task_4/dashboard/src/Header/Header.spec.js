import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Header from './Header';
import AppContext from '../Context/context';

describe('Header component tests', () => {
  test('renders Header without crashing', () => {
    render(<Header />);
  });

  test('renders the logo', () => {
    render(<Header />);

    expect(
      screen.getByAltText(/holberton logo/i),
    ).toBeInTheDocument();
  });

  test('renders h1 element with correct text', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', {
        name: /school dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  test('does not render logoutSection with default context', () => {
    const { container } = render(<Header />);

    expect(
      container.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'student@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    const { container } = render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>,
    );

    expect(
      container.querySelector('#logoutSection'),
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

    const contextValue = {
      user: {
        email: 'student@example.com',
        password: 'password123',
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
