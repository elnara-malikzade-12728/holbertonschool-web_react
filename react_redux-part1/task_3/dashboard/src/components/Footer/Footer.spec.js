import {
  render,
  screen,
} from '@testing-library/react';
import Footer from './Footer';

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
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    };

    render(<Footer user={user} />);

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      }),
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    const user = {
      email: 'student@example.com',
      password: 'password123',
      isLoggedIn: true,
    };

    render(<Footer user={user} />);

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      }),
    ).toBeInTheDocument();
  });
});