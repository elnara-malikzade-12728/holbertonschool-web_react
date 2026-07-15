import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

describe('WithLogging HOC', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('renders the wrapped component', () => {
    const WrappedComponent = WithLogging(MockApp);

    render(<WrappedComponent />);

    const heading = screen.getByRole('heading', {
      name: /hello from mock app component/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('logs when the wrapped component mounts', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const WrappedComponent = WithLogging(MockApp);

    render(<WrappedComponent />);

    expect(logSpy).toHaveBeenCalledWith(
      'Component MockApp is mounted'
    );
  });

  test('logs when the wrapped component unmounts', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const WrappedComponent = WithLogging(MockApp);

    const { unmount } = render(<WrappedComponent />);

    unmount();

    expect(logSpy).toHaveBeenCalledWith(
      'Component MockApp is going to unmount'
    );
  });

  test('sets the correct display name', () => {
    const WrappedComponent = WithLogging(MockApp);

    expect(WrappedComponent.displayName).toBe(
      'WithLogging(MockApp)'
    );
  });
});
