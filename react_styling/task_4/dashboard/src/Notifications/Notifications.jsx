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
    return nextProps.notifications.length
      !== this.props.notifications.length;
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
              absolute
              right-0
              top-0
              text-right
              text-sm
            "
          >
            Your Notifications
          </p>
        )}

        {displayDrawer && (
          <div
            className="
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

              min-[912px]:absolute
              min-[912px]:inset-auto
              min-[912px]:right-0
              min-[912px]:top-6
              min-[912px]:h-auto
              min-[912px]:w-full
              min-[912px]:p-[6px]
            "
          >
            <button
              type="button"
              aria-label="Close"
              className="
                absolute
                right-3
                top-3
                text-2xl
                leading-none
              "
            >
              ×
            </button>

            {notifications.length === 0 ? (
              <p className="pr-8 text-sm">
                No new notification for now
              </p>
            ) : (
              <ul
                className="
                  list-none
                  p-0
                  min-[912px]:list-disc
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
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Notifications;
