import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  configureStore,
} from '@reduxjs/toolkit';
import {
  Provider,
} from 'react-redux';
import mockAxios from 'jest-mock-axios';

import Notifications from './Notifications';
import notificationsReducer, {
  fetchNotifications,
} from '../../features/notifications/notificationsSlice.js';

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

const createTestStore = ({
  notificationList = [],
  displayDrawer = true,
} = {}) =>
  configureStore({
    reducer: {
      notifications:
        notificationsReducer,
    },

    preloadedState: {
      notifications: {
        notifications:
          notificationList,
        displayDrawer,
      },
    },
  });

const renderWithStore = (
  store = createTestStore(),
) => {
  const result = render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  return {
    store,
    ...result,
  };
};

describe('Notifications component', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('renders without crashing', () => {
    renderWithStore();
  });

  test('opens the drawer when the title is clicked', () => {
    const store = createTestStore({
      notificationList:
        notifications,
      displayDrawer: false,
    });

    renderWithStore(store);

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByText(
        /your notifications/i,
      ),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).toBeInTheDocument();

    expect(
      store.getState()
        .notifications
        .displayDrawer,
    ).toBe(true);
  });

  test('closes the drawer when close is clicked', () => {
    const store = createTestStore({
      notificationList:
        notifications,
      displayDrawer: true,
    });

    renderWithStore(store);

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).not.toBeInTheDocument();

    expect(
      store.getState()
        .notifications
        .displayDrawer,
    ).toBe(false);
  });

  test('renders notification items from Redux', () => {
    const store = createTestStore({
      notificationList:
        notifications,
    });

    renderWithStore(store);

    expect(
      screen.getByText(
        /new course available/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /new resume available/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /urgent requirement/i,
      ),
    ).toBeInTheDocument();
  });

  test('removes a notification when it is marked as read', async () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const store = createTestStore({
      notificationList:
        notifications,
    });

    renderWithStore(store);

    fireEvent.click(
      screen.getByText(
        /new course available/i,
      ),
    );

    await waitFor(() => {
      expect(
        screen.queryByText(
          /new course available/i,
        ),
      ).not.toBeInTheDocument();
    });

    expect(
      store
        .getState()
        .notifications
        .notifications,
    ).toHaveLength(2);

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );
  });

  test('shows an empty-list message', () => {
    renderWithStore(
      createTestStore({
        notificationList: [],
        displayDrawer: true,
      }),
    );

    expect(
      screen.getByText(
        /no new notification for now/i,
      ),
    ).toBeInTheDocument();
  });

  test('displays notifications returned by fetchNotifications', async () => {
    const store = createTestStore({
      notificationList: [],
      displayDrawer: true,
    });

    renderWithStore(store);

    store.dispatch(
      fetchNotifications(),
    );

    expect(
      mockAxios.get,
    ).toHaveBeenCalledWith(
      '/notifications.json',
    );

    await act(async () => {
      mockAxios.mockResponseFor(
        {
          url: '/notifications.json',
        },
        {
          data: notifications,
        },
      );
    });

    expect(
      await screen.findByText(
        /new course available/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /new resume available/i,
      ),
    ).toBeInTheDocument();
  });
});
