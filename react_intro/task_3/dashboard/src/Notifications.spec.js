import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('renders 3 notification list items', () => {
    render(<Notifications />);

    const notifications = screen.getAllByRole('listitem');
    expect(notifications).toHaveLength(3);
  });

  test('logs a message when the close button is clicked', () => {
    const logSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

    render(<Notifications />);

    const button = screen.getByRole('button', {
        name: /close/i,
    });

    fireEvent.click(button);

    expect(logSpy).toHaveBeenCalledWith(
        'Close button has been clicked'
    );

    logSpy.mockRestore();
    });
});
