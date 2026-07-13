import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  test('renders the h1 element with School Dashboard text', () => {
    render(<App />);

    const headingElement = screen.getByRole('heading', {
      name: /school dashboard/i,
      level: 1,
    });

    expect(headingElement).toBeInTheDocument();
  });

  test('renders correct text content in the body and footer paragraphs', () => {
    render(<App />);

    const bodyParagraph = screen.getByText(
      /login to access the full dashboard/i
    );

    const footerRegex = /copyright \d{4}.*holberton school/i;
    const footerNode = screen.getByText(footerRegex);

    expect(bodyParagraph).toBeInTheDocument();
    expect(footerNode).toBeInTheDocument();
  });

  test('renders the logo image element with correct alt text', () => {
    render(<App />);

    const logoImage = screen.getByAltText(/holberton logo/i);

    expect(logoImage).toBeInTheDocument();
  });
});
