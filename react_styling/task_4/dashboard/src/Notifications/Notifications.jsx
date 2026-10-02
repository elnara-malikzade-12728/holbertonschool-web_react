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
        className="relative min-[912px]:absolute min-[912px]:right-3 min-[912px]:top-1 min-[912px]:z-20 min-[912px]:w-[400px]"
      >
        {!displayDrawer && (
          <p
            className="notification-title absolute right-2 top-1 whitespace-nowrap text-right text-xs min-[912px]:right-0 min-[912px]:top-0 min-[912px]:text-base"
          >
            Your notifications
          </p>
        )}

        {displayDrawer && (
          <div
            className="notification-items fixed inset-0 z-50 overflow-auto border-[3px] border-dotted border-main bg-white p-3 text-sm min-[912px]:absolute min-[912px]:inset-auto min-[912px]:right-0 min-[912px]:top-7 min-[912px]:w-full min-[912px]:text-base"
          >
            {notifications.length > 0 && (
              <button
                type="button"
                aria-label="Close"
                onClick={this.handleClick}
                className="absolute right-2 top-2 flex h-4 w-4 cursor-pointer items-center justify-center border-none bg-transparent"
              >
                <img
                  src={closeButton}
                  alt="Close"
                  className="h-3 w-3"
                />
              </button>
            )}

            {notifications.length === 0 ? (
              <p
                className="pr-5"
              >
                No new notification for now
              </p>
            ) : (
              <>
                <p
                  className="pr-5"
                >
                  Here is the list of notifications
                </p>

                <ul
                  className="list-none p-0 min-[912px]:list-[square] min-[912px]:pl-5"
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
