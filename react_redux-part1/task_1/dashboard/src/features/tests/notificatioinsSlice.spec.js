import {
  configureStore,
} from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';

import notificationsReducer, {
  ENDPOINTS,
  fetchNotifications,
  hideDrawer,
  markNotificationAsRead,
  showDrawer,
} from '../notifications/notificationsSlice.js';

describe('notificationsSlice', () => {
  const expectedInitialState = {
    notifications: [],
    displayDrawer: true,
  };

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test(
    'returns the correct initial state',
    () => {
      const state = notificationsReducer(
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
    'fetches notifications correctly',
    async () => {
      const store = configureStore({
        reducer: notificationsReducer,
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
        mockAxios.get,
      ).toHaveBeenCalledWith(
        ENDPOINTS.notifications,
      );

      mockAxios.mockResponse({
        data: mockNotifications,
      });

      await request;

      const state = store.getState();

      expect(
        state.notifications,
      ).toHaveLength(3);

      expect(
        state.notifications[0],
      ).toEqual(mockNotifications[0]);

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
            value: 'Notification one',
          },
          {
            id: 2,
            value: 'Notification two',
          },
        ],
        displayDrawer: true,
      };

      const state = notificationsReducer(
        previousState,
        markNotificationAsRead(1),
      );

      expect(state.notifications).toEqual([
        {
          id: 2,
          value: 'Notification two',
        },
      ]);

      expect(consoleSpy)
        .toHaveBeenCalledWith(
          'Notification 1 has been marked as read',
        );

      consoleSpy.mockRestore();
    },
  );

  test(
    'sets displayDrawer to true',
    () => {
      const previousState = {
        notifications: [],
        displayDrawer: false,
      };

      const state = notificationsReducer(
        previousState,
        showDrawer(),
      );

      expect(
        state.displayDrawer,
      ).toBe(true);
    },
  );

  test(
    'sets displayDrawer to false',
    () => {
      const previousState = {
        notifications: [],
        displayDrawer: true,
      };

      const state = notificationsReducer(
        previousState,
        hideDrawer(),
      );

      expect(
        state.displayDrawer,
      ).toBe(false);
    },
  );
});
