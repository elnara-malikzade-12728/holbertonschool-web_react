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

  test('displays the menu item when the drawer is closed', () => {
    render(
      <Notifications
        notifications={notifications}
        displayDrawer={false}
      />,
    );

    expect(
      screen.getByText(/your notifications/i),
    ).toBeInTheDocument();
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
      screen.getByText(/your notifications/i),
    );

    expect(
      handleDisplayDrawer,
    ).toHaveBeenCalledTimes(1);
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
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      handleHideDrawer,
    ).toHaveBeenCalledTimes(1);
  });

  test('renders all notification items when the drawer is open', () => {
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

  test('calls markNotificationAsRead with the clicked notification ID', () => {
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

  test('displays the empty notification message when the list is empty', () => {
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

  test('rerenders when the notifications prop reference changes', () => {
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
      screen.queryByText('First notification'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText('Replacement notification'),
    ).toBeInTheDocument();
  });
});
