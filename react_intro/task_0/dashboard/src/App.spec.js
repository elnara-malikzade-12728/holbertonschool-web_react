import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  // 1. Single query to check for the <h1> element and its text content
  test('renders the h1 element with School Dashboard text', () => {
    render(<App />);
    const headingNode = screen.getByRole('heading', { name: /school dashboard/i, level: 1 });
    expect(headingNode).toBeInTheDocument();
  });

  // 2. Check the text content within the paragraphs (case insensitive)
  test('renders correct text content in the body and footer paragraphs', () => {
    render(<App />);
    
    const bodyNode = screen.getByText(/login to access the full dashboard/i);
    const footerNode = screen.getByText(/copyright \d{4}.*holberton school/i);

    expect(bodyNode).toBeInTheDocument();
    expect(footerNode).toBeInTheDocument();
  });

  // 3. Match the <img> element using its alt attribute text content
  test('renders the logo image element with correct alt text', () => {
    render(<App />);
    const logoNode = screen.getByAltText(/holberton logo/i);
    expect(logoNode).toBeInTheDocument();
  });
});
