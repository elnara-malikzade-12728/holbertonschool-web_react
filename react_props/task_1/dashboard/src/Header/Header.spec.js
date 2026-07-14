import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component tests', () => { 
  
  test('renders Header without crashing', () => {
    render(<Header />);
  });

  test('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders h1 element with correct text', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: /school dashboard/i })
    ).toBeInTheDocument();
  });
});
