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
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  render() {
    const { notifications, displayDrawer } = this.props;

    return (
      <>
        <div className="notification-title absolute right-4 top-2 text-[5px]">
          Your Notifications
        </div>

        {displayDrawer && (
          <div
            className="
              notification-items
              absolute
              right-4
              top-5
              w-1/5
              border
              border-dashed
              border-main
              p-0.5
              text-[4px]
            "
          >
            {notifications.length > 0 && (
              <button
                type="button"
                aria-label="Close"
                onClick={this.handleClick}
                className="
                  absolute
                  right-0.5
                  top-0.5
                  cursor-pointer
                  border-none
                  bg-transparent
                  
                "
              >
                <img
                  src={closeButton}
                  alt="Close"
                  className="h-1 w-1"
                />
              </button>
            )}

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>

                <ul className="list-disc pl-2">
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
