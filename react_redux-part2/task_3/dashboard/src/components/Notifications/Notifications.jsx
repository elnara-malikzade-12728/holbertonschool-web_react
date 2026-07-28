import {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import NotificationItem from
  '../NotificationItem/NotificationItem';

import {
  fetchNotifications,
  markNotificationAsRead,
} from '../../features/notifications/notificationsSlice';

import {
  getFilteredNotifications,
} from '../../features/selectors/notificationsSelector';

function Notifications() {
  const dispatch = useDispatch();

  const [displayDrawer, setDisplayDrawer] =
    useState(false);

  const [currentFilter, setCurrentFilter] =
    useState('all');

  const filteredNotifications = useSelector(
    (state) =>
      getFilteredNotifications(
        state,
        currentFilter,
      ),
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleDisplayDrawer = () => {
    setDisplayDrawer(true);
  };

  const handleHideDrawer = () => {
    setDisplayDrawer(false);
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleSetFilterAll = () => {
    setCurrentFilter('all');
  };

  const handleSetFilterUrgent = () => {
    setCurrentFilter('urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter('default');
  };

  const handleTitleKeyDown = (event) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      handleDisplayDrawer();
    }
  };

  return (
    <div className="relative">
      <p
        className="notification-title cursor-pointer"
        role="button"
        tabIndex="0"
        onClick={handleDisplayDrawer}
        onKeyDown={handleTitleKeyDown}
      >
        Your notifications
      </p>

      <div
        className={`
          Notifications
          notification-items
          ${
            displayDrawer
              ? 'visible'
              : 'invisible'
          }
        `}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={handleHideDrawer}
        >
          Close
        </button>

        <p>
          Here is the list of notifications
        </p>

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            aria-label="Show all notifications"
            onClick={handleSetFilterAll}
          >
            All
          </button>

          <button
            type="button"
            aria-label="Filter urgent notifications"
            onClick={handleSetFilterUrgent}
          >
            ‼️
          </button>

          <button
            type="button"
            aria-label="Filter default notifications"
            onClick={handleSetFilterDefault}
          >
            ??
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <p>No new notification for now</p>
        ) : (
          <ul>
            {filteredNotifications.map(
              (notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  markAsRead={
                    handleMarkAsRead
                  }
                />
              ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Notifications;
