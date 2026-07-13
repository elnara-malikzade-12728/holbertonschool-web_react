import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  test('renders the h1 element with School Dashboard text', () => {
    render(<App />);

    const headingNode = screen.getByText(/school dashboard/i);

    expect(headingNode).toBeInTheDocument();
  });

  test('renders correct text content in the body and footer paragraphs', () => {
    render(<App />);

    const bodyNode = screen.getByText(
      /login to access the full dashboard/i
    );

    const footerRegex = /copyright \d{4}.*holberton school/i;
    const footerNode = screen.getByText(footerRegex);

    expect(bodyNode).toBeInTheDocument();
    expect(footerNode).toBeInTheDocument();
  });

  test('renders the logo image element with correct alt text', () => {
    render(<App />);

    const logoNode = screen.getByAltText(/holberton logo/i);

    expect(logoNode).toBeInTheDocument();
  });
});
