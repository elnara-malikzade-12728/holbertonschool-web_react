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

  /*
   * All notifications are shown initially.
   * Clicking a filter button changes this value.
   */
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

  const handleSetFilterUrgent = () => {
    setCurrentFilter((previousFilter) =>
      previousFilter === 'urgent'
        ? 'all'
        : 'urgent',
    );
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter((previousFilter) =>
      previousFilter === 'default'
        ? 'all'
        : 'default',
    );
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
    <div
      className="
        relative
        min-[912px]:ml-auto
        min-[912px]:w-1/3
      "
    >
      <p
        role="button"
        tabIndex="0"
        className="
          notification-title
          cursor-pointer
          text-right
          text-xs
          min-[912px]:text-[8px]
        "
        onClick={handleDisplayDrawer}
        onKeyDown={handleTitleKeyDown}
      >
        Your notifications
      </p>

      <div
        className={`
          Notifications
          notification-items
          fixed
          inset-0
          z-50
          h-screen
          w-screen
          border
          border-dashed
          border-main
          bg-white
          p-3
          text-sm

          min-[520px]:text-base

          min-[912px]:absolute
          min-[912px]:inset-auto
          min-[912px]:right-0
          min-[912px]:top-6
          min-[912px]:h-auto
          min-[912px]:max-h-[15vh]
          min-[912px]:w-full
          min-[912px]:overflow-x-hidden
          min-[912px]:overflow-y-auto
          min-[912px]:p-[6px]
          min-[912px]:text-[8px]

          ${
            displayDrawer
              ? 'visible'
              : 'hidden'
          }
        `}
      >
        <button
          type="button"
          aria-label="Close"
          className="
            absolute
            right-3
            top-3
            cursor-pointer
            border-none
            bg-transparent
            text-lg

            min-[912px]:right-1
            min-[912px]:top-0
            min-[912px]:text-xs
          "
          onClick={handleHideDrawer}
        >
          ×
        </button>

        <div
          className="
            mb-4
            flex
            items-center
            gap-3
            pr-8

            min-[912px]:mb-1
            min-[912px]:gap-1
          "
        >
          <button
            type="button"
            aria-label="Filter urgent notifications"
            className={`
              cursor-pointer
              border-none
              bg-transparent
              ${
                currentFilter === 'urgent'
                  ? 'font-bold'
                  : ''
              }
            `}
            onClick={handleSetFilterUrgent}
          >
            ‼️
          </button>

          <button
            type="button"
            aria-label="Filter default notifications"
            className={`
              cursor-pointer
              border-none
              bg-transparent
              ${
                currentFilter === 'default'
                  ? 'font-bold'
                  : ''
              }
            `}
            onClick={handleSetFilterDefault}
          >
            ??
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <p className="pr-8">
            No new notification for now
          </p>
        ) : (
          <>
            <p
              className="
                mb-3
                pr-8

                min-[912px]:mb-1
              "
            >
              Here is the list of notifications
            </p>

            <ul
              className="
                list-disc
                space-y-2
                pl-5
                pr-2
                break-words
                overflow-hidden

                min-[912px]:space-y-1
                min-[912px]:pl-3
              "
            >
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
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;
