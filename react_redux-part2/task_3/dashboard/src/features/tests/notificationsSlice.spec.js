import {
  configureStore,
} from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';

import notificationsReducer, {
  ENDPOINTS,
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice.js';

describe('notificationsSlice', () => {
  const expectedInitialState = {
    notifications: [],
    loading: false,
  };

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test(
    'returns the correct initial state',
    () => {
      const state =
        notificationsReducer(
          undefined,
          {
            type: 'unknown',
          },
        );

      expect(state).toEqual(
        expectedInitialState,
      );
    },
  );

  test(
    'sets loading to true while fetch is pending',
    () => {
      const state =
        notificationsReducer(
          expectedInitialState,
          fetchNotifications.pending(),
        );

      expect(state.loading).toBe(true);
    },
  );

  test(
    'sets loading to false when fetch is rejected',
    () => {
      const previousState = {
        notifications: [],
        loading: true,
      };

      const state =
        notificationsReducer(
          previousState,
          fetchNotifications.rejected(
            new Error('Request failed'),
          ),
        );

      expect(state.loading).toBe(false);
      expect(state.notifications).toEqual(
        [],
      );
    },
  );

  test(
    'fetches and stores only unread notifications',
    async () => {
      const store = configureStore({
        reducer:
          notificationsReducer,
      });

      const mockApiNotifications = [
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
            isRead: true,
            value:
              'New resume available',
          },
        },
        {
          id: 3,
          context: {
            type: 'urgent',
            isRead: false,
            value:
              'New data available',
          },
        },
      ];

      const expectedNotifications = [
        {
          id: 1,
          type: 'default',
          isRead: false,
          value:
            'New course available',
        },
        {
          id: 3,
          type: 'urgent',
          isRead: false,
          value:
            'New data available',
        },
      ];

      const request =
        store.dispatch(
          fetchNotifications(),
        );

      expect(
        store.getState().loading,
      ).toBe(true);

      expect(
        mockAxios.get,
      ).toHaveBeenCalledWith(
        ENDPOINTS.notifications,
      );

      mockAxios.mockResponse({
        data: mockApiNotifications,
      });

      await request;

      const state = store.getState();

      expect(state.loading).toBe(false);

      expect(
        state.notifications,
      ).toHaveLength(2);

      expect(
        state.notifications,
      ).toEqual(
        expectedNotifications,
      );

      expect(
        state.notifications.find(
          (notification) =>
            notification.id === 2,
        ),
      ).toBeUndefined();
    },
  );

  test(
    'removes a notification when marked as read',
    () => {
      const previousState = {
        notifications: [
          {
            id: 1,
            type: 'default',
            isRead: false,
            value:
              'Notification one',
          },
          {
            id: 2,
            type: 'urgent',
            isRead: false,
            value:
              'Notification two',
          },
        ],
        loading: false,
      };

      const state =
        notificationsReducer(
          previousState,
          markNotificationAsRead(1),
        );

      expect(
        state.notifications,
      ).toEqual([
        {
          id: 2,
          type: 'urgent',
          isRead: false,
          value:
            'Notification two',
        },
      ]);

      expect(state.loading).toBe(false);
    },
  );
});
