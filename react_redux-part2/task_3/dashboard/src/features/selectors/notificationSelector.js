import {
  createSelector,
} from '@reduxjs/toolkit';

export const selectNotifications = (
  state,
) => state.notifications.notifications;

const selectFilter = (
  _state,
  filter,
) => filter;

export const getFilteredNotifications =
  createSelector(
    [
      selectNotifications,
      selectFilter,
    ],
    (
      notifications,
      filter,
    ) => {
      if (filter === 'all') {
        return notifications;
      }

      return notifications.filter(
        (notification) =>
          notification.type === filter,
      );
    },
  );
  