import { fireEvent, render, screen } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    html: {
      __html:
        '<strong>Urgent requirement</strong> - complete by EOD',
    },
  },
];

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications notifications={notifications} />);

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications notifications={notifications} />);

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('renders 3 notification items', () => {
    render(<Notifications notifications={notifications} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('logs when the close button is clicked', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<Notifications notifications={notifications} />);

    fireEvent.click(
      screen.getByRole('button', { name: /close/i })
    );

    expect(logSpy).toHaveBeenCalledWith(
      'Close button has been clicked'
    );

    logSpy.mockRestore();
  });
});
