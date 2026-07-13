import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {

  // Test 1: Verify the Heading element
  test('renders the h1 element with School Dashboard text', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /school dashboard/i, level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  // Test 2: Verify the paragraph texts in body and footer
  test('renders correct text content in the body and footer paragraphs', () => {
    render(<App />);

    // Check body paragraph content
    const bodyParagraph = screen.getByText(/login to access the full dashboard/i);
    expect(bodyParagraph).toBeInTheDocument();

    // Check footer paragraph content
    const currentYear = new Date().getFullYear();

    const footerParagraph = screen.getByText(/copyright/i);

    expect(footerParagraph).toBeInTheDocument();
    });

  // Test 3: Verify the Holberton logo image element
  test('renders the logo image element with correct alt text', () => {
    render(<App />);
    const logoImage = screen.getByRole('img', { name: /holberton logo/i });
    expect(logoImage).toBeInTheDocument();
  });

});
