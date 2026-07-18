import { Component } from 'react';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  handleClick = () => {
    console.log('Close button has been clicked');
  };

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length
      !== this.props.notifications.length
    );
  }

  render() {
    const { notifications, displayDrawer } = this.props;

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
        {!displayDrawer && (
          <p
            className="
              notification-title
              absolute
              right-8
              top-8
              whitespace-nowrap
              text-right
              text-[13px]
              min-[520px]:text-[10px]
              min-[912px]:right-0
              min-[912px]:top-0
              min-[912px]:text-[8px]
            "
          >
            Your Notifications
          </p>
        )}

        {displayDrawer && (
          <div
            className="
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
              min-[912px]:overflow-visible
              min-[912px]:p-[6px]
              min-[912px]:text-[8px]
            "
          >
            {notifications.length > 0 && (
              <button
                type="button"
                aria-label="Close"
                onClick={this.handleClick}
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
            )}

            {notifications.length === 0 ? (
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
                  Here is the list of notifications
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
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
