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
    },
  );

  test(
    'fetches notifications correctly',
    async () => {
      const store = configureStore({
        reducer:
          notificationsReducer,
      });

      const mockNotifications = [
        {
          id: 1,
          type: 'default',
          value:
            'New course available',
        },
        {
          id: 2,
          type: 'urgent',
          value:
            'New resume available',
        },
        {
          id: 3,
          type: 'urgent',
          value: '',
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
        data: mockNotifications,
      });

      await request;

      const state = store.getState();

      expect(state.loading).toBe(false);

      expect(
        state.notifications,
      ).toHaveLength(3);

      expect(
        state.notifications[0],
      ).toEqual(
        mockNotifications[0],
      );

      expect(
        state.notifications[2].id,
      ).toBe(3);

      expect(
        state.notifications[2].html,
      ).toHaveProperty('__html');
    },
  );

  test(
    'removes a notification when marked as read',
    () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      const previousState = {
        notifications: [
          {
            id: 1,
            value:
              'Notification one',
          },
          {
            id: 2,
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
          value:
            'Notification two',
        },
      ]);

      expect(state.loading).toBe(false);

      expect(consoleSpy)
        .toHaveBeenCalledWith(
          'Notification 1 has been marked as read',
        );
    },
  );
});
