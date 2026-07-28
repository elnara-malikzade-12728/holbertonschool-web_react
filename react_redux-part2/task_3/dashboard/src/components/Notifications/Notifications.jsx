import {
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  StyleSheet,
  css,
} from 'aphrodite';

import closeButton from
  '../../assets/close-icon.png';

import NotificationItem from
  '../NotificationItem/NotificationItem.jsx';

import {
  markNotificationAsRead,
} from '../../features/notifications/notificationsSlice.js';

import {
  getFilteredNotifications,
} from '../../features/selectors/notificationSelector.js';

const styles = StyleSheet.create({
  notificationDrawer: {
    opacity: 0,
    visibility: 'hidden',
  },

  visible: {
    opacity: 1,
    visibility: 'visible',
  },
});

function Notifications() {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  const [
    currentFilter,
    setCurrentFilter,
  ] = useState('all');

  const filteredNotifications =
    useSelector((state) =>
      getFilteredNotifications(
        state,
        currentFilter,
      ),
    );

  const handleToggleDrawer =
    useCallback(() => {
      if (!drawerRef.current) {
        return;
      }

      drawerRef.current.classList.toggle(
        'visible',
      );

      drawerRef.current.classList.toggle(
        css(styles.visible),
      );
    }, []);

  const handleMarkNotificationAsRead =
    useCallback(
      (id) => {
        dispatch(
          markNotificationAsRead(id),
        );
      },
      [dispatch],
    );

  const handleSetFilterUrgent = () => {
    setCurrentFilter('urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter('default');
  };

  return (
    <div
      className="
        relative
        min-[912px]:absolute
        min-[912px]:right-4
        min-[912px]:top-2
        min-[912px]:z-20
        min-[912px]:w-1/4
      "
    >
      <p
        className="
          menuItem
          notification-title
          absolute
          right-4
          top-2
          cursor-pointer
          whitespace-nowrap
          text-right
          text-[8px]
          transition-opacity
          duration-300
          hover:animate-bounce
          hover:opacity-50
          min-[520px]:text-[10px]
          min-[912px]:right-0
          min-[912px]:top-0
          min-[912px]:text-[8px]
        "
        onClick={handleToggleDrawer}
        onKeyDown={(event) => {
          if (
            event.key === 'Enter'
            || event.key === ' '
          ) {
            event.preventDefault();
            handleToggleDrawer();
          }
        }}
        role="button"
        tabIndex={0}
      >
        Your notifications
      </p>

      <div
        ref={drawerRef}
        className={`
          ${css(
            styles.notificationDrawer,
          )}
          Notifications
          notification-items
          fixed
          inset-0
          z-50
          h-screen
          w-screen
          overflow-y-auto
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
          min-[912px]:w-full
          min-[912px]:overflow-auto
          min-[912px]:p-[6px]
          min-[912px]:text-[8px]
        `}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={handleToggleDrawer}
          className="
            absolute
            right-3
            top-3
            flex
            h-7
            w-7
            cursor-pointer
            items-center
            justify-center
            border-none
            bg-transparent
            min-[912px]:right-1
            min-[912px]:top-1
            min-[912px]:h-4
            min-[912px]:w-4
          "
        >
          <img
            src={closeButton}
            alt="Close"
            className="
              h-4
              w-4
              min-[912px]:h-2
              min-[912px]:w-2
            "
          />
        </button>

        <div
          className="
            mb-3
            flex
            gap-2
            pr-8
            min-[912px]:mb-1
          "
        >
          <button
            type="button"
            aria-label="Filter urgent notifications"
            onClick={
              handleSetFilterUrgent
            }
            className="
              cursor-pointer
              border-none
              bg-transparent
              p-0
            "
          >
            ‼️
          </button>

          <button
            type="button"
            aria-label="Filter default notifications"
            onClick={
              handleSetFilterDefault
            }
            className="
              cursor-pointer
              border-none
              bg-transparent
              p-0
            "
          >
            ??
          </button>
        </div>

        {filteredNotifications.length
        === 0 ? (
          <p
            className="
              pr-8
              text-sm
              min-[912px]:text-[8px]
            "
          >
            No new notification for now
          </p>
        ) : (
          <>
            <p
              className="
                mb-4
                pr-8
                text-[15px]
                min-[520px]:text-base
                min-[912px]:mb-1
                min-[912px]:text-[8px]
              "
            >
              Here is the list of
              notifications
            </p>

            <ul
              className="
                list-none
                space-y-1
                p-0
                min-[912px]:list-disc
                min-[912px]:space-y-0
                min-[912px]:pl-4
              "
            >
              {filteredNotifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={
                      notification.type
                    }
                    value={
                      notification.value
                    }
                    markAsRead={
                      handleMarkNotificationAsRead
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
