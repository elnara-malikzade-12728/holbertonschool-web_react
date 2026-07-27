import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getLatestNotification,
} from '../../utils/utils.js';

export const ENDPOINTS = {
  notifications: '/notifications.json',
};

export const initialState = {
  notifications: [],
};

export const fetchNotifications =
  createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
      const response = await axios.get(
        ENDPOINTS.notifications,
      );

      const notifications =
        response.data?.notifications ??
        response.data;

      return notifications.map(
        (notification) => {
          if (notification.id === 3) {
            return {
              ...notification,
              html: {
                __html:
                  getLatestNotification(),
              },
            };
          }

          return notification;
        },
      );
    },
  );

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    markNotificationAsRead: (
      state,
      action,
    ) => {
      const notificationId =
        action.payload;

      state.notifications =
        state.notifications.filter(
          (notification) =>
            notification.id !==
            notificationId,
        );

      console.log(
        `Notification ${notificationId} has been marked as read`,
      );
    },

  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action) => {
        state.notifications =
          action.payload;
      },
    );
  },
});

export const {
  markNotificationAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
