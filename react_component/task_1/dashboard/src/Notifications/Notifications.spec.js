import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
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
  test('always displays Your notifications', () => {
    render(<Notifications />);

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();
  });

  test('does not display the drawer when displayDrawer is false', () => {
    render(
      <Notifications
        notifications={notifications}
        displayDrawer={false}
      />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /close/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(/here is the list of notifications/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('displays the drawer when displayDrawer is true', () => {
    render(
      <Notifications
        notifications={notifications}
        displayDrawer
      />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(3);
  });

  test('displays the empty notification message', () => {
    render(
      <Notifications
        notifications={[]}
        displayDrawer
      />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/no new notification for now/i)
    ).toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('logs when the close button is clicked', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Notifications
        notifications={notifications}
        displayDrawer
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close/i })
    );

    expect(logSpy).toHaveBeenCalledWith(
      'Close button has been clicked'
    );

    logSpy.mockRestore();
  });
});
