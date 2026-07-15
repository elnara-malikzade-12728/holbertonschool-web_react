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
      />
    );

    fireEvent.click(
      screen.getByText(/new course available/i)
    );

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    logSpy.mockRestore();
  });

  test('does not re-render when notifications length stays the same', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'test 1' },
      { id: 2, type: 'urgent', value: 'test 2' },
    ];

    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={notifications}
      />
    );

    const instance = document.querySelector('.notification-items');

    rerender(
      <Notifications
        displayDrawer
        notifications={[
          { id: 3, type: 'default', value: 'another' },
          { id: 4, type: 'urgent', value: 'again' },
        ]}
      />
    );

    expect(document.querySelector('.notification-items')).toBe(instance);
  });
  test('re-renders when notifications length changes', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'test' },
    ];

    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={notifications}
      />
    );

    rerender(
      <Notifications
        displayDrawer
        notifications={[
          { id: 1, type: 'default', value: 'test' },
          { id: 2, type: 'urgent', value: 'new' },
        ]}
      />
    );

    expect(document.querySelectorAll('li')).toHaveLength(2);
  });

});
