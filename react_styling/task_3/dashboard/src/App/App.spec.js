import { fireEvent, render } from '@testing-library/react';
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

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(logOut).toHaveBeenCalledTimes(1);
  });

  test('shows the logout alert when Control and h are pressed', () => {
    render(<App />);

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  });
});
