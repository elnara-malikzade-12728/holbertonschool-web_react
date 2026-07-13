import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  // Test 1: Verifies BOTH the h1 role and text in a single query
  test('renders the h1 element with School Dashboard text', () => {
    render(<App />);
    const headingNode = screen.getByRole('heading', { name: /school dashboard/i, level: 1 });
    expect(headingNode).toBeInTheDocument();
  });

  // Test 2: Verifies paragraph text content
  test('renders correct text content in the body and footer paragraphs', () => {
    render(<App />);

    const bodyNode = screen.getByText(/login to access the full dashboard/i);
    const footerNode = screen.getByText(/copyright \d{4}.*holberton school/i);

    expect(bodyNode).toBeInTheDocument();
    expect(footerNode).toBeInTheDocument();
  });

  // Test 3: Robust matching for the image using its alt text
  test('renders the logo image element with correct alt text', () => {
    render(<App />);
    const logoNode = screen.getByRole('img', { name: /holberton logo/i });
    expect(logoNode).toBeInTheDocument();
  });
});
