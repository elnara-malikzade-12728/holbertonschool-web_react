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
    isRead: false,
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    isRead: false,
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    isRead: false,
    value:
      'Urgent requirement - complete by EOD',
  },
];

const createTestStore = ({
  notificationList = [],
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
        loading: false,
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

  test(
    'toggles the drawer visibility',
    () => {
      renderWithStore(
        createTestStore({
          notificationList:
            notifications,
        }),
      );

      const drawer =
        document.querySelector(
          '.notification-items',
        );

      expect(drawer).toBeInTheDocument();

      expect(
        drawer.classList.contains(
          'visible',
        ),
      ).toBe(false);

      fireEvent.click(
        screen.getByText(
          /your notifications/i,
        ),
      );

      expect(
        drawer.classList.contains(
          'visible',
        ),
      ).toBe(true);

      fireEvent.click(
        screen.getByRole('button', {
          name: /close/i,
        }),
      );

      expect(
        drawer.classList.contains(
          'visible',
        ),
      ).toBe(false);
    },
  );

  test(
    'renders all notification items by default',
    () => {
      renderWithStore(
        createTestStore({
          notificationList:
            notifications,
        }),
      );

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
    },
  );

  test(
    'shows only urgent notifications when urgent filter is selected',
    () => {
      renderWithStore(
        createTestStore({
          notificationList:
            notifications,
        }),
      );

      fireEvent.click(
        screen.getByRole('button', {
          name:
            /filter urgent notifications/i,
        }),
      );

      expect(
        screen.queryByText(
          /new course available/i,
        ),
      ).not.toBeInTheDocument();

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
    },
  );

  test(
    'shows only default notifications when default filter is selected',
    () => {
      renderWithStore(
        createTestStore({
          notificationList:
            notifications,
        }),
      );

      fireEvent.click(
        screen.getByRole('button', {
          name:
            /filter default notifications/i,
        }),
      );

      expect(
        screen.getByText(
          /new course available/i,
        ),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          /new resume available/i,
        ),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(
          /urgent requirement/i,
        ),
      ).not.toBeInTheDocument();
    },
  );

  test(
    'removes a notification when it is marked as read',
    async () => {
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
    },
  );

  test(
    'shows an empty-list message',
    () => {
      renderWithStore(
        createTestStore({
          notificationList: [],
        }),
      );

      expect(
        screen.getByText(
          /no new notification for now/i,
        ),
      ).toBeInTheDocument();
    },
  );

  test(
    'displays unread notifications returned by fetchNotifications',
    async () => {
      const store = createTestStore({
        notificationList: [],
      });

      renderWithStore(store);

      const request = store.dispatch(
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
            url:
              '/notifications.json',
          },
          {
            data: [
              {
                id: 1,
                context: {
                  type: 'default',
                  isRead: false,
                  value:
                    'New course available',
                },
              },
              {
                id: 2,
                context: {
                  type: 'urgent',
                  isRead: false,
                  value:
                    'New resume available',
                },
              },
              {
                id: 3,
                context: {
                  type: 'urgent',
                  isRead: true,
                  value:
                    'Already read notification',
                },
              },
            ],
          },
        );

        await request;
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

      expect(
        screen.queryByText(
          /already read notification/i,
        ),
      ).not.toBeInTheDocument();
    },
  );
});
