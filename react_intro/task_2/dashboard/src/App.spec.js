import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  // Test 1: Single query to verify both the h1 element and text content
  test('renders the h1 element with School Dashboard text', () => {
    render(<App />);
    const headingNode = screen.getByRole('heading', { name: /school dashboard/i, level: 1 });
    expect(headingNode).toBeInTheDocument();
  });

  // Test 2: Checks the specific text within the 2 paragraphs
  test('renders correct text content in the body and footer paragraphs', () => {
    render(<App />);
    
    const bodyNode = screen.getByText(/login to access the full dashboard/i);
    const footerNode = screen.getByText(/copyright \d{4} - holberton school/i);

    expect(bodyNode).toBeInTheDocument();
    expect(footerNode).toBeInTheDocument();
  });

  // Test 3: Match image element by its alt attribute content
  test('renders the logo image element with correct alt text', () => {
    render(<App />);
    const logoNode = screen.getByAltText(/holberton logo/i);
    expect(logoNode).toBeInTheDocument();
  });

  test('renders 2 input elements', () => {
    render(<App />);
    const inputs = document.querySelectorAll('input');
    expect(inputs).toHaveLength(2);
  });

  test('renders Email and Password labels', () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders the OK button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i})).toBeInTheDocument();
  });
});
