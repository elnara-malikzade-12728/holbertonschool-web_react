import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getLatestNotification,
} from '../../utils/utils.js';

export const ENDPOINTS = {
  notifications:
    '/notifications.json',
};

export const initialState = {
  notifications: [],
  loading: false,
};

export const fetchNotifications =
  createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
      const response = await axios.get(
        ENDPOINTS.notifications,
      );

      const notifications =
        response.data?.notifications
        ?? response.data
        ?? [];

      return Array.isArray(
        notifications,
      )
        ? notifications
        : [];
    },
  );

const notificationsSlice =
  createSlice({
    name: 'notifications',
    initialState,

    reducers: {
      markNotificationAsRead: (
        state,
        action,
      ) => {
        console.log(
          `Notification ${action.payload} has been marked as read`,
        );

        state.notifications =
          state.notifications.filter(
            (notification) =>
              String(notification.id)
              !== String(
                action.payload,
              ),
          );
      },
    },

    extraReducers: (builder) => {
      builder
        .addCase(
          fetchNotifications.pending,
          (state) => {
            state.loading = true;
          },
        )

        .addCase(
          fetchNotifications.fulfilled,
          (state, action) => {
            state.loading = false;

            state.notifications =
              action.payload.map(
                (notification) => {
                  if (
                    Number(
                      notification.id,
                    ) === 3
                  ) {
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
        )

        .addCase(
          fetchNotifications.rejected,
          (state) => {
            state.loading = false;
          },
        );
    },
  });

export const {
  markNotificationAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
