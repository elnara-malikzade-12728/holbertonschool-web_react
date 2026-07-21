import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import AppContext from '../Context/context';

describe('Footer component tests', () => {
  test('renders Footer without crashing', () => {
    render(<Footer />);
  });

  test('renders the correct copyright text', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(
        new RegExp(
          `Copyright ${currentYear} - Holberton School`,
          'i',
        ),
      ),
    ).toBeInTheDocument();
  });

  test('does not display Contact us when user is logged out', () => {
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
        <Footer />
      </AppContext.Provider>,
    );

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      }),
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'student@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>,
    );

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      }),
    ).toBeInTheDocument();
  });
});
