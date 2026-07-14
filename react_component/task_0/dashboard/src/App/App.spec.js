import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders Login when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);

    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn />);

    expect(screen.getByRole('table')).toBeInTheDocument();

    expect(
      screen.queryByText(/login to access the full dashboard/i)
    ).not.toBeInTheDocument();
  });
});
