import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders a default notification', () => {
    render(
      <NotificationItem
        id={1}
        type="default"
        value="New course available"
      />,
    );

    const item = screen.getByText(
      /new course available/i,
    );

    expect(item).toHaveAttribute(
      'data-notification-type',
      'default',
    );
  });

  test('renders an urgent notification', () => {
    render(
      <NotificationItem
        id={2}
        type="urgent"
        value="New resume available"
      />,
    );

    const item = screen.getByText(
      /new resume available/i,
    );

    expect(item).toHaveAttribute(
      'data-notification-type',
      'urgent',
    );
  });

  test('renders notification HTML', () => {
    render(
      <NotificationItem
        id={3}
        type="urgent"
        html={{
          __html: '<strong>Urgent requirement</strong>',
        }}
      />,
    );

    const item = screen.getByText(
      /urgent requirement/i,
    );

    expect(item).toHaveAttribute(
      'data-notification-type',
      'urgent',
    );
  });

  test('calls markAsRead with the notification id when clicked', () => {
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
      screen.getByText(/urgent notification/i),
    );

    expect(markAsRead).toHaveBeenCalledTimes(1);
    expect(markAsRead).toHaveBeenCalledWith(4);
  });

  test('does not rerender when props remain unchanged', () => {
    const markAsRead = jest.fn();

    const props = {
      id: 5,
      type: 'default',
      value: 'Memoized notification',
      markAsRead,
    };

    const { rerender } = render(
      <NotificationItem {...props} />,
    );

    const itemBeforeRerender = screen.getByText(
      /memoized notification/i,
    );

    rerender(
      <NotificationItem {...props} />,
    );

    expect(
      screen.getByText(/memoized notification/i),
    ).toBe(itemBeforeRerender);
  });
});
