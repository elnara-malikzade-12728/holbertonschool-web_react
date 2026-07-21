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
  test('logs when a notification item is clicked', () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Notifications
        notifications={notifications}
        displayDrawer
      />,
    );

    fireEvent.click(
      screen.getByText(/new course available/i),
    );

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );

    logSpy.mockRestore();
  });

  test('calls handleDisplayDrawer when the menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        notifications={notifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />,
    );

    fireEvent.click(
      screen.getByText('Your notifications'),
    );

    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  test('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        notifications={notifications}
        displayDrawer
        handleHideDrawer={handleHideDrawer}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close/i }),
    );

    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

  test('does not rerender when notifications length stays the same', () => {
    const firstNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'First notification',
      },
    ];

    const secondNotifications = [
      {
        id: 2,
        type: 'urgent',
        value: 'Replacement notification',
      },
    ];

    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={firstNotifications}
      />,
    );

    expect(
      screen.getByText('First notification'),
    ).toBeInTheDocument();

    rerender(
      <Notifications
        displayDrawer
        notifications={secondNotifications}
      />,
    );

    expect(
      screen.getByText('First notification'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Replacement notification'),
    ).not.toBeInTheDocument();
  });

  test('rerenders when notifications length changes', () => {
    const firstNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'First notification',
      },
    ];

    const updatedNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'First notification',
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New notification',
      },
    ];

    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={firstNotifications}
      />,
    );

    expect(
      screen.queryByText('New notification'),
    ).not.toBeInTheDocument();

    rerender(
      <Notifications
        displayDrawer
        notifications={updatedNotifications}
      />,
    );

    expect(
      screen.getByText('New notification'),
    ).toBeInTheDocument();
  });

  test('rerenders when displayDrawer changes', () => {
    const { rerender } = render(
      <Notifications
        notifications={notifications}
        displayDrawer={false}
      />,
    );

    expect(
      document.querySelector('.notification-items'),
    ).not.toBeInTheDocument();

    rerender(
      <Notifications
        notifications={notifications}
        displayDrawer
      />,
    );

    expect(
      document.querySelector('.notification-items'),
    ).toBeInTheDocument();
  });
});
