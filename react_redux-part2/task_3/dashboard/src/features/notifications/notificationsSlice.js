import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

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

      return response.data
        .filter(
          (notification) =>
            notification.context.isRead
            === false,
        )
        .map((notification) => ({
          id: notification.id,
          type:
            notification.context.type,
          isRead:
            notification.context.isRead,
          value:
            notification.context.value,
        }));
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
        state.notifications =
          state.notifications.filter(
            (notification) =>
              notification.id
              !== action.payload,
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
              action.payload;
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
