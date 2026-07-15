import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App component lifecycle tests', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  test('calls logOut once when Control and h are pressed', () => {
    const logOut = jest.fn();

    render(<App logOut={logOut} />);

    fireEvent.keyDown(window, {
      key: 'h',
      ctrlKey: true,
    });

    expect(logOut).toHaveBeenCalledTimes(1);
  });

  test('shows the logout alert when Control and h are pressed', () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  });

  test('renders the school news section by default', () => {
    render(<App />);

    const newsHeading = screen.getByRole('heading', {
      level: 2,
      name: /news from the school/i,
    });

    const newsParagraph = screen.getByText(
      /holberton school news goes here/i
    );

    expect(newsHeading).toBeInTheDocument();
    expect(newsParagraph).toBeInTheDocument();
  });
});
