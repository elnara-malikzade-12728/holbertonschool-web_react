import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders a default notification in blue', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
      />
    );

    const item = screen.getByText(/new course available/i);

    expect(item).toHaveStyle({ color: 'blue' });
    expect(item).toHaveAttribute(
      'data-notification-type',
      'default'
    );
  });

  test('renders an urgent notification in red', () => {
    render(
      <NotificationItem
        type="urgent"
        value="New resume available"
      />
    );

    const item = screen.getByText(/new resume available/i);

    expect(item).toHaveStyle({ color: 'red' });
    expect(item).toHaveAttribute(
      'data-notification-type',
      'urgent'
    );
  });
});
