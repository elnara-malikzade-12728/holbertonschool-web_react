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
  test('renders without crashing', () => {
    render(<Notifications />);
  });

  test('calls handleDisplayDrawer when menu is clicked', () => {
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        notifications={notifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />,
    );

    fireEvent.click(
      screen.getByText(/your notifications/i),
    );

    expect(
      handleDisplayDrawer,
    ).toHaveBeenCalledTimes(1);
  });

  test('calls handleHideDrawer when close is clicked', () => {
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        notifications={notifications}
        displayDrawer
        handleHideDrawer={handleHideDrawer}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      handleHideDrawer,
    ).toHaveBeenCalledTimes(1);
  });

  test('renders notification items', () => {
    render(
      <Notifications
        notifications={notifications}
        displayDrawer
      />,
    );

    expect(
      screen.getByText(/new course available/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/new resume available/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/urgent requirement/i),
    ).toBeInTheDocument();
  });

  test('calls markNotificationAsRead with the item id', () => {
    const markNotificationAsRead = jest.fn();

    render(
      <Notifications
        notifications={notifications}
        displayDrawer
        markNotificationAsRead={
          markNotificationAsRead
        }
      />,
    );

    fireEvent.click(
      screen.getByText(/new course available/i),
    );

    expect(
      markNotificationAsRead,
    ).toHaveBeenCalledTimes(1);

    expect(
      markNotificationAsRead,
    ).toHaveBeenCalledWith(1);
  });

  test('shows an empty-list message', () => {
    render(
      <Notifications
        notifications={[]}
        displayDrawer
      />,
    );

    expect(
      screen.getByText(
        /no new notification for now/i,
      ),
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

  test('rerenders when the notifications prop changes', () => {
    const { rerender } = render(
      <Notifications
        notifications={notifications}
        displayDrawer
      />,
    );

    expect(
      screen.getByText(/new course available/i),
    ).toBeInTheDocument();

    const updatedNotifications = [
      ...notifications,
      {
        id: 4,
        type: 'default',
        value: 'New notification',
      },
    ];

    rerender(
      <Notifications
        notifications={updatedNotifications}
        displayDrawer
      />,
    );

    expect(
      screen.getByText(/new notification/i),
    ).toBeInTheDocument();
  });
});
