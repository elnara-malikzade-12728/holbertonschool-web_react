import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test(
    'renders a default notification in blue',
    () => {
      render(
        <NotificationItem
          id={1}
          type="default"
          value="New course available"
          markAsRead={() => {}}
        />,
      );

      const item = screen.getByText(
        /new course available/i,
      );

      expect(item).toHaveAttribute(
        'data-notification-type',
        'default',
      );

      expect(item).toHaveStyle({
        color: 'blue',
      });
    },
  );

  test(
    'renders an urgent notification in red',
    () => {
      render(
        <NotificationItem
          id={2}
          type="urgent"
          value="New resume available"
          markAsRead={() => {}}
        />,
      );

      const item = screen.getByText(
        /new resume available/i,
      );

      expect(item).toHaveAttribute(
        'data-notification-type',
        'urgent',
      );

      expect(item).toHaveStyle({
        color: 'red',
      });
    },
  );

  test(
    'renders the notification value',
    () => {
      render(
        <NotificationItem
          id={3}
          type="urgent"
          value="Urgent requirement"
          markAsRead={() => {}}
        />,
      );

      expect(
        screen.getByText(
          /urgent requirement/i,
        ),
      ).toBeInTheDocument();
    },
  );

  test(
    'calls markAsRead with the notification id when clicked',
    () => {
      const markAsRead = jest.fn();

      render(
        <NotificationItem
          id={4}
          type="urgent"
          value="Urgent notification"
          markAsRead={markAsRead}
        />,
      );

      fireEvent.click(
        screen.getByText(
          /urgent notification/i,
        ),
      );

      expect(
        markAsRead,
      ).toHaveBeenCalledTimes(1);

      expect(
        markAsRead,
      ).toHaveBeenCalledWith(4);
    },
  );
});
