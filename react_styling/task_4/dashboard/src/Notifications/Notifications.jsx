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
      <>
        <div
          className="
            notification-title
            absolute
            right-3
            top-2
            z-[60]
            text-sm
            min-[912px]:right-4
            min-[912px]:text-[5px]
          "
        >
        </div>

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
              bg-white
              p-3
              text-sm
              min-[912px]:absolute
              min-[912px]:inset-auto
              min-[912px]:right-4
              min-[912px]:top-5
              min-[912px]:h-auto
              min-[912px]:w-1/5
              min-[912px]:overflow-visible
              min-[912px]:border
              min-[912px]:border-dashed
              min-[912px]:border-main
              min-[912px]:p-0.5
              min-[912px]:text-[4px]
              
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
                  h-6
                  w-6
                  cursor-pointer
                  items-center
                  justify-center
                  border-none
                  bg-transparent
                  min-[912px]:right-0.5
                  min-[912px]:top-0.5
                  min-[912px]:h-auto
                  min-[912px]:w-auto
                "
              >
                <img
                  src={closeButton}
                  alt="Close"
                  className="
                    h-3
                    w-3
                    min-[912px]:h-1
                    min-[912px]:w-1
                  "
                />
              </button>
            )}

            {notifications.length === 0 ? (
              <p className="pr-8">
                No new notification for now
              </p>
            ) : (
              <>
                <p
                  className="
                    mb-3
                    pr-8
                    text-sm
                    min-[912px]:mb-0
                    min-[912px]:text-[4px]
                  "
                >
                  Here is the list of notifications
                </p>

                <ul
                  className="
                    space-y-1
                    pl-5
                    min-[912px]:space-y-0
                    min-[912px]:pl-2
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
      </>
    );
  }
}

export default Notifications;
